import React, { Component } from 'react';

import './App.css';
import 'typeface-roboto';


// COMPONENTS
import CityInput from './Components/CityInput.js';
import CurrentWeather from './Components/CurrentWeather.js';
import HourlyWeather from './Components/HourlyWeather.js';
import DailyWeather from './Components/DailyWeather.js';
import GoogleMap from './Components/GoogleMap.js';


class App extends Component {
  constructor(props){
    super(props);
    this.updateCity = this.updateCity.bind(this);
    this.submitCity = this.submitCity.bind(this);
    this.state = {
      city: 'Medellin',
      latitude: 0,
      longitude: 0,
      weatherData: {},
      current: {},
      hours_today: {},  
      hourly: {},
      daily: {},
      today: {}
    }
  }
  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
  }
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  updateCity(city){
    this.setState({city: city});
  }
  submitCity(){
    

    fetch('/getLatLong', {
      method: 'POST',
      body: JSON.stringify({
        city: this.state.city
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res)=>{
      // *************************
      // Question about using stream reader:
      // const reader = res.body.getReader();
      // reader.read().then(({done, value})=>{
      //   console.log(value);
      // })

      // for (var value of res.headers.values()) {
      //   console.log(value); 
      // };      
      //const reader=res.body.getReader();
      // reader.read()
      // .then((data)=>{
      //   console.log(data.toString());
      // });
      //console.log('res.body');
      // res.body.getReader().read().then((data)=>{console.log(data)});
      // console.log(res.body.getReader().read().then((data)=>{console.log(data)}));
      // console.log(res);
      // console.log(res.body);
      // res.body.getReader().read()
      // .then((data)=>{
      //   console.log(data);
      // }); //this basically is just like some array of 22 integers
      // *****************************

      console.log(res);

      //console.log(res.headers.forEach((value)=>{console.log(value)}));
      return res.json();
    })
    .then((resJSON)=>{
      console.log(resJSON);
      this.setState({
        weatherData: resJSON,
        latitude: resJSON.latitude,
        longitude: resJSON.longitude,
        current: resJSON.currently,
        hourly: resJSON.hourly,
        hours_today: resJSON.hourly.data.slice(0,24),
        daily: resJSON.daily,
        today: resJSON.daily.data[0]
      });
    });
  }
  render() {
    return (
      <div className="App">
        <CityInput 
          updateCity = {this.updateCity}
          submitCity = {this.submitCity}
          city = {this.state.city}
        />
        <CurrentWeather 
          current = {this.state.current}
          today = {this.state.today}
        />
        <HourlyWeather 
          hourly = {this.state.hourly}
          hours_today = {this.state.hours_today}
        />
        <DailyWeather 
          daily = {this.state.daily}
        />
        <GoogleMap  
          latitude = {this.state.latitude}
          longitude = {this.state.longitude}
        /> 
        
             
      </div>
    );
  }
}

export default App;
