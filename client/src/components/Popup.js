import React, { Component } from "react";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.componentContent = React.createRef();
  }
  getRef() {
    return this.componentContent;
  }
  render() {
    return (
      <div id="popup" className="ol-popup" ref={this.componentContent}>
        <div id="popup-closer" className="ol-popup-closer" />
        <div id="popup-content">{this.props.name}</div>
      </div>
    );
  }
}

export default Popup;
