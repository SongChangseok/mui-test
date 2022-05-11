import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Buttons = ({ type = "alert", onClose, onConfirm, onCancel }) => {
  if (type === "alert") {
    return (
      <Button onClick={onConfirm ? onConfirm : onClose} variant="contained">
        확인
      </Button>
    );
  } else if (type === "confirm") {
    return (
      <>
        <Button onClick={onCancel ? onCancel : onClose} variant="outlined">
          취소
        </Button>
        <Button onClick={onConfirm ? onConfirm : onClose} variant="contained">
          확인
        </Button>
      </>
    );
  } else {
    return null;
  }
};

export default function Popup({
  type = "alert",
  open = true,
  title = "알림",
  message = "",
  onClose,
  onConfirm,
  onCancel,
}) {
  const options = { type, onClose, onConfirm, onCancel };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Buttons {...options} />
      </DialogActions>
    </Dialog>
  );
}
