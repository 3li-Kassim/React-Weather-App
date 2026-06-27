import { useState, useEffect, Suspense } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [fiveWeatherInfo, setFiveWeatherInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const apiKey = "5c0dfb6ae182590784c0228880691505";
  const date = new Date();

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setWeatherInfo(data);
      });

    fetch(urlForecast)
      .then((data) => {
        return data.json();
      })
      .then((newData) => {
        setFiveWeatherInfo(newData.list.filter((data, i) => i % 8 == 0));
      });
  }, []);

  const sendData = () => {
    if (!inputValue) return;
    setIsFetching(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((newData) => {
        setWeatherInfo(newData);
      });

    fetch(urlForecast)
      .then((data) => {
        return data.json();
      })
      .then((newData) => {
        setFiveWeatherInfo(newData.list.filter((data, i) => i % 8 == 0));
        setIsFetching(false);
      });
  };

  return (
    <div className="container py-5 h-100 bg-dark">
      <div className="row d-flex justify-content-center align-items-center h-100 bg-dark">
        <div className="col-md-8 col-lg-6 col-xl-4 bg-dark">
          <h3 className="mb-4 pb-2 fw-normal">
            Search a city's weather forecast
          </h3>

          <div className="input-group rounded mb-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="City"
              className="form-control rounded-start border-dark"
            />
            <button onClick={sendData} className="btn btn-primary rounded-end">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {isFetching ? (
            <div className="d-flex justify-content-center my-5">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : weatherInfo !== null ? (
            <div
              className="card shadow-0 border"
              style={{ borderRadius: "35px" }}
            >
              <div className="card-body p-4">
                <div className="d-flex">
                  <h4 className="flex-grow-1">{weatherInfo.name}</h4>
                  <h6>
                    {date.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </h6>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <h6 className="display-4 mb-0 font-weight-bold">
                    {" "}
                    {weatherInfo.main.temp.toFixed(0)}°C
                  </h6>
                  <span className="small" style={{ color: "#868B94" }}>
                    {weatherInfo.weather[0].main}
                  </span>
                </div>

                <p className="small mb-0">
                  Max: <strong>{weatherInfo.main.temp_max.toFixed(0)}°C</strong>{" "}
                  Min: <strong>{weatherInfo.main.temp_min.toFixed(0)}°C</strong>
                </p>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                    <div>
                      <i
                        className="fas fa-wind fa-fw"
                        style={{ color: "#868B94" }}
                      ></i>
                      <span className="ms-1">{weatherInfo.wind.speed}km/h</span>
                    </div>

                    <div>
                      <i
                        className="fas fa-tint fa-fw"
                        style={{ color: "#868B94" }}
                      ></i>
                      <span className="ms-1">{weatherInfo.main.humidity}%</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                      style={{ width: "100px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {fiveWeatherInfo !== null ? (
            <div className="card border-0 bg-secondary bg-opacity-10 text-white shadow-lg rounded-4">
              <div className="card-body p-4">
                <h5 className="mb-3 text-secondary-emphasis fw-bold" >
                  5-Day Outlook
                </h5>
                <div className="d-flex justify-content-between align-items-center text-center overflow-x-auto gap-2 py-2">
                  {fiveWeatherInfo.map((forecast, index) => {
                    const forecastDate = new Date(forecast.dt_txt);
                    const dayName = forecastDate.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    return (
                      <div
                        key={index}
                        className="bg-dark bg-opacity-50 p-2 rounded-3 flex-fill"
                        style={{ minWidth: "70px" }}
                      >
                        <small className="text-secondary fw-semibold d-block text-uppercase">
                          {dayName}
                        </small>
                        <img
                          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                          alt="forecast icon"
                          style={{ width: "40px" }}
                        />
                        <span className="d-block fw-bold fs-6">
                          {forecast.main.temp.toFixed(0)}°C
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
