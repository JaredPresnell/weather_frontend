import React, { Component } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  hourly_temperature: {
    'margin-right': 5,
  },
  hourly_container: {
  	'justify-content': 'center',
  	'text-align': 'center',
  	'min-height': 46,
  },
  graphItem: {
  	width: 64,
  	'border-left': '1px solid rgb(127, 130, 135, 0.4)',
  	'textAlign': 'left',
  	'paddingLeft': 5,
  	'margin-bottom': 5
  },
  time_divider_container: {
  	'justify-content': 'center',
  	width: '100%',
  	'text-align': 'center',
  	height: '8'
  },
};
class HourlyWeather extends Component {
	constructor(props){
	    super(props);
	    this.renderHours = this.renderHours.bind(this);
  	}	
  	convertToAmPm(hours){
  		var time = hours%24;
  		if(time>12)
  			return time-12 + 'pm';
  		else return time + 'am';
  	}
  	mapColor(weatherType){
  		switch(weatherType){
  			case "Rain":
				return '#196aea';
			case "Heavy Rain":
				return "#4a80c7";
			case "Light Rain":
				return "#80a5d6";
			case "Mostly Cloudy":
				return "#484b4f";
			case "Partly Cloudy":
				return "#8b8e93";
			case "Clear":
				return "#a8c8ff";
			case "Overcast":
				return "#8b8e93";
			default:
				return "#a8c8ff";
  		}
  	}
  	mapWeather(hours_today){
  		var hourlyWeather = [];
  		hours_today.forEach((hour, index)=>{
			if(index>0){
				if(hour.summary != hourlyWeather[hourlyWeather.length-1].weatherType)
					hourlyWeather.push({weatherType: hour.summary, duration: 1});
				else hourlyWeather[hourlyWeather.length-1].duration = hourlyWeather[hourlyWeather.length-1].duration +1;
			}
			else hourlyWeather.push({weatherType: hour.summary, duration:1});
		});
		var hourlyWeatherJsx = [];
		var hourlyWeatherLastIndex = hourlyWeather.length-1;
		console.log(hourlyWeatherLastIndex);
		hourlyWeather.forEach((weather, index)=>{
			var gridWidthStyle = {
				width: 35*weather.duration,
				'backgroundColor': this.mapColor(weather.weatherType),
				//height:50,
				// 'padding-top':20,
				// 'padding-bottom':20,
				'verticalAlign': 'middle',
				'height': 60,
				'maxHeight':60
			};
			var noWeatherText = {
				width: 35*weather.duration,
				'backgroundColor': this.mapColor(weather.weatherType),
				//height:50,
				'height':60,
				'verticalAlign': 'middle',
				'maxHeight':60
			}
			var noWeatherTextFirst = {
				width: 35*weather.duration,
				'backgroundColor': this.mapColor(weather.weatherType),
				//height:50,
				'height':60,
				'verticalAlign': 'middle',
				'maxHeight':60,
				// 'borderTopLeftRadius':5,
				// 'borderBottomLeftRadius':5
			}
			if(weather.duration < 2)
			{
				if(index===0)
				{
					hourlyWeatherJsx.push(
						<div className="flexbox-container  hourly_graph_segment first_tab" style={noWeatherText}>
							<Typography></Typography>
						</div>
					);
				}
				else if(index===hourlyWeatherLastIndex)
				{
					hourlyWeatherJsx.push(
						<div className="flexbox-container  hourly_graph_segment last_tab" style={noWeatherText}>
							<Typography></Typography>
						</div>
					);
				}
				else {
					hourlyWeatherJsx.push(
						<div className="flexbox-container hourly_graph_segment" style={noWeatherText}>
							<Typography></Typography>
						</div>
					);
				}
				
			}
			else
			{
				if(index===0)
				{
					hourlyWeatherJsx.push(
						<div className="flexbox-container first_tab hourly_graph_segment" style={gridWidthStyle}>
							<Typography>{weather.weatherType}</Typography>
						</div>
					);
				}
				else if(index===hourlyWeatherLastIndex)
				{
					hourlyWeatherJsx.push(
						<div className="flexbox-container last_tab hourly_graph_segment" style={gridWidthStyle}>
							<Typography>{weather.weatherType}</Typography>
						</div>
					);
				}
				else{
					hourlyWeatherJsx.push(
						<div className="flexbox-container hourly_graph_segment" style={gridWidthStyle}>
							<Typography>{weather.weatherType}</Typography>
						</div>
					);
				}
				
			}
			
		});
		return hourlyWeatherJsx;
  	}
	renderHours(){
		var hours_today = this.props.hours_today;
		var hourlyTemperatures = [];
		var hourlyWeather = [];
		if(hours_today.length>0) 
			hourlyWeather = this.mapWeather(hours_today);
		var today = new Date();
		var currentHours = today.getHours();
		if(this.props.hours_today.length>0)
		{
			hours_today.forEach((hour, index)=>{
				if(index%2 ==0)
				{
					hourlyTemperatures.push(
						<div className = {this.props.classes.graphItem}>
							<Typography className={this.props.classes.hourly_temperature}>{this.convertToAmPm(currentHours+index)}</Typography>
							<Typography className={this.props.classes.hourly_temperature}>{Math.round(hour.temperature)}°</Typography>
						</div>

					);
				}
			});
			
			return (
				<AppBar position="static">
					<Toolbar className={this.props.classes.hourly_container} style={{ background: 'transparent', 'backgroundColor':'#f4f4f4', }}>
						{hourlyWeather}
					</Toolbar>
					<Toolbar className={this.props.classes.hourly_container} style={{ background: 'transparent', 'backgroundColor':'#f4f4f4'}}>
						{hourlyTemperatures}
					</Toolbar>
				</AppBar>		
			)	
		}
				
		else return <h1>not rendered</h1>
	}
	render(){
		const hourlyWeather = this.props.hours_today;
		return (
		  <div>
		 	{this.renderHours()}
		  </div>
		
		)
	} 
}  

export default withStyles(styles)(HourlyWeather);