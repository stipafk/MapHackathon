import React from "react";
import { GEO_ARRAY } from "../constants/geoarray";
import uuid from "uuid/v4";

import styled from "styled-components";

class SearchLine extends React.Component {
  state = {
    open: false,
    value: "",
    filtered: []
  };
  search = evt => {
    const value = evt.target.value;
    if (!value) {
      this.setState({ value: "", filtered: [] });
      return;
    }
    const filtered = GEO_ARRAY.filter(feature => {
      return (
        feature.properties.ulAddressLocation
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        feature.properties.accreditationBodyName
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    });
    this.setState({ open: true, filtered, value });
  };
  selectItem = feature => () => {
    const olFeature = this.props.findFeatureByName(
      feature.properties.organizationFullNameAndLocation
    );
    if (olFeature) {
      this.props.openModal(olFeature);
    }
  };
  openSearch = () => {
    this.setState({ open: true });
  };
  closeSearch = () => {
    const that = this;
    setTimeout(function() {
      that.setState({ open: false });
    }, 1000);
  };
  renderListitem = data => {
    var that = this;
    return data.map(feature => {
      return (
        <StyledListItem key={uuid()} onClick={that.selectItem(feature)}>
          {feature.properties.ulAddressLocation}
        </StyledListItem>
      );
    });
  };

  render() {
    return (
      <div className="search-container">
        <div className="search">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ваш текст"
              aria-label="Ваш текст"
              value={this.state.value}
              onChange={this.search}
              onFocus={this.openSearch}
              onBlur={this.closeSearch}
            />
          </div>
          <SearchList open={this.state.open}>
            {this.state.filtered.length ? (
              this.renderListitem(this.state.filtered)
            ) : (
              <EmptyFilter>По вашему запросу ни чего не найденно</EmptyFilter>
            )}
          </SearchList>
        </div>
      </div>
    );
  }
}

const EmptyFilter = styled.div`
  line-height: 45px;
`;

const StyledListItem = styled.div`
  text-align: initial;
  padding: 15px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const SearchList = styled.div`
  display: ${p => (p.open ? "inline-block" : "none")};
  position: absolute;
  top: 40px;
  width: 360px;
  min-height: 45px;
  right: 0px;
  text-align: center;
  background: white;
  border: 1px solid #ced4da;
  border-radius: 3px;
  max-height: 400px;
  overflow: auto;
`;

export default SearchLine;
