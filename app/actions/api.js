import 'whatwg-fetch';

const access_token = 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';

// export function getOpertunities(dispatchMethod) {
//   return dispatch =>
//     fetch(
//       `http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities?access_token=${access_token}`,
//       {
//         method: 'GET',
//       }
//     )
//       .then(res => res.json())
//       .then(res => dispatch(dispatchMethod(res)));
// }

export function getTermsList(dispatchMethod){
	return dispatch =>
    fetch(`http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/committees/1585/terms?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c
`,{
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(res => dispatch(dispatchMethod(res)));

}
export function getTeamsList(dispatchMethod,id){
	return dispatch =>
    fetch(`http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/committees/1585/terms/${id}/teams?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c
`,{
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(res => dispatch(dispatchMethod(res)));

}

export function getpositionData(dispatchMethod,id){
	return dispatch =>
    fetch(`http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/teams/${id}/positions?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c

`,{
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(res => dispatch(dispatchMethod(res)));

}

export function DeleteTeam(teamid,id){
	return dispatch =>
    fetch(`http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/teams/${teamid}/positions/${id}?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c

`,{
        method: 'DELETE',
      }
    ).then(res=>{
    	return true;
    })

}
export function Addteam(id,data){
	return dispatch =>
    fetch(`http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/teams/${teamid}/positions/?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c

`,{
        method: 'POST',
        body:data
      }
    ).then(res =>res.json())
    .then(res =>{
    	console.log(res)
    })


}