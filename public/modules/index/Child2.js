import React from "react";
import {ajax} from "tools";
import store from "store";
import { connect } from 'react-redux';
import {Input,Button,Form,Icon, message,Upload} from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


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

handleChange (info) {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render(){
     const imageUrl = this.state.imageUrl;


  	return <div>
        <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
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



export default connect(mapStateToProps)(Form.create()(Child2));