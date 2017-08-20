import React from "react";
import {Form} from 'antd';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={};
	}
render(){
	return <div>
		home 模块
	</div>
}

}

export default Form.create()(Home);