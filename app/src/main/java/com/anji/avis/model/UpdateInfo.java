package com.anji.avis.model;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by simens on 11/22/16.
 */

public class UpdateInfo {
    private String versionCode;
    private int versionNo;
    private String description;
    private String downloadUrl;
    private int isMustUpdate;

    public UpdateInfo(JSONObject jsonObject) {
        versionCode = jsonObject.getString("versionCode");
        versionNo = jsonObject.getIntValue("versionNo");
        description = jsonObject.getString("description");
        downloadUrl = jsonObject.getString("address");
        isMustUpdate = jsonObject.getIntValue("isMustUpdate");
    }

    public String getVersionCode() {
        return versionCode;
    }

    public int getVersionNo() {
        return versionNo;
    }

    public int getIsMustUpdate() {
        return isMustUpdate;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public String getDescription() {
        return description;
    }
}
