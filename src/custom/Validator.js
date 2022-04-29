import React from "react";
import { Controller } from "react-hook-form";

const errorMessageArray = {
  required: "필수 입력 항목입니다.",
  pattern: "형식이 올바르지 않습니다.",
};

export default function InputValidator(props) {
  const { name, customRender, ...other } = props;
  const render = ({ field: { onChange, value = "", name }, fieldState }) => {
    const error = fieldState.error && true;
    const helperText = errorMessageArray[fieldState.error?.type];
    return customRender({ onChange, value, name, error, helperText });
  };
  const ctrlProps = { ...other, name, render };

  return <Controller {...ctrlProps} />;
}
