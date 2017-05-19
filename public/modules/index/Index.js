import React from "react";
import {ajax} from "tools";
import {Input,Button,Form,Icon,BackTop,Spin} from "antd";
import Child1 from 'Child1';
import Child2 from 'Child2';
const InputGroup = Input.Group;
class Index extends React.Component{
	constructor(props){
    super(props);
    this.state={
    	data:{},
    	children:[]
    };
  }
  search(){
  	ajax({
  		type:'get',
  		url:'/react/showall',
  		success:(data)=>{
  			console.log(data[0].child[0].child1)
  			this.setState({
  				data:data,
  				children:data[0].child
  			})
  		}
  	})
  }
  render(){
  	return <div>
  		<h1>hello world</h1>	
  		<Button type="primary" onClick={this.search.bind(this)}>按钮</Button>
  		<Input placeholder="Username" />
  		<Child1 click={this.search.bind(this)} data={this.state.data}></Child1>
  		<Child2 click={this.search.bind(this)} children={this.state.children}></Child2>
   		<Spin style={{marginLeft:'50px',fontSize:'50px',marginTop:'50px'}} />
   		
  	</div>
  }
}

export default Form.create()(Index);