import React from "react";
import {ajax} from "tools";
import {Card,Form,Icon,Radio,Input,Button} from "antd";
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
class GoodsSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:""
    }
  }
  search(){
    ajax({
      type:"get",
      url:"/goods/showAll",
      data:{
        searchText:this.state.value
      },
      success:(data)=>{
        this.props.showAll(data.curpage,this.state.value);
      }
    });
  }
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  render(){
    return <div className="ant-search-input-wrapper" style={{float: "right"}}>
        <InputGroup >
          <Input placeholder="搜索" value={this.state.value} onChange={this.handleInputChange.bind(this)} onPressEnter={this.search}/>
          <div className="ant-input-group-wrap">
            <Button icon="search" onClick={this.search.bind(this)} style={{borderRadius: "0 5px 5px 0"}}/>
          </div>
        </InputGroup>
      </div>
  }
}

export default Form.create()(GoodsSearch);
