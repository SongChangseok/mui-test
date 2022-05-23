import React, { useEffect, useReducer, useState } from "react";
import { Box, Button } from "@mui/material";
import "../../login/Login.css";
import { useForm } from "react-hook-form";
import { Timer } from "../../common/Timer";
import { usePopup } from "../../popup/PopupProvider";
import Input from "../../common/Input";
import { requestData } from "../../common/Fetch";

const AuthTimer = ({ isRunning = false, endTimer = (f) => f }) => {
  const [info, setIsExpired] = useReducer((info, isExpired) => ({
    isExpired,
    message: isExpired
      ? `유효시간을 초과하였습니다. 다시 인증 요청하여 주세요.`
      : `인증번호가 발송되었습니다. 유효시간 `,
  }));
  const callback = () => {
    endTimer();
    setIsExpired(true);
  };

  useEffect(() => {
    if (!isRunning) setIsExpired(false);
  }, [isRunning]);

  if (isRunning)
    return info.isExpired ? (
      <div>{info.message}</div>
    ) : (
      <div>
        <span>{info.message}</span>
        <Timer minutes={5} seconds={0} callback={callback} />
      </div>
    );
  else return null;
};

export default function ReactHookFormTest() {
  const [authNo, setAuthNo] = useState();
  const userForm = useForm();
  const authForm = useForm();
  const { openPopup } = usePopup();
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const requestAuthNo = async ({ cust_nm, hp_no }) => {
    if (isTimerRunning) setIsTimerRunning(false);

    const body = {
      cust_nm: cust_nm,
      hp_no: hp_no,
      gubun: "02",
    };
    const result = await requestData("/dstk/Login/reqeustSmsCode.do", { body });
    if (!result.success) return openPopup({ message: result.data });
    if (result.data.resultCode != "00")
      return openPopup({ message: result.data.resultMessage });

    setAuthNo(result.data.authNo);
    setIsTimerRunning(true);
  };
  const endTimer = () => setAuthNo(null);
  const authenticate = async ({ auth_no }) => {
    const reqAuth = {
      acce_no: authNo,
      acce_key: auth_no,
    };
    const result = await requestData("/dstk/Login/requestAuthWithKey.do", {
      body: reqAuth,
    });
    if (!result.success) return openPopup({ message: result.data });
    if (result.data.resultCode != "00")
      return openPopup({ message: result.data.resultMessage });

    requestLoginInfo(auth_no);
  };
  const requestLoginInfo = async (auth_no) => {
    const { cust_nm, hp_no } = userForm.getValues();
    const reqLogin = {
      acce_no: authNo,
      acce_key: auth_no,
      cust_firm_nm: cust_nm,
      tel: hp_no,
    };
    const loginInfo = await requestData("/dstk/login", {
      body: reqLogin,
    });
    console.log(loginInfo);
  };

  useEffect(() => {
    authForm.setValue("auth_no", null);
  }, [isTimerRunning]);

  return (
    <Box>
      <Input
        name="cust_nm"
        label="성명"
        type="text"
        form={userForm}
        options={{ required: true }}
      />
      <Input
        name="hp_no"
        label="사용자 핸드폰번호"
        type="tel"
        form={userForm}
        options={{ required: true, detailType: "cellphone" }}
      />
      <div>
        <Input
          name="auth_no"
          label="인증번호"
          type="number"
          form={authForm}
          options={{ required: true, maxLength: 6, disabled: !authNo }}
        />
        <Button
          sx={{ marginLeft: 1 }}
          variant="contained"
          onClick={userForm.handleSubmit(requestAuthNo)}
        >
          {authNo ? "인증번호 재요청" : "인증번호 요청"}
        </Button>
      </div>
      <AuthTimer isRunning={isTimerRunning} endTimer={endTimer} />
      <Button
        id="authNumSubmit"
        variant="contained"
        onClick={authForm.handleSubmit(authenticate)}
        disabled={!authNo}
      >
        인증하기
      </Button>
    </Box>
  );
}
