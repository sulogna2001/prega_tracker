import React from "react";
import CurrencyInput from "react-currency-input-field";

const PriceBox = (props) => {
  return (
    <div>
      <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        decimalsLimit={2}
        value={props.fees}
        onValueChange={(value, name) => props.setfees(value)}
        prefix="₹"
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          background: "#FEFEDF",
        }}
      />
    </div>
  );
};

export default PriceBox;
