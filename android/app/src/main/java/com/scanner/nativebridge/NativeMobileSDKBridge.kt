/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

package com.scanner.nativebridge

import android.hardware.camera2.CameraManager
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.scanner.nativebridge.RNScannerViewManager.Companion.myFragment


class NativeMobileSDKBridge(
    reactContext: ReactApplicationContext, private val eventEmitter: RNEventEmitter
) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var cameraManager: CameraManager
    private lateinit var cameraId: String

    companion object {
        private const val TAG = "NativeMobileSDKBridge"
    }

    override fun getName(): String {
        return "NativeMobileSDKBridge"
    }

    @ReactMethod
    fun initCamera() {
        Log.d(TAG, "Called initCamera")
        myFragment?.initializeCamera()
    }

    @ReactMethod
    fun setFlashOn(isOn: Boolean) {
        Log.d(TAG, "Create event called with name: and location: $isOn")
//        myFragment?.toggleCameraFlash()
        if (isOn) {
            myFragment?.mCamera?.setTorch(isOn)
        } else {
            myFragment?.mCamera?.setTorch(isOn)
        }
    }

    @ReactMethod
    fun setZoomOn(isOn: Boolean) {
        Log.d(TAG, "Create event called with name: and location: $isOn")
        if (isOn) {
            myFragment?.mCamera?.zoom = myFragment?.mCamera?.maxZoom!! / 10
        } else {
            myFragment?.mCamera?.zoom = 0
        }
    }
}
