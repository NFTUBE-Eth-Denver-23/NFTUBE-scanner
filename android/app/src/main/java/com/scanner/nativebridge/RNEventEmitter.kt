package com.scanner.nativebridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.thecoder.scanm.domain.DotObject

class RNEventEmitter(private val reactContext: ReactApplicationContext) {
    companion object {
        // Event types
        const val RN_EVENT_ERROR = "OnError"
        const val RN_EVENT_DATA_MESSAGE_RECEIVE = "onFinished"
    }

    fun sendDataMessageEvent(eventName: String, dotObject: DotObject) {
        val map: WritableMap = WritableNativeMap()

        map.putString("recogType", dotObject.recogType)
        map.putInt("dotSeq", dotObject.dotSeq)
        map.putString("dotTitle", dotObject.dotTitle)
        map.putString("dotId", dotObject.dotId)
        map.putString("dotSubTitle", dotObject.dotSubTitle)
        map.putString("dotDesc", dotObject.dotDesc)
        map.putString("serviceTarget", dotObject.serviceTarget)
        map.putString("readYn", dotObject.readYn)
        map.putString("contentType", dotObject.contentType)
        map.putString("actionType", dotObject.actionType)
        map.putString("fileConnectUri", dotObject.fileConnectUri)
        map.putString("displayOrientation", dotObject.displayOrientation)
        map.putString("odroidSignalYn", dotObject.odroidSignalYn)
        map.putString("qrString", dotObject.qrString)
        map.putString("usePasswdYn", dotObject.usePasswdYn)
        map.putString("projectNm", dotObject.projectNm)
        map.putString("sampleImgPath", dotObject.sampleImgPath)

        sendReactNativeEvent(eventName, map)
    }

    // Used for sending events with non String data (Attendee info, video tile state)
    private fun sendReactNativeEvent(eventName: String, data: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, data)
    }

    // Used for events such as meeting started, meeting ended, and for error messages
    fun sendReactNativeEvent(eventName: String, message: String?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, message)
    }
}