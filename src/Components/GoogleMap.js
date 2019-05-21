import React, { Component } from 'react';

import { Map, GoogleApiWrapper } from 'google-maps-react';

import google_key from './google_key.js';

export class GoogleMap extends Component {
	componentDidMount(){

	}
	render(){
		const mapStyles = {
		  width: '100%',
		  height: '100%'
		};
		const latLng = {
        	lat: this.props.latitude,
        	lng: this.props.longitude
        };
		return (
		  <div className = "mapContainer">
		     <Map
		        google={this.props.google}
		        zoom={14}
		        style={mapStyles}
		        center={latLng}
		      />
		  </div>
		)
	} 
}  

export default GoogleApiWrapper({
  apiKey: google_key
})(GoogleMap);