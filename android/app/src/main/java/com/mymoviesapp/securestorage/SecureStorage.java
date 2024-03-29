package com.mymoviesapp.securestorage;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mymoviesapp.securestorage.exceptions.EmptyParameterException;

import android.util.Log;
import androidx.annotation.NonNull;

public class SecureStorage extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "SecureStorage";
    public static final String E_EMPTY_PARAMETERS = "E_EMPTY_PARAMETERS";

    SecureStorage(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getValue(String key, Promise promise) {
        try {
            if (key == null || key.isEmpty()) {
                throw new EmptyParameterException("- Empty key parameter");
            }

            promise.resolve(key);

            Log.d(MODULE_NAME, "getValue key: " + key);
        } catch (EmptyParameterException e) {
            Log.d(MODULE_NAME, e.getMessage());
            promise.reject(E_EMPTY_PARAMETERS, e);
        }
    }

    @ReactMethod
    public void setValue(String key, String value, Promise promise) {
        try {
            if (key == null || key.isEmpty()) {
                throw new EmptyParameterException("- Empty key parameter");
            }

            if (value == null) {
                throw new EmptyParameterException("- Empty value parameter");
            }

            promise.resolve(true);

            Log.d(MODULE_NAME, "setValue key: " + key);
            Log.d(MODULE_NAME, "setValue value: " + value);
        } catch (EmptyParameterException e) {
            Log.d(MODULE_NAME, e.getMessage());
            promise.reject(E_EMPTY_PARAMETERS, e);
        }
    }
}
