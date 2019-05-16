import { GET_TERMS } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case GET_TERMS:
      return action.data;
    default:
      return state;
  }
};
