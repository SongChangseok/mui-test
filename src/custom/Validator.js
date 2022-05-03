import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

const errorMessageArray = {
  required: "필수 입력 항목입니다.",
  pattern: "형식이 올바르지 않습니다.",
};

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

const typeArr = {
  cellphone: {
    pattern: /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/,
    inputComponent: PhoneNumberMask,
  },
};

export default function InputValidator(props) {
  const { name, customRender, detailType, rules, ...other } = props;
  const pattern = typeArr[detailType]?.pattern;
  const render = ({ field: { onChange, value = "", name }, fieldState }) => {
    return customRender({
      onChange,
      value,
      name,
      error: fieldState.error && true,
      helperText: errorMessageArray[fieldState.error?.type],
      InputProps: { inputComponent: typeArr[detailType]?.inputComponent },
    });
  };
  const ctrlProps = { ...other, name, render, rules: { ...rules, pattern } };
  return <Controller {...ctrlProps} />;
}
