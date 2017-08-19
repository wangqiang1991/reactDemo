import React from "react";
import {ajax} from "tools";
import store from "store";
import { connect } from 'react-redux';
import { Form,Button} from "antd";
import style from './module1.css'



class Module1 extends React.Component{
	constructor(props){
    super(props);
    this.state={
      
    };
  }
  getdata(){
    ajax({
      type:"get",
      url:"/users/showall",
      success:(data)=>{
      console.log(data)
       store.dispatch({
          type:"Module1_getdata",
          Module1Data:data
        });

      }
    });
  }
  
  render(){
  	return <div> 
         <Button  type="ghost" onClick={this.getdata.bind(this)}  >获取数据</Button>
         <h3 className={style.color}>通过ajax获取数据到store上</h3>
         <a href="#index2">跳到模块2</a>
  	</div>
  }
}




export default Form.create()(Module1);