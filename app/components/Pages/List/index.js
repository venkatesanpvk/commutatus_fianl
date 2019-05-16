import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card from './card';
import MainLayout from './mainLayout';
import { getTerms,getPostion,getTeams } from '../../../../app/actions/actionMain';
import Styles from './styles.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {id:''};
  }
  componentWillMount(){
    this.props.getTerms().then(res=>{
      console.log(res)
    })
   
  }
  handleTeams=(id)=>{
   
     this.props.getTeams(id).then(res=>{
      console.log(res)
    })
  }
  handlePostion=(id,type)=>{
     if(type === 'TEAM'){
      this.setState({id:id})
    }
    console.log(3)
    this.props.getPostion(id)
  }
  render() {
 
    const { listofTerms,listofTeams,listofPosition } = this.props;
    const {id}=this.state;
    console.log(listofTerms)
    return (
        <div className="container">
          <div className={Styles.pageWrap}>
            <div>
              <h4>Terms</h4>
              <Card data={listofTerms.data} callback={this.handleTeams}/>
            </div>
            <div>
              <h4>Teams</h4>
              <Card data={listofTeams.data} type="TEAM" callback={this.handlePostion}/>
            </div>
            <div>
              <h4>Positions</h4>
              <Card data={listofPosition.data} type="MANAGER" id={id}/>
            </div>
          </div>
        </div>
    );
  }
}
function mapStateToProps(state){
  return{
    listofTerms:state.termsList,
    listofTeams:state.teamsList,
    listofPosition:state.positionList
  }
}
export default connect(mapStateToProps,{getTeams,getTerms,getPostion})(Main);
