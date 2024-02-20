import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Trimester(props) {
  const handleChange = (event) => {
    props.setAge(event.target.value);
  };

  console.log(props.age);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.age}
          label="Trimester"
          onChange={handleChange}
        >
          <MenuItem value={"1st"}>1st</MenuItem>
          <MenuItem value={"2nd"}>2nd</MenuItem>
          <MenuItem value={"3rd"}>3rd</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
