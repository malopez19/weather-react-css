import { useState, ChangeEvent } from "react";
import { countries } from "../data/countries";
import style from "./Form.module.css"
import type { SearchType } from "../types";

export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form className={style.form}>
            <div className={style.field}>
                <label>Ciudad:</label>
                <input 
                    id="city" 
                    type="text" 
                    name="city"
                    placeholder="ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className= {style.field}>
                <label htmlFor="country">Pais:</label>
                <select
                    id="country"
                    name="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option>-- Seleccione un pais --</option>
                    {countries.map(country => (
                        <option 
                            key={country.code} 
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input
                className={style.submit} 
                type="submit"
                value="Consultar clima"
            ></input>
        </form>
    )
}
