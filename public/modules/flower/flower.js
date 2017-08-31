import React from "react";
import {ajax} from "tools";
import {Form,  Button , Input , message ,Icon ,Progress} from 'antd';
import style from './flower.css';
const FormItem = Form.Item;
class Flower extends React.Component {
  constructor(props){
	    super(props);
	    this.state={
	    	imgurl: null,
	    	percent:0
	    };
	}
   componentDidMount () {
   		ajax({
   			type:'post',
   			url:'/flower/uploadToken',
   			success:(token)=>{
   				var uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    browse_button: 'uploadflower',     
                    container: 'container', 
				    filters : {                    
					    max_file_size : '100mb',  
					    prevent_duplicates: true,
					    mime_types: [
					        //{title : "flv files", extensions : "flv"}, 
					        //{title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"} 
					          {title : "Image files", extensions : "jpg,gif,png"}
					      ]
				    }, 
                     chunk_size: '4mb',                
		             uptoken:token,
                     domain: "http://or67z7bdd.bkt.clouddn.com", 
                     get_new_uptoken: false,    
                     auto_start: true, 
                     log_level: 5,						
                     multi_selection: false,  
                     init: {
	                    'UploadProgress': function (up, file) {
	                       		console.log('正在上传',file.percent)
	                       		this.setState({
	                       			percent:file.percent
	                       		})	
	                    }.bind(this),
	                    'FileUploaded': function (up, file, info) {
	                       var domain = up.getOption('domain');
	                       var res = JSON.parse(info);
	                       var sourceLink = domain +"/"+ res.key; 
	                        console.log(sourceLink);
	                        this.setState({
	                        	imgurl:sourceLink
	                        })
	                    }.bind(this),
	                    'Error': function (up, err, errTip) {
	                        //上传出错时，处理相关的事情
	                        console.debug(errTip);
	                    }
                    }
                 });		
   			}
   		})
   		
   }
   addflower (){
   		var users =  this.props.form.getFieldsValue(['flowername','flowermean','flowervlaue']);
   		let flowername=users.flowername;
   		let flowermean=users.flowermean;
   		let flowervlaue = users.flowervlaue;
   		let flowerurl = this.state.imgurl;
   		
   		if(flowerurl == null){
   			message.error('请上传一张花汇图片');
   			return false;
   		}
   		if(flowername == '' || flowername == undefined){
   			message.error('请填写花名');
   			return false;
   		}
   		if(flowermean == '' || flowermean == undefined){
   			message.error('请填写花语');
   			return false;
   		}
   		if(flowervlaue == '' || flowervlaue == undefined){
   			message.error('请填写花汇价值');
   			return false;
   		}
   		ajax({
   			type:'post',
   			url:'/flower/addflower',
   			data:{
   				flowername:flowername,
   				flowermean:flowermean,
   				flowervlaue:flowervlaue,
   				flowerurl:flowerurl
   			},
   			success:function(){
   				console.log('增加成功');
   				this.props.form.setFieldsValue({flowername:'',flowermean:'',flowervlaue:''});
   				this.setState({
			    	imgurl: null,
			    	percent:0
			    });
   			}.bind(this)
   		})
   }
render(){
	const { getFieldDecorator } = this.props.form;	
	return <div> 

	      <div id='container' className={style.div1}>
		     <Button id="uploadflower" type="primary"><Icon type="upload" />上传图片</Button>
		     <br/>
			 <Progress className={style.div2}  percent={this.state.percent} status="active" />
			 <br/>	 	
		     <img className={style.div3} src={this.state.imgurl} />
		  </div>	
		
         <Form>  
	        <FormItem>
	          {getFieldDecorator('flowername', {
	            rules: [{ required: true, message: '请输入花名!' }]
	          })(
	            <Input addonBefore="花名"  placeholder="花名"  style={{width:'450px'}}/>
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('flowermean', {
	            rules: [{ required: true, message: '请输入花语!' }]
	          })(
	            <Input addonBefore="花语" placeholder="花语"  style={{width:'450px'}} />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('flowervlaue', {
	            rules: [{ required: true, message: '请输入该花价值!' }]
	          })(
	            <Input addonBefore="价值"  placeholder="鲜花价值"  style={{width:'450px'}} />
	          )}
	        </FormItem>
         </Form>  

          <Button type="primary" style={{width:"100px"}} onClick={this.addflower.bind(this)}>加入花汇库</Button>
	</div>
}

}

export default Form.create()(Flower);