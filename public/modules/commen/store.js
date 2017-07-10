/*jshint esversion:6*/
import {createStore,combineReducers} from "redux";

var initialWidget = {
  visible:false,
  addVisible:false,
  addVisible2:false
};


const widgetReducer = function(state = initialWidget,action){
  if(action.type == "SHOW_HOT_INFO"){
    var newState = Object.assign({},state,{visible:action.visible});
    return newState;
  }
  if(action.type == "SHOW_HOTADD_INFO"){
    var newState = Object.assign({},state,{addVisible:action.addVisible});
    return newState;
  }
  if(action.type == "SHOW_HOTADD2_INFO"){
    var newState = Object.assign({},state,{addVisible2:action.addVisible2});
    return newState;
  }
  return state;
};

var initialDatas = {
  hotData:[]
};

const datasReducer = function(state = initialDatas,action){
  if(action.type == "HOT_INFO"){
    var newState = Object.assign({},state,{hotData:action.hotData});
    return newState;
  }
  return state;
};

const reducers = combineReducers({
    widgetState:widgetReducer,
    datasState:datasReducer
});

export default createStore(reducers);
