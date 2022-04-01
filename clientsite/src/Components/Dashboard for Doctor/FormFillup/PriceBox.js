import React from 'react'
import CurrencyInput from 'react-currency-input-field';

const PriceBox = () => {
    return (
        <div>
            <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Please enter a number"
                defaultValue={1000}
                decimalsLimit={2}
                onValueChange={(value, name) => console.log(value, name)}
                prefix="₹"
                style={{
                    border: "2px solid black",
                    borderRadius: "10px"
                }}
            />
        </div>
    )
}

export default PriceBox