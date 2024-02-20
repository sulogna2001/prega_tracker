import React, { useState } from "react";
import TimePicker from "react-time-picker";

const EndTimeSlot = (props) => {
  return (
    <div>
      <TimePicker
        onChange={(newValue) => {
          props.setendTime(newValue);
        }}
        value={props.endTime}
      />
    </div>
  );
};

export default EndTimeSlot;
