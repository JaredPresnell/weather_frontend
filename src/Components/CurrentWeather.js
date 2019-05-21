import React, { Component } from 'react';
import {
  Typography,
  Toolbar,
  FormControl,
  InputLabel,
  Input, 
  Button,
  TextField,
  Form,
  AppBar
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import spacing from '@material-ui/system';
import MaterialUIForm from 'react-material-ui-form';
import { withStyles } from '@material-ui/core/styles';

import ReactAnimatedWeather from 'react-animated-weather';

const styles = {
  bar_item: {
    'padding-right':8,
    'padding-left': 8,
    'border-right': '1px solid rgb(127, 130, 135, 0.2);',
  },
  bar_item_last: {
  	'padding-right':8,
  	'padding-left': 8
  },
  toolbar_container: {
  	'justify-content': 'center',
  }
};
class CurrentWeather extends Component {
	mapWeatherIcon(currentWeather){
		if(currentWeather.hasOwnProperty('icon'))
		{
			var icon = currentWeather.icon;
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
	}

	render(){
		const iconSettings = {
			color: '#333',
			size: 45,
			animate: true
		};
		return (
	  		<div>
		  		<AppBar position="static">
				  	<Toolbar  className = {this.props.classes.toolbar_container}
				  	style = {{
				  		'backgroundColor': '#f4f4f4',
				  		'height': '20px'
				  	}}>
				  		<Typography className={this.props.classes.bar_item}>Wind: {this.props.current.windSpeed} mph</Typography>
					   	<Typography className={this.props.classes.bar_item}>Humidity: {this.props.current.humidity*100}%</Typography>
					   	<Typography className={this.props.classes.bar_item}>Dew Pt.: {this.props.current.dewPoint}˚</Typography>
					   	<Typography className={this.props.classes.bar_item}>UV Index: {this.props.current.uvIndex}</Typography>
					   	<Typography className={this.props.classes.bar_item}>Visibility: {this.props.current.visibility} mi</Typography>
					   	<Typography className={this.props.classes.bar_item_last}>Pressure: {this.props.current.pressure} mb</Typography>
				  	</Toolbar>
			  	</AppBar>	
		  		<div className = "today_info">
				    <Typography variant="h4">
				    <ReactAnimatedWeather
							   	icon={this.mapWeatherIcon(this.props.current)}
							    color={iconSettings.color}
							    size={iconSettings.size}
							    animate={iconSettings.animate}
							  />
					  <strong>{Math.round(this.props.current.temperature)}°</strong> {this.props.current.summary}</Typography>
				    <Typography><strong>Feels like:</strong> {Math.round(this.props.current.apparentTemperature)}°</Typography>
					<Typography><strong>Low:</strong> {Math.round(this.props.today.temperatureLow)}°  <strong>High:</strong> {Math.round(this.props.today.temperatureHigh)}°</Typography>
					<Typography>{this.props.today.summary}</Typography>
				</div>
		  	</div>
		)
	} 
}  


export default withStyles(styles)(CurrentWeather);