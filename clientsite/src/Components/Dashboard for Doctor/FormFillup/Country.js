
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import './Country.css'

class Country extends Component {
    constructor (props) {
      super(props);
      this.state = { country: '', region: '' };
    }
  
    selectCountry (val) {
      this.setState({ country: val });
    }
  
    selectRegion (val) {
      this.setState({ region: val });
    }
  
    render () {
      const { country, region } = this.state;
      return (
        <div className='country'>
          <CountryDropdown
            value={country}
            onChange={(val) => this.selectCountry(val)} 
            className="country-dropdown"
            />
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => this.selectRegion(val)} 
            className="region-dropdown"
            />
        </div>
      );
    }
}

export default Country;