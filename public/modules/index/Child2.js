import React from "react";
import {ajax} from "tools";
import store from "store";
import { connect } from 'react-redux';
import {Input,Button,Form,Icon} from "antd";
class Child2 extends React.Component{
	constructor(props){
    super(props);
    this.state={};
  }
  click2(){
    ajax({
      type:'get',
      url:'/react/showall',
      success:(data)=>{
          store.dispatch({
            type:'CHILD2_DATA',
            chiild2Data:data
          });
          console.log(this.props.dataState.initData)
      }
    })
  }
  render(){
  	return <div>
  		<h1>Child2</h1>
  		<Button type="primary" onClick={this.click2.bind(this)}>按钮2</Button>
  	</div>
  }
}



const mapStateToProps = function(store){
    return {
        widgetState:store.widgetState,
        datasState:store.datasState,
        dataState:store.dataState
    }
}



export default connect(mapStateToProps)(Form.create()(Child2));