import React, { Component } from 'react';
import Styles from './styles.scss'

class Button extends Component {

  render() {
    return (
        <span onClick={this.props.onClick} className={Styles.button}>
          {this.props.label}
        </span>
    );
  }
}
export default Button;