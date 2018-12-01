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
import SearchLine from "./components/SearchLine";

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
        // scale: 0.05,
        src: "marker.svg"
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

    this.vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: "/geo.json"
    });

    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: that.vectorSource,
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
        that.openModal(feature);
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
  findFeatureByName = name => {
    const features = this.vectorSource.getFeatures();
    return features.find(feature => {
      return feature.get("organizationFullNameAndLocation") === name;
    });
  };
  openModal = feature => {
    this.setState({
      featureInfo: {
        name: feature.get("organizationFullNameAndLocation"),
        adres: feature.get("ulAddressLocation"),
        workingSchedule: feature.get("workingSchedule"),
        stateAccreditationEndDate: feature.get("stateAccreditationEndDate"),
        stateAccreditationCertificateRequisites: feature.get(
          "stateAccreditationCertificateRequisites"
        ),
        stateAccreditationStartDate: feature.get("stateAccreditationStartDate")
      },
      feature
    });
  };
  handeClose = () => {
    // this.overlay.setPosition(undefined);
    this.setState({ featureInfo: false });
  };
  zoomToFeature = feature => () => {
    var extent = feature.getGeometry().getExtent();
    this.map.getView().fit(extent, { maxZoom: 18, duration: 600 });
  };
  render() {
    return (
      <div className="App">
        <header className="header">
          <SearchLine
            findFeatureByName={this.findFeatureByName}
            openModal={this.openModal}
          />
        </header>
        <div
          id="map"
          style={{ cursor: this.state.cursor ? "pointer" : "default" }}
        />
        <Modal
          onClose={this.handeClose}
          zoom={this.zoomToFeature(this.state.feature)}
          feature={this.state.featureInfo}
          zoomToFeature={this.zoomToFeature}
        />
      </div>
    );
  }
}

export default App;
