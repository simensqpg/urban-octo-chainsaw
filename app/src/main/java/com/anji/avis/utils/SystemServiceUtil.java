package com.anji.avis.utils;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

/**
 * Created by simens on 11/22/16.
 */

public class SystemServiceUtil {

    public static boolean checkNetworkStatus(Context context) {
        boolean resp = false;
        if (null == context) {
            return resp;
        }
        final ConnectivityManager connMgr = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetInfo = connMgr.getActiveNetworkInfo();
        if (activeNetInfo != null && activeNetInfo.isAvailable()) {
            resp = true;
        }
        return resp;
    }

    public static int getVersion(Activity activity) {
        Application app = activity.getApplication();
        int version = 0;
        try {
            version = app.getPackageManager().getPackageInfo(app.getPackageName(), 0).versionCode;
        } catch (PackageManager.NameNotFoundException e) {

        }
        return version;
    }
}
