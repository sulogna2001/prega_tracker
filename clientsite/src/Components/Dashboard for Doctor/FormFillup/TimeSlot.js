import React, { useState } from "react";
import TimePicker from "react-time-picker";

const TimeSlot = () => {
  const [value, setValue] = useState("10:00");


  return (
    <div>
      <TimePicker
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
      />
    </div>
  );
};

export default TimeSlot;
