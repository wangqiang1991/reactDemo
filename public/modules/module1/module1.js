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
      number:0
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
  add(){
    this.setState({
      number:this.state.number+1
    })

    store.dispatch({
          type:"Module1_data",
          Number:this.state.number
    });
  }
 minus(){
   this.setState({
      number:this.state.number-1
    })
    store.dispatch({
          type:"Module1_data",
          Number:this.state.number
    });
  }
 
  render(){
  	return <div> 
         <Button  type="ghost" onClick={this.getdata.bind(this)}  >获取数据</Button>
         <h3 className={style.color}>通过ajax获取数据到store上</h3>
         <a href="#index2">跳到模块2</a>
         <Button  type="ghost" onClick={this.add.bind(this)}  >+</Button>
         <span>{this.state.number}</span>
         <Button  type="ghost" onClick={this.minus.bind(this)}  >-</Button>
  	</div>
  }
}




export default Form.create()(Module1);