package com.anji.avis.dialog;

import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.TextUtils;

import com.anji.avis.R;

/**
 * Created by simens on 11/22/16.
 */

public class AlertDialogFragment  extends DialogFragment {

    private String title;
    private String message;
    private int imageId;
    private String positiveButtonText;
    private String negativeButtonText;
    private DialogInterface.OnClickListener positiveButton;
    public DialogInterface.OnClickListener negativeButton;
    private int layoutId;
    private boolean bSupportCancel;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public void setPositiveButtonText(String positiveButtonText) {
        this.positiveButtonText = positiveButtonText;
    }

    public void setNegativeButtonText(String negativeButtonText) {
        this.negativeButtonText = negativeButtonText;
    }

    public void setPositiveButton(DialogInterface.OnClickListener positiveButton) {
        this.positiveButton = positiveButton;
    }

    public void setNegativeButton(DialogInterface.OnClickListener negativeButton) {
        this.negativeButton = negativeButton;
    }

    public void setLayoutId(int layoutId) {
        this.layoutId = layoutId;
    }

    public void setSupportCancel(boolean bSupportCancel) {
        this.bSupportCancel = bSupportCancel;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        if (!TextUtils.isEmpty(title)){
            builder.setTitle(title);
        }
        if (!TextUtils.isEmpty(message)){
            builder.setMessage(message);
        }

        if (!TextUtils.isEmpty(positiveButtonText)){
            builder.setPositiveButton(positiveButtonText, positiveButton == null ? new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    onCancel(dialog);
                }
            } : positiveButton);
        }else{
            builder.setPositiveButton(android.R.string.ok, positiveButton == null ? new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    onCancel(dialog);
                }
            } : positiveButton);
        }

        if (null != negativeButton){
            if (!TextUtils.isEmpty(negativeButtonText)){
                builder.setNegativeButton(negativeButtonText, negativeButton);
            }else {
                builder.setNegativeButton(R.string.cancel, negativeButton);
            }
        }

        if (0 != imageId){
            builder.setImage(imageId);
        }

        //兼容
        if (bSupportCancel) {
            if (TextUtils.isEmpty(negativeButtonText)){
                builder.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        onCancel(dialog);
                    }
                });
            }else{
                builder.setNegativeButton(negativeButtonText, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        onCancel(dialog);
                    }
                });
            }
        }

        if (0 != layoutId){
            return builder.create(layoutId);
        }else {
            return builder.onCreate();
        }
    }
}
