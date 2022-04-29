import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import InputValidator from "../custom/Validator";
import "./Login.css";

// 핸드폰 포맷
const PhoneNumberMask = forwardRef(function PhoneNumberMask(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#00-0000-0000"
      definitions={{
        "#": /[0]/,
      }}
      inputRef={ref}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value } })
      }
      overwrite
    />
  );
});

export default function Login() {
  const { control, handleSubmit } = useForm();
  //   const errorMessageArray = {
  //     required: "필수 입력 항목입니다.",
  //     pattern: "형식이 올바르지 않습니다.",
  //   };

  return (
    <Box>
      <InputValidator
        name="cust_nm"
        type="text"
        control={control}
        customRender={(props) => (
          <TextField {...props} label="성명" margin="normal" />
        )}
        rules={{ required: true }}
      />
      <InputValidator
        name="hp_no"
        type="tel"
        control={control}
        customRender={(props) => (
          <TextField
            {...props}
            label="사용자 핸드폰번호"
            margin="normal"
            InputProps={{ inputComponent: PhoneNumberMask }}
          />
        )}
        rules={{
          required: true,
          pattern: /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/,
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputValidator
          name="auth_no"
          type="text"
          control={control}
          customRender={(props) => (
            <TextField {...props} label="인증번호" margin="normal" disabled />
          )}
          rules={{ required: true }}
        />
        <Button
          sx={{ marginLeft: 1 }}
          variant="contained"
          onClick={handleSubmit(
            (data) => console.log(data),
            (data) => console.log(data)
          )}
        >
          인증번호 요청
        </Button>
      </div>
      <Button variant="contained">인증하기</Button>
    </Box>
  );
}
