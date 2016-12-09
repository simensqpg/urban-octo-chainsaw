package com.anji.avis.model;

import com.alibaba.fastjson.JSONObject;
import com.alipay.sdk.pay.demo.PayDemoActivity;
import com.alipay.sdk.pay.demo.util.OrderInfoUtil2_0;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Random;

/**
 * Created by simens on 11/8/16.
 */

public class PayInfo {
    private String payMethod;
    private Map<String, String> params;
    private String sign;

    public PayInfo(JSONObject object) {
        payMethod = object.getString("pay_method");
        if (null != payMethod) {
            params = new HashMap<>();
            if (payMethod.equals(PayMethod.Alipay.name().toLowerCase())) {
                sign = object.getString("sign");
                JSONObject bizJSON = object.getJSONObject("biz_content");
                params.put("app_id", object.getString("app_id"));
                params.put("biz_content", "{\"timeout_express\":\"" + bizJSON.getString("timeout_express") + "\",\"seller_id\":\"" + bizJSON.get("seller_id") + "\",\"product_code\":\"" + bizJSON.get("product_code") + "\",\"total_amount\":\"" + bizJSON.getString("total_amount") + "\",\"subject\":\"" + bizJSON.getString("subject") + "\",\"body\":\"" + bizJSON.getString("body") + "\",\"out_trade_no\":\"" + bizJSON.getString("out_trade_no") + "\"}");
                params.put("charset", object.getString("charset"));
                params.put("format", object.getString("format"));
                params.put("method", object.getString("method"));
                params.put("notify_url", object.getString("notify_url"));
                params.put("sign_type", object.getString("sign_type"));
                params.put("timestamp", object.getString("timestamp"));
                params.put("version", object.getString("version"));
            } else if (payMethod.equals(PayMethod.Wechat.name().toLowerCase())) {
                params.put("appid", object.getString("appid"));
                params.put("partnerid", object.getString("partnerid"));
                params.put("prepayid", object.getString("prepayid"));
                params.put("package", object.getString("package"));
                params.put("noncestr", object.getString("noncestr"));
                params.put("timestamp", object.getString("timestamp"));
                params.put("sign", object.getString("sign"));
            }
        }
    }

    /**
     * 要求外部订单号必须唯一。
     * @return
     */
    private static String getOutTradeNo() {
        SimpleDateFormat format = new SimpleDateFormat("MMddHHmmss", Locale.getDefault());
        Date date = new Date();
        String key = format.format(date);

        Random r = new Random();
        key = key + r.nextInt();
        key = key.substring(0, 15);
        return key;
    }

    public String getPayUrl() {
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);
//        String sign = OrderInfoUtil2_0.getSign(params, PayDemoActivity.RSA_PRIVATE);
//        String orderInfo1 = orderParam + "&" + sign;
        String orderInfo = orderParam + "&sign=" + sign;
        return orderInfo;
    }

    public String getPayMethod() {
        return payMethod;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public String getSign() {
        return sign;
    }

    public enum PayMethod {
        Wechat,
        Alipay;
    }
}
