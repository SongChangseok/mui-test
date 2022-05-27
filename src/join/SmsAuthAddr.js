import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function SmsAuthAddr() {
  return (
    <Box>
      <FormControl>
        <RadioGroup>
          <FormControlLabel value="test1" control={<Radio />} label="test1" />
          <FormControlLabel value="test2" control={<Radio />} label="test2" />
        </RadioGroup>
      </FormControl>
      <Box>
        <Button id="closeBtn" variant="contained">
          종료
        </Button>
        <Button id="joinBtn" variant="contained">
          계속하기
        </Button>
      </Box>
    </Box>
  );
}
