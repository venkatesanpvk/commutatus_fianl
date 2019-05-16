import { GET_POSITION } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case GET_POSITION:
      return action.data;
    default:
      return state;
  }
};
