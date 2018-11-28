import React, { Component } from "react";
// using es modules
import device from "current-device";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "./App.css";

// import Overlay from "ol/Overlay.js";
// import Popup from "./components/Popup";
import Modal from "./components/Modal";

import { Icon, Fill, Stroke, Style, Text } from "ol/style.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
  }
  state = {
    cursor: false
  };
  componentDidMount() {
    const that = this;

    // const refPopup = this.popup.current.getRef();

    // костыль потому что элемент удаляется и нельзя вызвать онклик реакта
    // const CloseComponent = refPopup.current.querySelector("#popup-closer");
    // CloseComponent.onclick = this.handeClose;

    // this.overlay = new Overlay({
    //   element: refPopup.current,
    //   autoPan: true,
    //   autoPanAnimation: {
    //     duration: 250
    //   }
    // });

    var style = new Style({
      image: new Icon({
        scale: 0.05,
        src: "point.png"
      }),
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.6)"
      }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1
      }),
      text: new Text()
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
            url: "/geo.json"
          }),
          style: function(feature) {
            // style.getText().setText(feature.get("name"));
            return style;
          }
        })
      ],
      // overlays: [this.overlay],
      view: new View({
        center: fromLonLat([36.26404400000001, 54.520713]),
        zoom: 13
      })
    });

    this.map.on("singleclick", function(evt) {
      that.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        // that.overlay.setPosition(evt.coordinate);
        that.setState({ featureInfo: { name: feature.get("name") } });
      });
    });
    this.map.on("pointermove", function(evt) {
      that.setState({ cursor: false });

      that.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        if (!that.state.cursor) {
          that.setState({ cursor: true, feature });
        }
      });
    });
  }
  handeClose = () => {
    // this.overlay.setPosition(undefined);
    this.setState({ featureInfo: false });
  };
  zoomToFeature = feature => () => {
    console.log(feature);
    var extent = feature.getGeometry().getExtent();
    this.map.getView().fit(extent, { maxZoom: 18, duration: 600 });
  };
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="search-container">
            <div className="search">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ваш текст"
                  aria-label="Ваш текст"
                />
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon1"
                  >
                    Поиск
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          id="map"
          style={{ cursor: this.state.cursor ? "pointer" : "default" }}
        />
        <Modal
          onClose={this.handeClose}
          zoom={this.zoomToFeature(this.state.feature)}
          open={this.state.featureInfo}
        />
      </div>
    );
  }
}

export default App;
