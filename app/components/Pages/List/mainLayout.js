import React, { Component } from 'react';
import {isEmpty} from 'lodash';
import Card from './card';
import Styles from './styles.scss'

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    const{listofPosition} =this.props;
    console.log(listofPosition)
  }
  handleId(data){
    console.log(1)
    this.props.callback(data.id);
  }
  render() {
    const { data,type } = this.props;
    console.log(data)
     const arr = [{short_name:'fgfgfg'}]
    return (
          <React.Fragment>
            <div className={Styles.cardLine}>
              <Card data={arr} />
            </div>
            <div className={Styles.subCardVcp}>
              <Card data={arr} />
            </div>
          </React.Fragment>
    );
  }
}
export default MainLayout;