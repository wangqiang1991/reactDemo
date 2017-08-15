import React from "React";
export default React.createClass({
  inputStyle:{
    width: "350px",
    height:"36px",
    border:"1px solid #e8e2e2",
    backgroundColor: "white",
    outline: "none",
    paddingLeft:"35px"
  },
  tdStyle:{
    color: "#333",
    fontFamily: "Microsoft YaHei",
    paddingTop: "12px",
    paddingBottom:"12px",
    position: "relative"
  },
  lbStyle:{
    fontSize: "12px"
  },
  render:function(){
    return <tr>
        <td style={this.tdStyle}><input ref="input" style={this.inputStyle} placeholder={this.props.placeholder} type={this.props.type} />
        <label style={this.lbStyle}></label>
        <i style={this.props.style}></i>
        </td>
      </tr>
  }
});
