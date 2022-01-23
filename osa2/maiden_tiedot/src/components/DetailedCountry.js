import React from "react";
import Weather from "./Weather";

const DetailedCountry = ({country}) => (
    <>
        <h1>
            {country.name}
        </h1>
        <p>
            capital {country.capital}<br/>
            population {country.population}
        </p>
        <h2>
            languages
        </h2>
        <ul>
            {country.languages.map(l => <li key={l.name}>{l.name}</li> )}
        </ul>
        <img
        src={country.flags.png}
        />
        <Weather city={country.capital} />
    </>
)

export default DetailedCountry
