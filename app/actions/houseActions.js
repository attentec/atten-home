import * as types from './actionTypes';
import * as APICalls from  '../../APICalls';

export function getHouses(){
  return dispatch => {
    APICalls.get("/houses/", function(response){
        dispatch(housesLoaded(response));
      });
  }
}

function housesLoaded(houses){
  return{
    houses: houses,
    type: types.HOUSES_LOADED
  }
}
