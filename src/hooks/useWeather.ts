import axios from "axios"
//import { object, string, number, InferOutput, parse } from "valibot"
import { SearchType, Weather } from "../types"
import { z } from "zod"
import { useMemo, useState } from "react"

//type guard
/* function isWeatherResponse(weather: unknown): weather is Weather{
    return (
        Boolean(weather) &&
        typeof weather === 'object' &&
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number'
    )
} */

//zod
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })    
})
export type Weather = z.infer<typeof WeatherSchema>

//valibot
/* 
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})
type Weather = InferOutput<typeof WeatherSchema> */

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios.get(geoUrl)

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            //CAST TYPE
            /* const { data:  weatherData } = await axios.get<Weather>(weatherUrl)
            console.log(weatherData.name) */

            //TYPE GUARD O ASSERTION
            /* const { data:  weatherData } = await axios.get(weatherUrl)
            const result = isWeatherResponse(weatherData)
            if (result) {
                console.log(weatherData.name)
            } */

            //ZOD
            const { data:  weatherData } = await axios.get(weatherUrl)
            const result = WeatherSchema.safeParse(weatherData)
            if(result.success){
                setWeather(result.data)
            }

            //VALIBOT
            /* const { data:  weatherData } = await axios.get(weatherUrl)
            const result = parse(WeatherSchema ,weatherData)
            if(result){
                console.log(result.name)
                console.log(result.main.temp)
            } */

        } catch (error) {
            console.error(error)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        fetchWeather,
        hasWeatherData
    }   
}
