
import React from "react";
import ReactDOM from "react-dom";
import {Route,Router,IndexRoute,hashHistory} from "react-router";
import {Provider} from "react-redux";
//import store from "store";

var Test = React.createClass({
    render: function(){
        return (
            <div>
           	<p>hello word</p>
          </div>	
        )
    },
});


ReactDOM.render(
<Test />,
 document.getElementById("app"))