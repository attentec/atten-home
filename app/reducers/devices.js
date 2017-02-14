import * as types from '../actions/actionTypes';
import * as APICalls from '../../APICalls';
const initialState = [];

export default function devices(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_POWER:
      return state.map(device=> {
        if(device._id !== action.id){
            return device;
        }
        let newDevice = {...device,powered:action.value};
        APICalls.updateDevice(newDevice, action.callback);
        return newDevice;
      });
    case types.CHANGE_DIMMER:
    return state.map(device=> {
      if(device._id !== action.id){
          return device;
      }
      let newDevice = {...device,dimmer:action.value};
      APICalls.updateDevice(newDevice, action.callback);
      return newDevice;
    });
    case types.CHANGE_TEMP:
    return state.map(device=> {
      if(device._id !== action.id){
          return device;
      }
      let newDevice = {...device,temp:action.value};
      APICalls.updateDevice(newDevice, action.callback);
      return newDevice;
    });
    case types.DEVICES_LOADED:
      return action.devices;
    default:
      return state;
  }
}
