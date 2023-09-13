import { useEffect, useState } from "react";
import { getLocationData, getWeatherForecast } from "../../services/utils";
import Spinner from "../../components/Spinner";
import moment from "moment";
import "./Weather.scss";

function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    getLocationData().then((resp) => {
      const ipaddress = resp.ip;
      // or latitude longtitude
      // const loc = `${resp.location.latitude},${resp.location.longitude}`;
      // current city
      const city = `${resp.city.name} ${resp.country.name}`;
      setLocation(city);

      getWeatherForecast(ipaddress).then((resp) => {
        setWeatherData(resp);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    });
  }, []);

  const changeCityWeather = () => {
    let query = location;
    if (String(query).trim().length === 0) {
      getLocationData().then((resp) => {
        query = resp.ip;
        // or latitude longtitude
        // const loc = `${resp.location.latitude},${resp.location.longitude}`;
        // current city
        const city = `${resp.city.name} ${resp.country.name}`;
        setLocation(city);

        getWeatherForecast(query).then((resp) => {
          setWeatherData(resp);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
      });
    } else {
      getWeatherForecast(query).then((resp) => {
        setWeatherData(resp);
        console.log(
          "🚀 ~ file: index.js:51 ~ getWeatherForecast ~ resp:",
          resp
        );
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  };

  return (
    <>
      <div className="row"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-geo-alt"
        viewBox="0 0 16 16"
      >
        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>{" "}
      Your city
      <input
        className="m-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <a href="#" alt="refresh" onClick={changeCityWeather}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </a>
      {!loading && !!weatherData ? (
        <>
          <div className="card mb-2">
            <h5 className="card-header">
              {weatherData.location.name + ", " + weatherData.location.country}
            </h5>
            <div className="card-body">
              <h3 className="card-title">
                <span className="summaryTemperature">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-thermometer-half"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                  </svg>
                  {weatherData.current.temp_c}
                  <span className="summaryTemperatureUnit me-2">°C </span>
                  {" Today"}
                </span>
              </h3>
              <div className="card-text">
                <div className="row align-items-center justify-content-center">
                  <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                    <img
                      src={weatherData.current.condition.icon}
                      className="weatherConditionText"
                      alt={weatherData.current.condition.text}
                    />
                  </div>
                  <div className="col-8 col-sm-5 col-md-4 col-lg-4">
                    <div>
                      <span className="weatherConditionText">
                        {weatherData.current.condition.text}
                      </span>
                    </div>
                    <div>
                      <div className="weatherTemperatureRange">
                        Feels like: {weatherData.current.feelslike_c}
                        <span className="summaryTemperatureUnit">°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <h2>7-DAY FORECAST</h2>
            {weatherData.forecast.forecastday.map((forecast, index) => {
              return (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div
                    className="card m-md-3 m-sm-1 mb-2 pb-3"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <h4 className="card-title text-start p-2">
                        {` ${moment(forecast.date).format("ddd DD")}`}
                      </h4>
                      <div className="row">
                        <div className="col-3 col-sm-3 ">
                          <img
                            src={forecast.day.condition.icon}
                            className="weatherConditionText"
                            alt={forecast.day.condition.text}
                          />
                        </div>
                        <div className="col-9 col-sm-9 ">
                          <div>
                            <span className="weatherConditionText">
                              {forecast.day.condition.text}
                            </span>
                          </div>
                          <div>
                            <div className="weatherTemperatureRange">
                              H: {forecast.day.maxtemp_c}
                              <span className="summaryTemperatureUnit">°C</span>
                            </div>
                            <div className="weatherTemperatureRange">
                              L: {forecast.day.mintemp_c}
                              <span className="summaryTemperatureUnit">°C</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Weather;
