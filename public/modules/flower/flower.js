import React from "react";
import {Form} from 'antd';

class Flower extends React.Component {
  constructor(props){
    super(props);
    this.state={};
	}
render(){
	return <div>
		Flower 模块
	</div>
}

}

export default Form.create()(Flower);