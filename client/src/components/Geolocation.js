import React, { Component } from "react";
import styled from "styled-components";
import GeolocationOl from "ol/Geolocation";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";

class Geolocation extends Component {
  state = {
    status: false,
    isZoom: false
  };
  changeStatus = () => {
    const that = this;
    if (!this.state.status) {
      if (navigator.geolocation) {
        this.props.geoLayer.setVisible(true);

        if (!that.geolocation) {
          that.geolocation = new GeolocationOl({
            projection: that.props.map.getView().getProjection()
          });
          that.geolocation.setTracking(true);
          that.geolocation.on("change:accuracyGeometry", function() {
            that.props.accuracyFeature.setGeometry(
              that.geolocation.getAccuracyGeometry()
            );
          });
          that.geolocation.on("change:position", function() {
            var coordinates = that.geolocation.getPosition();
            that.props.positionFeature.setGeometry(
              coordinates ? new Point(coordinates) : null
            );

            if (!that.state.isZoom) {
              var extent = that.props.positionFeature.getGeometry().getExtent();
              that.props.map
                .getView()
                .fit(extent, { maxZoom: 16, duration: 600 });
              that.setState({ isZoom: true, status: true });
            }
          });
          this.setState({
            status: true,
            isZoom: false
          });
        } else {
          if (!that.state.isZoom) {
            var extent = that.props.positionFeature.getGeometry().getExtent();
            that.props.map
              .getView()
              .fit(extent, { maxZoom: 16, duration: 600 });
            that.setState({ isZoom: true, status: true });
          }
        }
      }
    } else {
      this.props.geoLayer.setVisible(false);
      this.setState({
        status: false,
        isZoom: false
      });
    }
  };
  render() {
    return (
      <ContainerGeolocation onClick={this.changeStatus}>
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_dd)">
            <rect x="20" y="17" width="64" height="64" rx="4" fill="white" />
          </g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M41 49C41 42.9249 45.9249 38 52 38C58.0751 38 63 42.9249 63 49C63 55.0751 58.0751 60 52 60C45.9249 60 41 55.0751 41 49ZM53 57.9451V55C53 54.4477 52.5523 54 52 54C51.4477 54 51 54.4477 51 55V57.9451C46.8284 57.4839 43.5161 54.1716 43.0549 50H46C46.5523 50 47 49.5523 47 49C47 48.4477 46.5523 48 46 48H43.0549C43.5161 43.8284 46.8284 40.5161 51 40.0549V43C51 43.5523 51.4477 44 52 44C52.5523 44 53 43.5523 53 43V40.0549C57.1716 40.5161 60.4839 43.8284 60.9451 48H58C57.4477 48 57 48.4477 57 49C57 49.5523 57.4477 50 58 50H60.9451C60.4839 54.1716 57.1716 57.4839 53 57.9451Z"
            fill={this.state.status ? "#121ADA" : "gray"}
          />
          <defs>
            <filter
              id="filter0_dd"
              x="0"
              y="0"
              width="104"
              height="104"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="3" />
              <feGaussianBlur stdDeviation="10" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow"
                result="effect2_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </ContainerGeolocation>
    );
  }
}

const ContainerGeolocation = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 6px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export default Geolocation;
