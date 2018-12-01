import React from "react";
import { GEO_ARRAY } from "../constants/geoarray";
import uuid from "uuid/v4";

import device from "current-device";

import styled, { css } from "styled-components";

const isMobile = device.type !== "desktop";

const SEARCH_LIST_MAX_WIDTH = 460;

const calculateWidth = () => {
  let calculatedWidth = window.innerWidth - 17 * 2;

  return calculatedWidth > SEARCH_LIST_MAX_WIDTH ? SEARCH_LIST_MAX_WIDTH : calculatedWidth; 
};

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
        <StyledListItem isMobile={isMobile} key={uuid()} onClick={that.selectItem(feature)}>
          {feature.properties.ulAddressLocation}
          <ArrowRight>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289C10.9024 4.68342 10.9024 5.31658 11.2929 5.70711L16.5858 11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H16.5858L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7064 12.7078C19.7088 12.7054 19.7112 12.703 19.7136 12.7005C19.8901 12.5208 19.9992 12.2746 20 12.003C20 12.002 20 12.001 20 12C20 11.999 20 11.998 20 11.997C19.9996 11.8625 19.9727 11.7343 19.9241 11.6172C19.8764 11.502 19.8063 11.3938 19.7136 11.2995C19.7112 11.297 19.7089 11.2947 19.7065 11.2923M12.7071 4.29289L19.7065 11.2923L12.7071 4.29289Z"
                fill="#CECFD8"
              />
            </svg>
          </ArrowRight>
        </StyledListItem>
      );
    });
  };

  render() {
    return (
      <StyledContainer isMobile={isMobile}>
        <div className="search">
          <StyledSeachContainer>
            <SearchIcon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8859 17.2542 14.5977 16.0414 15.8563C16.0072 15.8827 15.9743 15.9115 15.9429 15.9429C15.9115 15.9743 15.8827 16.0072 15.8563 16.0414C14.5977 17.2542 12.8859 18 11 18C7.13401 18 4 14.866 4 11ZM16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L16.6177 18.0319Z"
                  fill="#9091A3"
                />
              </svg>
            </SearchIcon>
            <input
              type="text"
              placeholder="Ваш текст"
              value={this.state.value}
              onChange={this.search}
              onFocus={this.openSearch}
              onBlur={this.closeSearch}
            />
          </StyledSeachContainer>
          <SearchList isMobile={isMobile} open={this.state.open && this.state.filtered.length}>
            {this.state.filtered.length &&
              this.renderListitem(this.state.filtered)}
          </SearchList>
        </div>
      </StyledContainer>
    );
  }
}

const ArrowRight = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-12px);
`;

const SearchIcon = styled.div`
  display: inline-block;
  margin: 19px;
`;

const StyledSeachContainer = styled.div`
  height: 64px;
  width: 460px;
  background: white;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1), 0px 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  input {
    border: none;
    width: calc(100% - 90px);
    outline: none;
  }
`;

const EmptyFilter = styled.div`
  line-height: 76px;
`;

const StyledListItem = styled.div`
  position: relative;
  width: ${p => p.isMobile && `${calculateWidth()}px`};
  text-align: initial;
  padding: 20px;
  padding-right: 50px;
  cursor: pointer;
  &:hover {
    color: #121ada;
    background: #f4f4fe;
  }
`;

const SearchList = styled.div`
  display: ${p => (p.open ? "inline-block" : "none")};
  position: absolute;
  top: 75px;
  width: ${p => p.isMobile && calculateWidth()}px !important;
  min-height: 76px;
  left: 0px;
  text-align: center;
  background: white;
  border: 1px solid #ced4da;
  border-radius: 3px;
  max-height: ${p => p.isMobile ? window.innerHeight - 56 - 17 * 3 : 400}px;
  overflow: auto;
`;

const StyledContainer = styled.div`
  position: relative;
  width: ${p => (p.isMobile ? "calc(80% - 40px)" : "100%")};
  max-width: 460px;
  ${p => p.isMobile && "top: 17px;"}
  ${p =>
    p.isMobile &&
    css`
      .search > div {
        width: 100%;
      }
    `}
`;

export default SearchLine;
