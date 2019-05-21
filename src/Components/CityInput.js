import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input, 
  Button,
} from '@material-ui/core';
import MaterialUIForm from 'react-material-ui-form'
import { withStyles } from '@material-ui/core/styles';

const styles = {
	input_field: {
		width: 300,
		// 'backgroundColor': '#aaa',
	},
}
class CityInput extends Component {
	componentDidMount(){
		// if(this.state.count ==0)
			this.props.submitCity();
		// this.setState({count: this.state.count + 1});
		// console.log('state count' + this.state.count);
	}
	handleUpdateCity(e){
		this.props.updateCity(e.target.value);
	}
	handleSubmit(e){
		//e.preventDefault();
		console.log('handling submit');
		this.props.submitCity();
	}
	render(){
		return (
		  <div class="input_container">
		    <MaterialUIForm fullwidth onSubmit={(e)=>this.handleSubmit(e)}>
		   		<FormControl className = {this.props.classes.form_area}>
		            <InputLabel htmlFor="city">City</InputLabel>
		            <Input className = {this.props.classes.input_field} id="city" type="text" value={this.props.city} onChange={(e)=>this.handleUpdateCity(e)}></Input>
		            <Button type="submit">Submit</Button>
        		</FormControl>
          	</MaterialUIForm>
		  </div>
		)
	} 
}  

export default withStyles(styles)(CityInput);