import { TextField } from "@mui/material";
import React from "react";
import { formPattern, messageArray } from "./Validator";

const errorProps = (info) => ({
  error: info && true,
  helperText: info?.message,
});

const registerOptions = (options = {}) => {
  const { required, detailType, ...other } = options;
  return {
    ...other,
    required: required ? messageArray.required : "",
    pattern: formPattern(detailType),
  };
};

export default function Input({
  name,
  label,
  type,
  form,
  options = {},
  ...other
}) {
  const register = form.register(name, registerOptions(options));
  const error = errorProps(form.formState.errors[name]);
  const props = {
    label,
    type,
    name,
    ...register,
    ...error,
    ...other,
    margin: "dense",
    variant: "standard",
  };
  return <TextField {...props} />;
}
