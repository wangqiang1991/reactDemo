import React from "react";
import {Form ,Input ,Carousel,message ,Modal} from 'antd';
import {ajax} from "tools";
import style from './home.css';
const Search = Input.Search;

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
    	flowerdata:[{'flowerurl':null},{'flowerurl':null},{'flowerurl':null},{'flowerurl':null}]
    	};
	}
   componentWillMount(){
		ajax({
			type:'get',
			url:'/flower/showall4picture',
			success:(data)=>{
				if(data.length>4){
				  var randomdata = []; 
				  var random=new Set();
				  while(random.size<4){
				      random.add(parseInt(Math.random()*data.length) );
				  }
				  var k = 0;
				 for(var i of random){
				 	randomdata[k] = data[i];
				 	k++;
				 }
				  this.setState({
					flowerdata:randomdata
				  })
				  console.log(this.state.flowerdata)
			    }
			}
		})
		ajax({
			type:'get',
			url:'/api/users/showall',
			success:(data) => {
				console.log(data);
			}
		})
	}
render(){
	var module;

	return <div className={style.div1}>
		<Carousel autoplay className={style.div2}>
		    <div><h3><img  src={this.state.flowerdata[0].flowerurl} /><p>{this.state.flowerdata[0].flowername}</p><p>{this.state.flowerdata[0].flowermean}</p></h3></div>
		    <div><h3><img  src={this.state.flowerdata[1].flowerurl} /><p>{this.state.flowerdata[1].flowername}</p><p>{this.state.flowerdata[1].flowermean}</p></h3></div>
		    <div><h3><img  src={this.state.flowerdata[2].flowerurl} /><p>{this.state.flowerdata[2].flowername}</p><p>{this.state.flowerdata[2].flowermean}</p></h3></div>
		    <div><h3><img  src={this.state.flowerdata[3].flowerurl} /><p>{this.state.flowerdata[3].flowername}</p><p>{this.state.flowerdata[3].flowermean}</p></h3></div>
		</Carousel>
	</div>
}

}

export default Form.create()(Home);