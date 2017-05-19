import {Modal} from "antd";
var ajax = function(params){
    var paramStr = "";
    var fetchObj;
    for(var key in params.data){
        paramStr += key + "=" + params.data[key] + "&";
    }
    if(params.type != "post" && params.type != "POST"){
        params.url += "?" + paramStr;
        fetchObj = fetch(params.url,{credentials:'include'});
    }else{
        fetchObj = fetch(params.url,{
            method:"post",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body:paramStr,
            credentials:'include'
        });
    }
    fetchObj.then(function(res){
        if(res.ok){
            res.text().then(function(data){
                try{
                    params.success(JSON.parse(data));
                }catch(e){
                    params.success(data);
                }

            });
        }
    });
};
var success = function(title,content,callback){
    Modal.success({
      title: title,
      content:content,
      onOk:callback
    });
}

var error = function(title,content,callback){
  Modal.error({
    title: title,
    content:content,
    onOk:callback
  });
}
export {ajax,success,error};
