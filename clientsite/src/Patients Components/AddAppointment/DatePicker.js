import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default function DatePicker2({ value, setValue }) {
  return (
    <div>
      <Calendar onChange={setValue} value={value} minDate={moment().toDate()} />
    </div>
  );
}
