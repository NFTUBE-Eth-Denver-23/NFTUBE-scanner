package com.scanner.scanner;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.scanner.nativebridge.RNEventEmitter;
import com.thecoder.scanm.common.util.CommonUtil;
import com.thecoder.scanm.common.util.Credentials;
import com.thecoder.scanm.controller.ScanMBaseFragment;
import com.thecoder.scanm.domain.DotObject;
import com.thecoder.scanm.service.listener.ScanResultListener;

public class MyFragment extends ScanMBaseFragment implements ScanResultListener {
    private static final String TAG = "MyFragment";
    MyFragment mActivity = null;
    MyFragment mContext = null;

    private final RNEventEmitter eventEmitter;

    public MyFragment(RNEventEmitter data) {
        this.eventEmitter = data;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mActivity = this;
        mContext = this;

        setFullscreen();
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
//        requireActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        return super.onCreateView(inflater, parent, savedInstanceState);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    @Override
    public void onPause() {
        Log.e(TAG, "onPauseonPauseonPauseonPause");
        super.onPause();
    }

    @Override
    public void onResume() {
        Log.e(TAG, "onResumeonResumeonResumeonResume");
        super.onResume();
    }

    @Override
    public void onDestroy() {
        Log.e(TAG, "onDestroyonDestroyonDestroyonDestroy");
        super.onDestroy();
        exitFullscreen(getActivity());
    }

    public static boolean isImmersiveAvailable() {
        return Build.VERSION.SDK_INT >= 19;
    }

    @Override
    public void onStop() {
        super.onStop();
    }

    public void setFullscreen() {
        setFullscreen(getActivity());
    }

    public void setFullscreen(Activity activity) {
        if (Build.VERSION.SDK_INT > 10) {
            int flags = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_FULLSCREEN;

            if (isImmersiveAvailable()) {
                flags |= View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
            }

            activity.getWindow().getDecorView().setSystemUiVisibility(flags);
        } else {
            activity.getWindow()
                    .setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        }
    }

    public void exitFullscreen(Activity activity) {
        if (Build.VERSION.SDK_INT > 10) {
            activity.getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
        } else {
            activity.getWindow()
                    .setFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN,
                            WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
        }
    }
    /**
     * 스캔 결과 처리
     */
    @Override
    public void scanResult(DotObject dotObject){
        // 인식 후 사운드/ 진동 효과
        CommonUtil.makeSound(getActivity(), CommonUtil.getReaderBoolean(getActivity(), Credentials.ENTRY_SOUND_ALARM, true), CommonUtil.getReaderBoolean(getActivity(), Credentials.ENTRY_VIBRATE_ALARM, true));
        this.eventEmitter.sendDataMessageEvent(RNEventEmitter.RN_EVENT_DATA_MESSAGE_RECEIVE, dotObject);
    }
}