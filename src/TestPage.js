import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Fetch, useFetch } from "./common/Fetch";

// const ComboBox = ({ onChange = (f) => f }) => {
//   return (
//     <Fetch
//       uri={`http://pet-library.moonhighway.com/api/pets`}
//       renderSuccess={({ data }) => {
//         const options = data.map(({ id, name }) => ({ id, label: name }));
//         debugger;
//         return (
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             options={options}
//             sx={{ wdith: 300 }}
//             renderInput={(params) => <TextField {...params} label="Pets" />}
//             onChange={onChange}
//           />
//         );
//       }}
//     />
//   );
// };

// const data = [
//   { id: 1, label: "option1" },
//   { id: 2, label: "option2" },
//   { id: 3, label: "option3" },
// ];
const ComboBox = () => {
  const [options, setOptions] = useState([]);
  const [petName, setPetName] = useState();
  const { loading, data, error } = useFetch(
    `http://pet-library.moonhighway.com/api/pets`
  );

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ wdith: 300 }}
      renderInput={(params) => <TextField {...params} label="Pets" />}
      getOptionLabel={(option) => option.label}
      onChange={(e, newValue) => {
        console.log(newValue);
        setPetName(newValue);
      }}
    />
  );
};

export default function TestPage() {
  const [petName, setPetName] = useState();
  //   const [petList, setPetLsit] = useState([]);
  //   const onClick = (e) => {
  //     setPetLsit(petName);
  //     // setPetName("");
  //     console.log(petList);
  //   };
  return (
    <div>
      <ComboBox onChange={(e, newValue) => setPetName(newValue)} />
      {/* <Button onClick={onClick}>Add</Button> */}
    </div>
  );
}
