package com.scanner.nativebridge

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import kotlin.collections.ArrayList

class NativeMobileSDKBridgePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val eventEmitter = RNEventEmitter(reactContext)

        val modules = ArrayList<NativeModule>()
        modules.add(NativeMobileSDKBridge(reactContext, eventEmitter))
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        val eventEmitter = RNEventEmitter(reactContext)
        return arrayListOf(RNScannerViewManager(reactContext, eventEmitter))
    }
}