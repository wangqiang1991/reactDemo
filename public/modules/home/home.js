import React from "react";
import {Form ,Input ,Carousel,message ,Modal} from 'antd';
import {ajax} from "tools";
import style from './home.css';
const Search = Input.Search;

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	flowerdata:[],
    	searchdata:[],
    	visible:false
    	};
	}
  showModal  ()  {
    this.setState({
      visible: true,
    });
    console.log(this.state.searchdata[0].flowername)
  }
  handleCancel (e) {
    this.setState({
      visible: false,
    });
  }
  handleOk  (e)  { 
  	this.setState({
      visible: false,
    });
  }
	componentWillMount(){
		ajax({
			type:'get',
			url:'/flower/showall4picture',
			success:(data)=>{
				if(data.length>4){
			        var newdata = [];
			        var number = 0;
			        while(1){
			         number = Math.random() * data.length;
			        if(Math.ceil(number) <= data.length-4){
			            break ;
			        }
			      }
			      for(var i =0 ; i < 4;i++){
			          newdata[i] = data[Math.ceil(number)+i];
			      }
			      console.log(newdata)
     			this.setState({
     				flowerdata:newdata
     			})
     			console.log(this.state.flowerdata[1].flowerurl)
			    }else{
			    	this.setState({
     					flowerdata:data
     				})	
				}}
		})
	}
	searchflower(value){
		if(value == ''){
			message.error('请输入查找的花名');
			return false;
		}
		
		ajax({
			type:'get',
			url:'/flower/findsomeflower',
			data:{
				flowername:value
			},
			success:(data)=>{
				if(data.length==0){
					message.error('对不起没有搜索到该花汇');
				}else{
					this.setState({
     					searchdata:data
     				})
     				this.showModal();	
				}
			}
		})
	}
render(){
	var module;

	return <div className={style.div1}>
		<div><Search placeholder="输入需要查找的花名" style={{ width: 200 }} onSearch={this.searchflower.bind(this)}/></div>
		<Carousel autoplay className={style.div2}>
		    <div><h3><img  src="http://or67z7bdd.bkt.clouddn.com/1ad5ad6eddc451da649cd036bcfd5266d1163281.jpg" /><p>坚强、永恒的爱、一生的守候</p></h3></div>
		    <div><h3><img  src="http://or67z7bdd.bkt.clouddn.com/500fd9f9d72a6059ff6ab8ef2234349b023bbac9.jpg" /><p>坚强、永恒的爱、一生的守候</p></h3></div>
		    <div><h3><img  src="http://or67z7bdd.bkt.clouddn.com/1ad5ad6eddc451da488c3c06bcfd5266d11632e0.jpg" /><p>坚强、永恒的爱、一生的守候</p></h3></div>
		    <div><h3><img  src="http://or67z7bdd.bkt.clouddn.com/80cb39dbb6fd526618fc19b6af18972bd50736b8.jpg" /><p>坚强、永恒的爱、一生的守候</p></h3></div>
		</Carousel>
		<Modal
          title="搜索结果"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>this.state.searchdata[0].flowername</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
	</div>
}

}

export default Form.create()(Home);