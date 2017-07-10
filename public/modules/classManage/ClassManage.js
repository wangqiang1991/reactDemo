/*jshint esversion:6*/
import React from "React";
import { Card,Tabs } from 'antd';
import ClassInfo from "./ClassInfo";
export default class ClassManage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const TabPane = Tabs.TabPane;
    var newAry = [];
    for(let i=1;i<=10;i++){
      newAry.push('<TabPane tab="'+i+'" key="'+i+'"><ClassInfo></ClassInfo></TabPane>');
    }
    return <div style={{width:"100%"}}>
    <Card title={<span><span className="spanStyle">类别管理</span></span>} bordered={false} style={{ width: "100%",height:"100%" }}>
    <ClassInfo/>
    </Card>
    </div>

  }
}
