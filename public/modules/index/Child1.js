import React from "react";
import {ajax} from "tools";
import store from "store";
import { connect } from 'react-redux';
import {Input,Button,Form,Icon} from "antd";
class Child1 extends React.Component{
	constructor(props){
    super(props);
    this.state={};
    this.spanStyle={
      fontSize:'25px',
      color:'red'
    }
  }
  click1(){
    console.log(this.props.dataState)
  }
  render(){
  	return <div>
  		<h1>Child1</h1>
  		<Button type="primary" onClick={this.click1.bind(this)} style={this.spanStyle}>按钮1</Button>
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

export default connect(mapStateToProps)(Form.create()(Child1));