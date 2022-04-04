import "./appointment.css";
import img from "../../../Components/assets/homepage.jpg";

export default function Appointment() {
  return (
    <>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,415</span>
            <span className="featuredMoneyRate">-11.4</span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,415</span>
            <span className="featuredMoneyRate">-1.4</span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      <img src={img} className="home-img" />

      </div>
    </>
  );
}
