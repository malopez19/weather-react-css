import styles from "./App.module.css"
import Form from "./Form/Form"
import useWeather from "./hooks/useWeather"

function App() {

  const { fetchWeather } = useWeather()

  return (
    <>
      <h2 className={styles.title}>Buscador de clima
      </h2>
      <div className={styles.container}>
        <Form 
          fetchWeather= {fetchWeather}
        />
      </div>
    </>
  )
}

export default App
