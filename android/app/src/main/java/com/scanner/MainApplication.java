package com.scanner;

import android.app.Application;
import android.database.sqlite.SQLiteDatabase;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.scanner.nativebridge.NativeMobileSDKBridgePackage;
import com.thecoder.scanm.common.util.CommonUtil;
import com.thecoder.scanm.common.util.Credentials;
import com.thecoder.scanm.dao.ScannerManagerDBHandler;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    ScannerManagerDBHandler scannerManagerDBHandler;
    private SQLiteDatabase db = null;

    private boolean createConnection(boolean isWritableDb) {
        if(isWritableDb)
            db = scannerManagerDBHandler.getWritableDatabase();
        else
            db = scannerManagerDBHandler.getReadableDatabase();

        if(db == null)
            return false;
        return true;
    }

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new NativeMobileSDKBridgePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

      // 테이블 생성하기
      if(CommonUtil.getReaderString(this, Credentials.ENTRY_IS_DATABASE_CREATE, "N").equals("N")) {
          scannerManagerDBHandler = new ScannerManagerDBHandler(this);
          if (createConnection(false)) {
              for(int i = 0; i< Credentials.TABLE_QUERY_LIST.length; i++){
                  db.execSQL(Credentials.TABLE_QUERY_LIST[i]);
              }
              CommonUtil.setReaderString(this, Credentials.ENTRY_IS_DATABASE_CREATE, "Y");
          }
      }
  }
}
