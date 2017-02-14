import * as types from './actionTypes';
import * as APICalls from  '../../APICalls';
export function changePower(id, value, callback) {
  return {
    id : id,
    type: types.CHANGE_POWER,
    value: value,
    callback : callback,
  };
}
export function changeDimmer(id, value, callback) {
  return {
    id : id,
    type: types.CHANGE_DIMMER,
    value: value,
    callback : callback,

  };
}
export function changeTemp(id, value, callback) {
  return {
    id : id,
    type: types.CHANGE_TEMP,
    value: value,
    callback : callback,

  };
}
export function getDevices(){
  return dispatch => {
    APICalls.get("/devices", function(response){
        dispatch(devicesLoaded(response));
    });
  }
}

function devicesLoaded(devices){
  return{
    devices: devices,
    type: types.DEVICES_LOADED
  }
}
