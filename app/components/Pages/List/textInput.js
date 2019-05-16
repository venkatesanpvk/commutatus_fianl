import React, { Component } from 'react';
import Styles from './styles.scss'

class Input extends Component {

  render() {
    return (
    	<div>
       		<input type="text" name="lname" value={this.props.value} onChange={this.props.onChange}
       		placeholder={this.props.placeholder}/>
       	</div>
    );
  }
}
export default Input;