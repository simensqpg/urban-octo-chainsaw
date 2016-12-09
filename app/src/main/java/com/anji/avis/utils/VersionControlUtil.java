package com.anji.avis.utils;

import android.app.Activity;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by simens on 11/22/16.
 */

public class VersionControlUtil {
    static final String URL_TEST = "http://uat.avis.cn/api/getLastVersion.do?appType=1&";
    static final String URL = "http://www.avis.cn/api/getLastVersion.do?appType=1&";

    public static JSONObject getLatestVersion(Activity activity) {
        JSONObject json = null;
        StringBuffer sb = new StringBuffer();
        BufferedReader reader = null;
        try {
            URL url = new URL(URL + "versionNo=" + SystemServiceUtil.getVersion(activity));
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sb.append(strRead);
                sb.append("\r\n");
            }
            reader.close();
            json = JSON.parseObject(sb.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }
}
