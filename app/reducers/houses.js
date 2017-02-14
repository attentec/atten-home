import * as types from '../actions/actionTypes';

const initialState = [];

export default function houses(state = initialState, action = {}) {
  switch (action.type) {
    case types.HOUSES_LOADED:
      return action.houses;
    default:
      return state;
  }
}
