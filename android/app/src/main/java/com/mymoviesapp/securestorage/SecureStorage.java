package com.mymoviesapp.securestorage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

public class SecureStorage extends ReactContextBaseJavaModule {
    SecureStorage(ReactApplicationContext context) {
        super(context);
    }

    public String getName() {
        return "SecureStorage";
    }

    @ReactMethod
    public void getValue(String key) {
        Log.d("SecureStorage", "Received key: " + key);
    }

    @ReactMethod
    public void setValue(String key, String value) {
        Log.d("SecureStorage", "Received key: " + key);
        Log.d("SecureStorage", "Received value: " + value);
    }
}
