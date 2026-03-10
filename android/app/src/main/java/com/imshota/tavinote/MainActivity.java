package com.imshota.tavinote;

import android.os.Bundle;
import android.content.Intent;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onStart() {
        super.onStart();
        WebView webView = this.bridge.getWebView();
        webView.addJavascriptInterface(new JSInterface(), "AndroidWidget");
    }

    private class JSInterface {
        @JavascriptInterface
        public String getDeviceLanguage() {
            return java.util.Locale.getDefault().getLanguage();
        }

        @JavascriptInterface
        public void updateTreeProgress(int percentage, String tripName) {
            SharedPreferences prefs = getSharedPreferences("WidgetPrefs", MODE_PRIVATE);
            prefs.edit()
                    .putInt("tree_progress", percentage)
                    .putString("trip_name", tripName)
                    .apply();

            Intent intent = new Intent("com.imshota.tavinote.UPDATE_WIDGET");
            intent.setPackage(getPackageName());
            sendBroadcast(intent);
        }

        @JavascriptInterface
        public void updateWidgetData(String tripName, String daysLeftStr, String progressStr, int percentage,
                String treeType) {
            SharedPreferences prefs = getSharedPreferences("WidgetPrefs", MODE_PRIVATE);
            prefs.edit()
                    .putString("trip_name", tripName)
                    .putString("days_left", daysLeftStr)
                    .putString("progress_str", progressStr)
                    .putInt("tree_progress", percentage)
                    .putString("tree_type", treeType)
                    .apply();

            Intent intent = new Intent("com.imshota.tavinote.UPDATE_WIDGET");
            intent.setPackage(getPackageName());
            sendBroadcast(intent);
        }
    }
}
