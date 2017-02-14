import * as types from '../actions/actionTypes';

const initialState = [];

export default function rooms(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOMS_LOADED:
      return action.rooms;
    default:
      return state;
  }
}
