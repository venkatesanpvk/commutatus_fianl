// Empty placeholder to reserve reducer namespace.
// Otherwise redux may complain when we asyncrhonously
// inject reducers.

/**
 * Routing to be implemented
 */
import { combineReducers } from 'redux';

import termsList from 'reducers/getTerms';
import teamsList from 'reducers/getTeams';
import positionList from 'reducers/getPosition';

const allReducers = {
  termsList,
  teamsList,
  positionList
};

const appReducer = combineReducers(allReducers);

export default appReducer;
