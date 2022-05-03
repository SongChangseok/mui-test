import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteHyphen } from "../common/function/function";
// import { BackdropLoading } from "../common/Loading";
import InputValidator from "../custom/Validator";
import "./Login.css";

export default function Login() {
  const [authInfo, setAuthInfo] = useState();
  const userForm = useForm();
  const authForm = useForm();
  const authNumReqClick = async ({ cust_nm, hp_no }) => {
    let body = {
      cust_nm: cust_nm,
      hp_no: deleteHyphen(hp_no),
      gubun: "02",
    };

    let result = await fetch("/dstk/Login/reqeustSmsCode.do", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    let json = await result.json();

    if (json.data.resultCode != "00") throw new Error(json.data.resultMessage);

    setAuthInfo(json);
  };

  console.log(authInfo);

  return (
    <Box>
      <InputValidator
        name="cust_nm"
        type="text"
        control={userForm.control}
        customRender={(props) => (
          <TextField {...props} label="성명" margin="normal" />
        )}
        rules={{ required: true }}
      />
      <InputValidator
        name="hp_no"
        type="tel"
        detailType="cellphone"
        control={userForm.control}
        customRender={(props) => (
          <TextField {...props} label="사용자 핸드폰번호" margin="dense" />
        )}
        rules={{
          required: true,
        }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputValidator
          name="auth_no"
          type="text"
          control={authForm.control}
          customRender={(props) => (
            <TextField
              {...props}
              label="인증번호"
              margin="dense"
              disabled={!authInfo && true}
            />
          )}
          rules={{ required: true }}
        />
        <Button
          id="authNumReq"
          sx={{ marginLeft: 1 }}
          variant="contained"
          onClick={userForm.handleSubmit(authNumReqClick)}
        >
          {authInfo ? "인증번호 재요청" : "인증번호 요청"}
        </Button>
      </div>
      <Button
        variant="contained"
        onClick={authForm.handleSubmit(authNumReqClick)}
        disabled={!authInfo && true}
      >
        인증하기
      </Button>
    </Box>
  );
}
