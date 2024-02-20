import React, { useState } from "react";
import TimePicker from "react-time-picker";

const TimeSlot = (props) => {
  return (
    <div>
      <TimePicker
        onChange={(newValue) => {
          props.setstartTime(newValue);
        }}
        value={props.startTime}
      />
    </div>
  );
};

export default TimeSlot;
