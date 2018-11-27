import React, { Component } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "./App.css";

import Overlay from "ol/Overlay.js";
import Popup from "./components/Popup";

class App extends Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
  }
  state = {};
  componentDidMount() {
    const that = this;

    const refPopup = this.popup.current.getRef();

    // костыль потому что элемент удаляется и нельзя вызвать онклик реакта
    const CloseComponent = refPopup.current.querySelector("#popup-closer");
    CloseComponent.onclick = this.handeClose;

    this.overlay = new Overlay({
      element: refPopup.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: "./geo.json"
          })
        })
      ],
      overlays: [this.overlay],
      view: new View({
        center: fromLonLat([36.26404400000001, 54.520713]),
        zoom: 13
      })
    });

    this.map.on("singleclick", function(evt) {
      that.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        that.overlay.setPosition(evt.coordinate);
        that.setState({ featureInfo: { name: feature.get("name") } });
      });
    });
  }
  handeClose = () => {
    this.overlay.setPosition(undefined);
    this.setState({ featureInfo: false });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div id="map" />
        <Popup
          ref={this.popup}
          name={this.state.featureInfo && this.state.featureInfo.name}
          close={this.handeClose}
        />
      </div>
    );
  }
}

export default App;
