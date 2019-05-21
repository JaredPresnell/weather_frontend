import React, { Component } from 'react';
import {
  Typography,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Skycons from 'skycons';

import ReactAnimatedWeather from 'react-animated-weather';


const styles = {
	graph_container: {
		// 'display': 'flex',
	  	// 'justify-content': 'center',
	 //  	// width: '100%',
	 	width: 1000,
	 	margin: 'auto',
	  	'text-align': 'center',
	 //  	height: 1000,
	 //  	width: 600,
	 //  	'margin': 'auto'
	  },
	  week_summary: {
	  	'marginTop' : 20 
	  }
}
class DailyWeather extends Component {	
	mapWeatherIcon(icon){
		switch(icon){
			case 'rain':
				return 'RAIN';
			case 'partly-cloudy-day':
				return 'PARTLY_CLOUDY_DAY';
			case 'wind':
				return 'WIND';
			case 'clear-day':
				return 'CLEAR_DAY';
			case 'partly-cloudy-night':
				return 'CLEAR_DAY';
			case "cloudy":
				return 'CLOUDY';
			case 'fog':
				return 'FOG';
			case 'snow':
				return 'SNOW';
			case 'sleet':
				return 'SLEET';
			default:
				return 'CLEAR_DAY';
		}

	}
	createGraph(daily){
		if(daily.hasOwnProperty('data'))
		{
			var days = daily.data;
			var dailyTemperatures = [];
			var maxTempDif = 0;
			var lowestTemp = 9999;
			var highestTemp = 0;
			var dailyTemperaturesJsx = [];

			days.forEach((day)=>{
				let tempDif = Math.round(day.temperatureHigh) - Math.round(day.temperatureLow);
				dailyTemperatures.push({high: Math.round(day.temperatureHigh), low: Math.round(day.temperatureLow), summary: day.summary, tempDif: tempDif, icon: day.icon});	
				maxTempDif = (tempDif > maxTempDif ? tempDif : maxTempDif);
				lowestTemp = (Math.round(day.temperatureLow) < lowestTemp ? Math.round(day.temperatureLow) : lowestTemp);
				highestTemp = (Math.round(day.temperatureHigh) > highestTemp ?  Math.round(day.temperatureHigh) : highestTemp);
			});

			dailyTemperatures.forEach((dayTemp, index)=>{
				//overall width is 600
				// console.log('day temp');
				// console.log(dayTemp);
				var pxPerDegree = 600 / maxTempDif;
				var width = dayTemp.tempDif * pxPerDegree;
				var dailyGraph = {
					'width': width,	
					'backgroundColor': '#333',
					'borderRadius': 20,
					'height': 30,
					// 'display': 'flex',
					// 'flexDirection': 'column',
				}
				var dailyGraphContainer = {
					'display': 'flex',
					'flexDirection': 'row',
					'justifyContent': 'center',
					'marginRight': 10,
					'marginLeft': 10
				}
				var tempLeft = {
					'marginRight': 10,
					'marginLeft': (dayTemp.low - lowestTemp) * pxPerDegree,
					
				}
				var tempRight = {
					'marginLeft': 10,
					'marginRight': (highestTemp - dayTemp.high) * pxPerDegree,
				}
				var dayOfWeek = {
					'width': 40,
					'textAlign':'left',
					'marginLeft': 8,
				}
				var daySummary = {
					'marginTop': 10,
					'marginBottom': 4
				}
				const iconSettings = {
				  icon: 'CLEAR_DAY',
				  color: '#333',
				  size: 26,
				  animate: true
				};
				function mapDayIndex(dayNum){
					switch(dayNum%7){
						case 1:
							return "Mon";
						case 2:
							return "Tue";
						case 3:
							return "Wed";
						case 4:
							return "Thu";
						case 5:
							return "Fri";
						case 6: 
							return "Sat";
						case 0:
							return "Sun";
						default:
							return "ERROR";
					}
				}
				var date = new Date();
				var today = date.getDay();
				dailyTemperaturesJsx.push(
					<div className = "dailyContainer">
						<Typography style={daySummary} className="dailySummary">{dayTemp.summary}</Typography>
						<div style={dailyGraphContainer}>
							<ReactAnimatedWeather
							   	icon={this.mapWeatherIcon(dayTemp.icon)}
							    color={iconSettings.color}
							    size={iconSettings.size}
							    animate={iconSettings.animate}
							  />
							<Typography style={dayOfWeek}><strong>{mapDayIndex(today+index)}</strong></Typography>
							<Typography style={tempLeft}>{dayTemp.low}°</Typography>
							<div style={dailyGraph}>
							</div>
							<Typography style={tempRight}>{dayTemp.high}°</Typography>
						</div>
					</div>
				);
			});
			return dailyTemperaturesJsx;
		}
		
	}
	render(){
		return (
		  <div>
		  
		    <Typography variant="h6" className={this.props.classes.week_summary}>{this.props.daily.summary}</Typography>
			<div className={this.props.classes.graph_container}>
				{this.createGraph(this.props.daily)}
			</div>
		    {console.log(this.props.daily)}
		  </div>
		)
	} 
}  


export default withStyles(styles)(DailyWeather);