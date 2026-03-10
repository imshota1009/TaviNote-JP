package com.imshota.tavinote;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.widget.RemoteViews;

import com.imshota.tavinote.R;

import java.io.IOException;
import java.io.InputStream;

public class TreeWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if ("com.imshota.tavinote.UPDATE_WIDGET".equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, TreeWidget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
            for (int appWidgetId : appWidgetIds) {
                updateAppWidget(context, appWidgetManager, appWidgetId);
            }
        }
    }

    public static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
            int appWidgetId) {
        SharedPreferences prefs = context.getSharedPreferences("WidgetPrefs", Context.MODE_PRIVATE);

        String tripName = prefs.getString("trip_name", context.getString(R.string.widget_default_trip_name));
        String daysLeft = prefs.getString("days_left", "");
        String progressStr = prefs.getString("progress_str", "0%");
        int percentage = prefs.getInt("tree_progress", 0);
        String treeType = prefs.getString("tree_type", "tree");

        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.tree_widget);
        views.setTextViewText(R.id.widget_trip_name, tripName);
        if (daysLeft.isEmpty()) {
            views.setViewVisibility(R.id.widget_days_left, android.view.View.GONE);
        } else {
            views.setViewVisibility(R.id.widget_days_left, android.view.View.VISIBLE);
            views.setTextViewText(R.id.widget_days_left, daysLeft);
        }
        views.setTextViewText(R.id.widget_progress_text, progressStr);

        // Current Date
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("M月d日", java.util.Locale.JAPAN);
        String currentDate = sdf.format(new java.util.Date());
        views.setTextViewText(R.id.widget_current_date, currentDate);

        int imgNum = 1;
        if (percentage >= 100)
            imgNum = 10;
        else if (percentage >= 90)
            imgNum = 9;
        else if (percentage >= 80)
            imgNum = 8;
        else if (percentage >= 70)
            imgNum = 7;
        else if (percentage >= 60)
            imgNum = 6;
        else if (percentage >= 50)
            imgNum = 5;
        else if (percentage >= 40)
            imgNum = 4;
        else if (percentage >= 30)
            imgNum = 3;
        else if (percentage >= 20)
            imgNum = 2;
        else
            imgNum = 1;

        try {
            InputStream is = context.getAssets().open("public/images/" + treeType + "/" + imgNum + ".jpg");
            Bitmap bitmap = BitmapFactory.decodeStream(is);
            views.setImageViewBitmap(R.id.widget_tree_image, bitmap);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
