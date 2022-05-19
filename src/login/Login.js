// import { Button, TextField } from "@mui/material";
// import { Box } from "@mui/system";
// import React, { useEffect, useReducer, useState } from "react";
// import { useForm } from "react-hook-form";
// import ErrorBoundary from "../error/ErrorBoundary";
// import { deleteHyphen } from "../common/function/function";
// import { InputValidator } from "../custom/Validator";
// import { usePopup } from "../popup/PopupProvider";
// import "./Login.css";
// import { Timer } from "../common/component/Timer";

// const AuthTimer = ({ isRunning = false, endTimer = (f) => f }) => {
//   const [info, setIsExpired] = useReducer((info, isExpired) => ({
//     isExpired,
//     message: isExpired
//       ? `유효시간을 초과하였습니다. 다시 인증 요청하여 주세요.`
//       : `인증번호가 발송되었습니다. 유효시간 `,
//   }));
//   const callback = () => {
//     endTimer();
//     setIsExpired(true);
//   };

//   useEffect(() => {
//     if (!isRunning) setIsExpired(false);
//   }, [isRunning]);

//   if (isRunning)
//     return info.isExpired ? (
//       <div>{info.message}</div>
//     ) : (
//       <div>
//         <span>{info.message}</span>
//         <Timer minutes={0} seconds={5} callback={callback} />
//       </div>
//     );
//   else return null;
// };

// export default function Login() {
//   const { openPopup } = usePopup();
//   const [authInfo, setAuthInfo] = useState();
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const { control: controlUser, handleSubmit: handleSubmitUser } = useForm();
//   const { control: controlAuth, handleSubmit: handleSubmitAuth } = useForm();
//   const authNumReqClick = async ({ cust_nm, hp_no }) => {
//     if (isTimerRunning) setIsTimerRunning(false);

//     let body = {
//       cust_nm: cust_nm,
//       hp_no: deleteHyphen(hp_no),
//       gubun: "02",
//     };

//     let result = await fetch("/dstk/Login/reqeustSmsCode.do", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify(body),
//     });
//     let json = await result.json();

//     if (json.data.resultCode == "00") {
//       setAuthInfo(json);
//       setIsTimerRunning(true);
//     } else {
//       openPopup({ message: json.data.resultMessage });
//     }
//   };
//   const endTimer = () => {
//     setAuthInfo();
//   };

//   return (
//     <ErrorBoundary>
//       <Box>
//         <InputValidator
//           name="cust_nm"
//           type="text"
//           control={controlUser}
//           renderProp={(props) => <TextField {...props} label="성명" />}
//           rules={{ required: true }}
//         />
//         <InputValidator
//           name="hp_no"
//           type="tel"
//           detailType="cellphone"
//           control={controlUser}
//           label="사용자 핸드폰번호"
//           renderProp={(props) => <TextField {...props} />}
//           rules={{
//             required: true,
//           }}
//         />
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <InputValidator
//             name="auth_no"
//             type="text"
//             control={controlAuth}
//             renderProp={(props) => (
//               <TextField {...props} label="인증번호" disabled={!authInfo} />
//             )}
//             rules={{ required: true }}
//           />
//           <Button
//             id="authNumReq"
//             sx={{ marginLeft: 1 }}
//             variant="contained"
//             onClick={handleSubmitUser(authNumReqClick)}
//           >
//             {authInfo ? "인증번호 재요청" : "인증번호 요청"}
//           </Button>
//         </div>
//         <AuthTimer isRunning={isTimerRunning} endTimer={endTimer} />
//         <Button
//           variant="contained"
//           onClick={handleSubmitAuth(authNumReqClick)}
//           disabled={!authInfo}
//         >
//           인증하기
//         </Button>
//         <Button
//           onClick={() => {
//             setIsTimerRunning(!isTimerRunning);
//           }}
//         >
//           Test
//         </Button>
//       </Box>
//     </ErrorBoundary>
//   );
// }

import React from "react";

export default function Login() {
  return <></>;
}
