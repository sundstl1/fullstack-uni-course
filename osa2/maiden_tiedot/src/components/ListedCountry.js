import React from "react";
import Button from "./Button";

const ListedCountry = ({country, onClick}) =>{

    return (
        <li>
            {country.name}
            <Button
                text="show"
                onClick={onClick.bind(this, country)}
            />
        </li>
    )
}

export default ListedCountry