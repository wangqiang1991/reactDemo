import React from "react";
import {ajax} from "tools";
import store from "store";
import { connect } from 'react-redux';
import {Form, Upload, message, Icon, Button} from "antd";




class User extends React.Component{
	constructor(props){
    super(props);
    this.state={
      
    };
    this.spanStyle={
      color:'red'
    }
  }
  onChange (info) {
    console.log(info)
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }


  render(){
    const props = {
        name: 'file',
        action: '/content/upload',
        headers: {
          authorization: 'authorization-text'
        }
      }
  	return <div> 
         <Upload {...props}>
          <Button>
            <Icon type="upload" /> 点击上传图片
          </Button>
        </Upload>
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

export default connect(mapStateToProps)(Form.create()(User));