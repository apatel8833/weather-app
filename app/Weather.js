"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Weather = () => {
    const [input, setInput] = useState("");
    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState([]);
    const [img, setImg] = useState([]);
    const [city, setCity] = useState("bhopal")
  
  
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setCity(input);
  
    }
  
    useEffect(() => {
  
  
      async function fetchData(params) {
  
        try {
          const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=182107ca751f4b34b9b83025a28c4df9`
          )
          setDetails(data.main);
          setSearch(data);
          setImg(data.weather[0]);
  
          console.log(img);
          setInput("");
        }
        catch (error) {
          console.log(error);
  
        }
      }
      fetchData();
    }, [city])
    // fetchData();
  
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: "long" });
    let day = d.toLocaleString("default", { weekday: "long" });
  
  
    let time = d.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  
    let com = 273.15
    let tamp = parseFloat(details.temp - com).toFixed();
    let tamp_max = parseFloat(details.temp_max - com).toFixed();
    let tamp_min = parseFloat(details.temp_min - com).toFixed();
  
    let emoji = null;
  
    if (typeof details != "undefined") {
      if (img.main == "Clouds") {
        emoji = "ri-cloudy-2-fill"
      }
      else if (img.main == "Rain") {
        emoji = "ri-cloudy-fill"
      }
      else if (img.main == "Haze") {
        emoji = "ri-sun-cloudy-fill"
      }
      else {
        emoji = "ri-moon-cloudy-fill"
      }
  
    }
  
    return (
      <>
        <div className='cont p-4 bg-black'>
          <div className="card  text-bg-dark m-auto d-flex justify-content-center align-items-center ">
            <img src={`https://source.unsplash.com/600x900/?${img.main}`} className="card-img" alt="..."></img>
            <div className='details d-flex card-img-overlay flex-column  justify-content-around '>
              <form onSubmit={handleSubmit}>
                <input
                  type='search'
                  name='search'
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder='Enter city'></input>
                <button type='submit'><i className="ri-search-line"></i></button>
              </form>
              <div style={{ textAlign: 'center' }} className="overlay w-80 h-75 bg-dark bg-opacity-50  py-3">
                <h5 className="card-title fs-2 fw-bolder">{search.name}</h5>
                <p className="card-text fs-5 fw-light">{day},{month} {date}, {year}</p>
                {/* <div className='tm  fs-6'></div> */}
                <hr></hr>
                <i className={`${emoji} fs-2`}></i>
                <h1>{tamp}&deg;C</h1>
                <hr></hr>
                <span className=' fs-4 fw-bolder'>{img.main}</span>
                <div className='minmax mt-2 fw-light'>{tamp_min}&deg;C||{tamp_max}&deg;C</div>
                <div className=' mt-2 pressure'>pressure = {details.pressure}</div>
                <div className=' mt-2 humidity'>humidity = {details.humidity}</div>
                {/* <p class="card-text"><small>Last updated 3 mins ago</small></p> */}
              </div>
            </div>
  
          </div>
        </div>
      </>
    );
}

export default Weather