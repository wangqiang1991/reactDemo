import React from "react";
import store from "store";
import { connect } from 'react-redux';
import { Form,Button,Table} from "antd";
import style from './module2.css'



class Module2 extends React.Component{
	constructor(props){
    super(props);
    this.state={
      
    };
  }
  show(){
    console.log(this.props.datasState);

  }
  render(){
  	return <div> 
         <Button  type="ghost" onClick={this.show.bind(this)}  >展示数据</Button>
         <h3 className={style.color}>通过store获取数据展示出来</h3>
         <a href="#index1">跳到模块1</a>
  	</div>
  }
}

const mapStateToProps = function(store){
    return {
        datasState:store.datasState
    }
}


export default connect(mapStateToProps)(Form.create()(Module2));