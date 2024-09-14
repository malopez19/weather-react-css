import { useState, ChangeEvent, FormEvent } from "react";
import { countries } from "../../data/countries";
import style from "./Form.module.css"
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({ fetchWeather } : FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: "",
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

    return (
        <form 
            className={style.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
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
