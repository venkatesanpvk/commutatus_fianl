import {GET_TERMS,GET_TEAMS,GET_POSITION } from './types';
import { getTermsList,getTeamsList,getpositionData,DeleteTeam,Addteam } from './api';

export function dispatchTerms(data){
  return {
    type:GET_TERMS,
    data:data
  }
}
export function dispatchTeams(data){
  return {
    type:GET_TEAMS,
    data:data
  }
}
export function dispatchPostion(data){
  return {
    type:GET_POSITION,
    data:data
  }
}
export function getTerms(){
  return getTermsList(dispatchTerms)
}
export function getTeams(id){
  return getTeamsList(dispatchTeams,id)
}

export function getPostion(id){
  return getpositionData(dispatchPostion,id)
}

export function deletemember(teamid,id){
  console.log(teamid,id)
  return DeleteTeam(teamid,id)
}

export function addteam(id,data){
  console.log(id)
  // console.log(teamid,id)
  return Addteam(id,data)
}