package com.anji.avis.wxapi;


import android.app.Activity;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.anji.avis.R;
import com.anji.avis.utils.WechatPayUtil;
import com.tencent.mm.sdk.constants.Build;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import org.json.JSONObject;

public class PayActivity extends Activity implements IWXAPIEventHandler {
	
	private IWXAPI api;
	Button appayBtn;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.pay);
		
		api = WXAPIFactory.createWXAPI(this, "wx485038c648cfde4d");

		appayBtn = (Button) findViewById(R.id.appay_btn);
		appayBtn.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						pay();
					}
				}).start();
				Looper.loop();
			}
		});		
		Button checkPayBtn = (Button) findViewById(R.id.check_pay_btn);
		checkPayBtn.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				boolean isPaySupported = api.getWXAppSupportAPI() >= Build.PAY_SUPPORTED_SDK_INT;
				Toast.makeText(PayActivity.this, String.valueOf(isPaySupported), Toast.LENGTH_SHORT).show();
			}
		});
	}

	private void pay() {
		String url = "http://wxpay.weixin.qq.com/pub_v2/app/app_pay.php?plat=android";
		try{
			byte[] buf = WechatPayUtil.httpGet(url);
			if (buf != null && buf.length > 0) {
				String content = new String(buf);
				Log.e("get server pay params:",content);
				JSONObject json = new JSONObject(content);
				if(null != json && !json.has("retcode") ){
					PayReq req = new PayReq();
					//req.appId = "wxf8b4f85f3a794e77";  // ������appId
					req.appId			= json.getString("appid");
					req.partnerId		= json.getString("partnerid");
					req.prepayId		= json.getString("prepayid");
					req.nonceStr		= json.getString("noncestr");
					req.timeStamp		= json.getString("timestamp");
					req.packageValue	= json.getString("package");
					req.sign			= json.getString("sign");
					req.extData			= "app data"; // optional
					api.sendReq(req);
				}else{
					Log.d("PAY_GET", "���ش���"+json.getString("retmsg"));
				}
			}else{
				Log.d("PAY_GET", "�������������");
			}
		}catch(Exception e){
			Log.e("PAY_GET", "�쳣��"+e.getMessage());
		}
	}

	@Override
	public void onReq(BaseReq baseReq) {
		Toast.makeText(PayActivity.this, "req", Toast.LENGTH_LONG).show();
	}

	@Override
	public void onResp(BaseResp baseResp) {
		Toast.makeText(PayActivity.this, "res", Toast.LENGTH_LONG).show();
	}
}
