import { countries } from "../data/countries";

export default function Form() {
    return (
        <form>
            <div>
                <label>Ciudad:</label>
                <input 
                    id="city" 
                    type="text" 
                    name="city"
                    placeholder="ciudad" 
                />
            </div>

            <div>
                <label>Pais:</label>
                <select>
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
                type="submit"
                value="Consultar clima"
            ></input>
        </form>
    )
}
