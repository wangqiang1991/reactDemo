import React from "react";
import {ajax} from "tools";
import GoodsData from "./GoodsData";
import GoodsAdd from "./GoodsAdd";
import GoodsSearch from "./GoodsSearch";
import {Card,Form,Icon} from "antd";
class GoodsManage extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data:{
      },
      classData:[]
    }
    this.spanStyle={
      marginLeft:"10px",
      borderLeft: "4px solid #2ECC71",
      height: "20px",
      display: "inline-block",
      lineHeight: "20px",
      paddingLeft: "5px"
    }
  }
  componentWillMount(){
    this.showAll();
    this.showClass();
  }
  showAll(curpage,text){
    if(!text){
      text = "";
    }
    console.log("curpage",curpage);
    ajax({
      type:"get",
      url:"/goods/showAll",
      data:{
        curpage:curpage,
        searchText:text
      },
      success:function(data){
        console.log(data);
        this.setState({
          data:data
        });

      }.bind(this)
    });
  }
  showClass(){
    ajax({
      type:"get",
      url:"/goods/showClass",
      success:(data)=>{
        this.setState({
          classData:data
        });
        console.log(this.state.classData);
      }
    });
  }
  render(){
    return <div>
            <h1 style={{lineHeight:"40px",}}>商品管理</h1>
            <div style={{margin:"20px 0 10px"}}>
               <GoodsSearch showAll={this.showAll.bind(this)}></GoodsSearch>
               <GoodsAdd showAll={this.showAll.bind(this)} classData={this.state.classData}></GoodsAdd>
            </div>
            <GoodsData showAll={this.showAll.bind(this)} data={this.state.data} classData={this.state.classData}></GoodsData>
    </div>
  }
}

export default Form.create()(GoodsManage);
