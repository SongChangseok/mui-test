import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

export const messageArray = {
  required: "필수 입력 항목입니다.",
  pattern: "형식이 올바르지 않습니다.",
};

export const patternArray = {
  cellphone: /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/,
  homephone: /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(d{3,4})-(d{4})$/,
  email: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+/,
};

export const formPattern = (type) => ({
  value: patternArray[type],
  message: messageArray.pattern,
});

const PhoneNumberMask = forwardRef(function PhoneNumberMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000-0000-0000"
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
      overwrite
    />
  );
});

const detailTypeArr = {
  cellphone: {
    pattern: /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/,
    inputComponent: PhoneNumberMask,
  },
};

export function InputValidator(props) {
  const { name, renderProp, detailType, rules, ...other } = props;
  const pattern = detailTypeArr[detailType]?.pattern;
  const render = ({ field: { onChange, value = "", name }, fieldState }) => {
    return renderProp({
      onChange,
      value,
      name,
      error: fieldState.error && true,
      helperText: messageArray[fieldState.error?.type],
      InputProps: { inputComponent: detailTypeArr[detailType]?.inputComponent },
    });
  };
  const ctrlProps = { ...other, name, render, rules: { ...rules, pattern } };
  return <Controller {...ctrlProps} />;
}
