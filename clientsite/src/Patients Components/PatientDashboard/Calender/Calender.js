import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import moment from "moment";

export const Calender = () => {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <div className="cal">
      <Calendar value={dateState} onChange={changeDate} />
    </div>
  );
};
