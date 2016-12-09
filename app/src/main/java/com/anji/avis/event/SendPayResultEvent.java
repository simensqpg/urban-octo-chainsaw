package com.anji.avis.event;

/**
 * Created by simens on 11/17/16.
 */

public class SendPayResultEvent {
    private String resultCode;

    public SendPayResultEvent(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultCode() {
        return resultCode;
    }
}
