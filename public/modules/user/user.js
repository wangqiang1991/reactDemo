import React from "react";
import {Form} from 'antd';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state={};
	}
render(){
	return <div>
		User 模块
	</div>
}

}

export default Form.create()(User);