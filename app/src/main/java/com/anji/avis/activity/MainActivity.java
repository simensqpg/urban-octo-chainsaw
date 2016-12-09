package com.anji.avis.activity;

import android.app.ActionBar;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewTreeObserver;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alipay.sdk.app.PayTask;
import com.alipay.sdk.pay.demo.PayResult;
import com.anji.avis.R;
import com.anji.avis.dialog.AlertDialogFragment;
import com.anji.avis.event.SendPayResultEvent;
import com.anji.avis.model.PayInfo;
import com.anji.avis.model.UpdateInfo;
import com.anji.avis.utils.SystemServiceUtil;
import com.anji.avis.utils.VersionControlUtil;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import de.greenrobot.event.EventBus;


public class MainActivity extends AppCompatActivity {
//    static final String URL = "file:///android_asset/test.html";
//    static final String URL = "http://uat.avis.cn/app/index.html";
    static final String URL = "http://www.avis.cn/app/index.html";
    private static final int DOWNLOAD_APK = 0;
    private static final int SDK_PAY_FLAG = 1;
    WebView webView;
    ProgressBar progressBar;
    View mLoadingLayout;

    IWXAPI api;
    UpdateInfo updateInfo;
    Thread payThread;
    Thread downloadThread;

    Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case DOWNLOAD_APK:
                    if (!TextUtils.isEmpty(updateInfo.getDownloadUrl())) {
                        if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
                            downFile();
//                            downFile("http://download.sj.qq.com/upload/connAssitantDownload/upload/MobileAssistant_1.apk");
                        } else {
                            Toast.makeText(MainActivity.this, "SD卡不可用，请插入SD卡", Toast.LENGTH_SHORT).show();
                        }
                    }
                    break;
                case SDK_PAY_FLAG:
                    PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                    /**
                     对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                     */
                    JSONObject resultJson = JSON.parseObject(payResult.getResult());
                    JSONObject msgJson;
                    final String message;
                    if (null != resultJson) {
                        msgJson = resultJson.getJSONObject("alipay_trade_app_pay_response");
                        message = null != msgJson ? msgJson.getString("msg") : "";
                    } else {
                        message = "";
                    }

                    final String resultStatus = payResult.getResultStatus();
                    webView.post(new Runnable() {
                        @Override
                        public void run() {
                            webView.loadUrl("javascript:payResult('" + resultStatus + "','alipay', '" + message + "')");
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initViews();
        initSettings();
        checkVersion();
    }

    private void initViews() {
        webView = (WebView) findViewById(R.id.webview);
        mLoadingLayout = findViewById(R.id.loading_layout);
        progressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        showDebugInfo();
    }

    private void showDebugInfo() {
        if ("http://uat.avis.cn/app/index.html".equals(URL)) {
            Toast.makeText(MainActivity.this, "这是测试环境", Toast.LENGTH_LONG).show();
        }
    }

    private void initSettings() {
        api = WXAPIFactory.createWXAPI(MainActivity.this, "wx485038c648cfde4d");
        EventBus.getDefault().register(this);
        initWebViewSettings();
        initProgressBarSettings();
        webView.loadUrl(URL);
    }

    private void initWebViewSettings() {
        webView.clearCache(true);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setSaveFormData(false);
        settings.setAppCacheEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(true);
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
                progressBar.setProgress(newProgress);
                if (100 == newProgress) {
                    progressBar.setVisibility(View.GONE);
                } else {
                    progressBar.setVisibility(View.VISIBLE);
                }
            }
        });
        webView.addJavascriptInterface(new JsInterface(), "js_bridge");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if ("http://m.avis.cn/m/".equals(url)) {
                    Intent i = new Intent(Intent.ACTION_VIEW);
                    i.setData(Uri.parse(url));
                    startActivity(i);
                } else {
                    view.loadUrl(url);
                }
                return true;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
            }
        });
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
    }

    private void checkVersion() {
        if (!SystemServiceUtil.checkNetworkStatus(MainActivity.this)) {
            Toast.makeText(MainActivity.this, R.string.app_bad_network, Toast.LENGTH_SHORT).show();
        } else {
            getLatestVersion();
        }
    }

    private void getLatestVersion() {
        Thread checkVersionThread = new Thread(new Runnable() {
            @Override
            public void run() {
                JSONObject resultJson = VersionControlUtil.getLatestVersion(MainActivity.this);
                if (null != resultJson && 1 == resultJson.getIntValue("resultCode")) {
                    updateInfo = new UpdateInfo(resultJson.getJSONObject("result"));
                    if (0 != updateInfo.getIsMustUpdate()
                            && updateInfo.getVersionNo() > SystemServiceUtil.getVersion(MainActivity.this)) {
                        AlertDialogFragment alert = new AlertDialogFragment();
                        alert.setTitle(getString(R.string.there_is_new_version));
                        alert.setMessage(updateInfo.getDescription());
                        alert.setPositiveButtonText(getString(R.string.update));
                        alert.setPositiveButton(new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                mHandler.sendEmptyMessage(0);
                            }
                        });
                        if (2 == updateInfo.getIsMustUpdate()) {
                            alert.setNegativeButtonText(getString(R.string.cancel));
                            alert.setNegativeButton(new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {

                                }
                            });
                        }
                        alert.setSupportCancel(false);
                        getFragmentManager().beginTransaction().add(alert, "ALERT").commit();
                    }
                }
            }
        });
        checkVersionThread.start();
    }

    private void downFile() {
        mHandler.post(new Runnable() {
            @Override
            public void run() {
                ProgressDialog progressDialog = new ProgressDialog(MainActivity.this);
                progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                progressDialog.setTitle("正在下载");
                progressDialog.setMessage("请稍候...");
                progressDialog.setCanceledOnTouchOutside(false);
                progressDialog.setCancelable(false);
                progressDialog.setOnKeyListener(new DialogInterface.OnKeyListener() {
                    @Override
                    public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
                        if (keyCode == KeyEvent.KEYCODE_BACK) {
                            return true;
                        }
                        return false;
                    }
                });
                progressDialog.setProgress(0);
                progressDialog.show();
                doDownload(progressDialog);
            }
        });
    }

    private void doDownload(final ProgressDialog progressDialog) {
        downloadThread = new Thread(new Runnable() {
            @Override
            public void run() {
                HttpClient client = new DefaultHttpClient();
                HttpGet get = new HttpGet(updateInfo.getDownloadUrl());
                HttpResponse response;
                try {
                    response = client.execute(get);
                    HttpEntity entity = response.getEntity();
                    int length = (int) entity.getContentLength();   //获取文件大小
                    progressDialog.setMax(length);                            //设置进度条的总长度
                    InputStream is = entity.getContent();
                    FileOutputStream fileOutputStream = null;
                    if (is != null) {
                        File file = new File(Environment.getExternalStorageDirectory(), "avis_release.apk");
                        fileOutputStream = new FileOutputStream(file);
                        byte[] buf = new byte[1024];
                        int ch = -1;
                        int process = 0;
                        while ((ch = is.read(buf)) != -1) {
                            fileOutputStream.write(buf, 0, ch);
                            process += ch;
                            progressDialog.setProgress(process);       //这里就是关键的实时更新进度了！
                        }
                    }
                    fileOutputStream.flush();
                    if (fileOutputStream != null) {
                        fileOutputStream.close();
                    }
                    progressDialog.cancel();
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setDataAndType(Uri.fromFile(new File(Environment
                                    .getExternalStorageDirectory(), "avis_release.apk")),
                            "application/vnd.android.package-archive");
                    startActivity(intent);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        downloadThread.start();
    }

    private void initProgressBarSettings() {
        progressBar.setLayoutParams(new ActionBar.LayoutParams(ActionBar.LayoutParams.MATCH_PARENT, 32));
        progressBar.setProgress(10);
        // retrieve the top view of our application
        final FrameLayout decorView = (FrameLayout) this.getWindow().getDecorView();
        decorView.addView(progressBar);
        // Here we try to position the ProgressBar to the correct position by looking
        // at the position where content area starts. But during creating time, sizes
        // of the components are not set yet, so we have to wait until the components
        // has been laid out
        // Also note that doing progressBar.setY(136) will not work, because of different
        // screen densities and different sizes of actionBar
        ViewTreeObserver observer = progressBar.getViewTreeObserver();
        observer.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                progressBar.setY((float) Math.ceil(25 * getResources().getDisplayMetrics().density) - 10);
                ViewTreeObserver observer = progressBar.getViewTreeObserver();
                observer.removeGlobalOnLayoutListener(this);
            }
        });
    }

    private void goBack() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            finish();
        }
    }

    @Override
    public void onBackPressed() {
        goBack();
    }

    private class JsInterface {
        @JavascriptInterface
        public void getPayInfo(String message) {
            dispatchMessage(message);
        }
    }

    private void dispatchMessage(String message) {
        if (null != message) {
            JSONObject resultJson = JSON.parseObject(message);
            PayInfo payInfo = new PayInfo(resultJson);
            if (payInfo.getPayMethod().equals(PayInfo.PayMethod.Alipay.name().toLowerCase())) {
                String payUrl = payInfo.getPayUrl();
                gotoAlipay(payUrl);
            } else if (payInfo.getPayMethod().equals(PayInfo.PayMethod.Wechat.name().toLowerCase())) {
                gotoWechatPay(payInfo);
            }
            payThread.start();
        }
    }

    private void gotoAlipay(final String payUrl) {
        payThread = new Thread(new Runnable() {
            @Override
            public void run() {
                PayTask alipay = new PayTask(MainActivity.this);
                Map<String, String> result = alipay.payV2(payUrl, true);
                Log.i("msp", result.toString());
                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        });
    }

    private void gotoWechatPay(final PayInfo payInfo) {
        payThread = new Thread(new Runnable() {
            @Override
            public void run() {
                if(null != payInfo){
                    Map<String, String> params = payInfo.getParams();
                    PayReq req = new PayReq();
                    req.appId			= params.get("appid");
                    req.partnerId		= params.get("partnerid");
                    req.prepayId		= params.get("prepayid");
                    req.nonceStr		= params.get("noncestr");
                    req.timeStamp		= params.get("timestamp");
                    req.packageValue	= params.get("package");
                    req.sign			= params.get("sign");
                    req.extData			= "app data"; // optional
                    api.sendReq(req);
                } else {
                    Toast.makeText(MainActivity.this, "参数有误,请重新申请支付", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public void onEvent(final SendPayResultEvent event) {
        webView.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:payResult('" + event.getResultCode() + "', 'wechat', '')");
            }
        });
    }
}
