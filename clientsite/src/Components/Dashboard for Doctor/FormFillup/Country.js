import React, { Component } from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import "./Country.css";

const Country = (props) => {
  return (
    <div className="country">
      <CountryDropdown
        value={props.country}
        onChange={(val) => props.setcountry(val)}
        className="country-dropdown"
      />
      <RegionDropdown
        country={props.country}
        value={props.city}
        onChange={(val) => props.setcity(val)}
        className="region-dropdown"
      />
    </div>
  );
};

export default Country;
