import React, { Component } from 'react';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import Button from './button';
import Input from './textInput';
import { deletemember,addteam } from '../../../../app/actions/actionMain';
import Styles from './styles.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add:false,
      name:'',
      parentID:'',
      presonID:''
    };
  }
  handleId(data,type){
    this.props.callback(data.id,type);
  }
  handleDelete=(position)=>{
    const{id}=this.props;
    this.props.deletemember(id,position)
  }
  handleAdd=()=>{
    this.setState({add:true})
  }
  handleChange=(e,name)=>{
    console.log(e)
    this.setState({[name]:[e.target.value]})
  }
  handleSubmit=()=>{
     var formData = new FormData();
    formData.append('access_token', 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c');
    formData.append('position[person_id]',this.state.presonID)
    formData.append('position[parent_id]',this.state.parentID)
     formData.append('position[name]',this.state.name);
     formData.append('team_id',this.props.id);
     this.props.addteam(this.props.id,formData)
    
  }
  render() {
    const { data,type } = this.props;
    const{add}=this.state;
    console.log(data)
    return (
          <React.Fragment>
            {!isEmpty(data)&&data.map((el,i)=>
              <div>
                {type ==='MANAGER' && <p>Vice president</p>}
                  <div className={Styles.card} onClick={type !=='MANAGER' ? this.handleId.bind(this,el,type):null}>
                    <span>{type ==='TEAM' ? el.title :type ==='POSITION'|| type ==='MANAGER' ? el.name : el.short_name}</span>
                    {type ==='MANAGER' &&<div className={Styles.contentWrap}>
                      <Button label='Edit'/>
                      <Button label='Delete' onClick={this.handleDelete.bind(this,el.id)}/>
                    </div>}
                  </div>
                {type ==='MANAGER' &&
                <div>
                  <p>Manager</p>
                  <div className={Styles.card}>
                    {el.person.first_name}
                  </div>
                </div>} 
              </div>
          )}
         
           {type==='MANAGER'&&  <div>
           <Input onChange={(e)=>this.handleChange.bind(this,e,'name')} value={this.state.name}placeholder='name'/>
            <Input onChange={(e)=>this.handleChange.bind(this,e,'parentID')} value={this.state.parentID}placeholder='parentID'/>
            <Input onChange={(e)=>this.handleChange.bind(this,e,'presonID')} value={this.state.presonID}placeholder='presonID'/>
             <Button label='Submit' onClick={this.handleSubmit}/>

           </div>}
          
          </React.Fragment>
    );
  }
}
export default connect(null,{deletemember,addteam})(Card);