// import { Button, TextField } from "@mui/material";
// import React from "react";
// import { useForm } from "react-hook-form";

// export default function ReackHookFormTest() {
//   const { register, handleSubmit } = useForm();

//   return (
//     <form>
//       <TextField {...register("firstName", { required: true })} />
//       <Button onClick={handleSubmit((data) => console.log(data))}>test</Button>
//     </form>
//   );
// }

import React, { useEffect, useReducer, useState } from "react";
import { Box, Button } from "@mui/material";
import "../../login/Login.css";
import { useForm } from "react-hook-form";
import { Timer } from "../../common/Timer";
import { usePopup } from "../../popup/PopupProvider";
import Input from "../../common/Input";
import { deleteHyphen } from "../../common/Function";

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
        <Timer minutes={0} seconds={5} callback={callback} />
      </div>
    );
  else return null;
};

export default function ReactHookFormTest() {
  const [authInfo, setAuthInfo] = useState();
  const userForm = useForm();
  const authForm = useForm();
  const { openPopup } = usePopup();
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const authNumReqClick = async ({ cust_nm, hp_no }) => {
    if (isTimerRunning) setIsTimerRunning(false);
    const body = {
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
    if (json.data.resultCode == "00") {
      setAuthInfo(json);
      setIsTimerRunning(true);
    } else {
      openPopup({ message: json.data.resultMessage });
    }
  };
  const endTimer = () => {
    setAuthInfo();
    console.log(authInfo);
  };

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
          form={userForm}
          options={{ required: true, maxLength: 6, disabled: !authInfo }}
        />
        <Button
          id="authNumReq"
          sx={{ marginLeft: 1 }}
          variant="contained"
          onClick={userForm.handleSubmit(authNumReqClick, (data, e) => {
            console.log(data, e);
          })}
        >
          {authInfo ? "인증번호 재요청" : "인증번호 요청"}
        </Button>
      </div>
      <AuthTimer isRunning={isTimerRunning} endTimer={endTimer} />
      <Button
        variant="contained"
        onClick={authForm.handleSubmit(authNumReqClick)}
        disabled={!authInfo}
      >
        인증하기
      </Button>
    </Box>
  );
}
