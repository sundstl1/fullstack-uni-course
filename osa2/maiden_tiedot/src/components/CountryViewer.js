import React from "react";
import DetailedCountry from "./DetailedCountry";
import ListedCountry from "./ListedCountry";

const CountryViewer = ({countries, showCountry}) => {
    
    if (countries.length > 10){
        return (
            <div>
                To many matches, specify another filter
            </div>
        )
    }
    else if (countries.length === 1){
        return (
            <DetailedCountry country={countries[0]} />
        )
    }
    else{
        return (
            <div>
                    {countries.map(c => <ListedCountry key={c.name} country={c} onClick={showCountry}/> )}
            </div>
            )
        }
    }
    


export default CountryViewer