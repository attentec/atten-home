import * as types from './actionTypes';
import * as APICalls from  '../../APICalls';

export function getRooms(){
  return dispatch => {
    APICalls.get("/rooms", function(response){
        dispatch(roomsLoaded(response));
      });
  }
}

function roomsLoaded(rooms){
  return{
    rooms: rooms,
    type: types.ROOMS_LOADED
  }
}
