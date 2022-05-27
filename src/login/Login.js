import React from "react";
import { Box } from "@mui/material";
import "../login/Login.css";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import AuthNo from "../common/AuthNo";

export default function ReactHookFormTest() {
  const userForm = useForm();

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
      <AuthNo form={userForm} />
    </Box>
  );
}
