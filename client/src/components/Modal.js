import React, { Component } from "react";
import styled from "styled-components";

class Popup extends Component {
  render() {
    return (
      <div
        className="modal"
        style={{ display: this.props.feature ? "inline-block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="">
          <div className="header-modal">
            <StyledFeatureName>
              {this.props.feature && this.props.feature.name}
            </StyledFeatureName>
            <StyledButton
              type="button"
              className="close"
              onClick={this.props.onClose}
            >
              <span aria-hidden="true">&times;</span>
            </StyledButton>
            <StyledButtonTwo
              type="button"
              className="close"
              onClick={this.props.backToSeach}
            >
              <span aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                  />
                  <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>
              </span>
            </StyledButtonTwo>
          </div>
          <hr />
          <div className="modal-body">
            <div className="item-modal">
              <div className="icon-value">
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
                    d="M6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10C20 13.0981 17.9843 16.1042 15.774 18.4373C14.6894 19.5822 13.6013 20.5195 12.7833 21.1708C12.4789 21.4133 12.213 21.6152 12 21.7726C11.787 21.6152 11.5211 21.4133 11.2167 21.1708C10.3987 20.5195 9.31061 19.5822 8.22595 18.4373C6.01574 16.1042 4 13.0981 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315ZM11.4448 23.8317C11.445 23.8319 11.4453 23.8321 12 23L11.4453 23.8321C11.7812 24.056 12.2188 24.056 12.5547 23.8321L12 23C12.5547 23.8321 12.555 23.8319 12.5552 23.8317L12.556 23.8312L12.5581 23.8298L12.5648 23.8253L12.5877 23.8098C12.6072 23.7966 12.6349 23.7776 12.6704 23.753C12.7415 23.7038 12.8435 23.6321 12.9722 23.5392C13.2295 23.3534 13.5936 23.0822 14.0292 22.7354C14.8987 22.043 16.0606 21.0428 17.226 19.8127C19.5157 17.3958 22 13.9019 22 10C22 7.34784 20.9464 4.8043 19.0711 2.92893C17.1957 1.05357 14.6522 0 12 0C9.34784 0 6.8043 1.05357 4.92893 2.92893C3.05357 4.8043 2 7.34784 2 10C2 13.9019 4.48426 17.3958 6.77405 19.8127C7.93939 21.0428 9.10133 22.043 9.97082 22.7354C10.4064 23.0822 10.7705 23.3534 11.0278 23.5392C11.1565 23.6321 11.2585 23.7038 11.3296 23.753C11.3651 23.7776 11.3928 23.7966 11.4123 23.8098L11.4352 23.8253L11.4419 23.8298L11.444 23.8312L11.4448 23.8317ZM10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z"
                    fill="#9091A3"
                  />
                </svg>
              </div>
              <div className="value adres">
                <div>{this.props.feature && this.props.feature.adres}</div>
                <ArrowRight onClick={this.props.zoom}>
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
                <hr />
              </div>
            </div>
            <div className="item-modal">
              <div className="icon-value">
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
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.3788 11.214 12.725 11.5528 12.8944L15.5528 14.8944C16.0468 15.1414 16.6474 14.9412 16.8944 14.4472C17.1414 13.9532 16.9412 13.3526 16.4472 13.1056L13 11.382V6Z"
                    fill="#9091A3"
                  />
                </svg>
              </div>
              <div className="value">
                {this.props.feature && this.props.feature.workingSchedule}
                <hr />
              </div>
            </div>
            <div className="item-modal">
              <div className="icon-value">
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
                    d="M3.87868 1.87868C4.44129 1.31607 5.20435 1 6 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289L20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H6C5.20435 23 4.44129 22.6839 3.87868 22.1213C3.31607 21.5587 3 20.7957 3 20V4C3 3.20435 3.31607 2.44129 3.87868 1.87868ZM6 3C5.73478 3 5.48043 3.10536 5.29289 3.29289C5.10536 3.48043 5 3.73478 5 4V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V8.41421L13.5858 3H6Z"
                    fill="#9091A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 1C14.5523 1 15 1.44772 15 2V7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V2C13 1.44772 13.4477 1 14 1Z"
                    fill="#9091A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13Z"
                    fill="#9091A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
                    fill="#9091A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 9C7 8.44772 7.44772 8 8 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H8C7.44772 10 7 9.55228 7 9Z"
                    fill="#9091A3"
                  />
                </svg>
              </div>
              <div className="value">
                <StyledLabel>Регистрационный номер</StyledLabel>
                {this.props.feature &&
                  this.props.feature.stateAccreditationCertificateRequisites}
                <hr />
              </div>
            </div>
            <div className="item-modal">
              <div className="icon-value no-pd">
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
                    d="M6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10C20 13.0981 17.9843 16.1042 15.774 18.4373C14.6894 19.5822 13.6013 20.5195 12.7833 21.1708C12.4789 21.4133 12.213 21.6152 12 21.7726C11.787 21.6152 11.5211 21.4133 11.2167 21.1708C10.3987 20.5195 9.31061 19.5822 8.22595 18.4373C6.01574 16.1042 4 13.0981 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315ZM11.4448 23.8317C11.445 23.8319 11.4453 23.8321 12 23L11.4453 23.8321C11.7812 24.056 12.2188 24.056 12.5547 23.8321L12 23C12.5547 23.8321 12.555 23.8319 12.5552 23.8317L12.556 23.8312L12.5581 23.8298L12.5648 23.8253L12.5877 23.8098C12.6072 23.7966 12.6349 23.7776 12.6704 23.753C12.7415 23.7038 12.8435 23.6321 12.9722 23.5392C13.2295 23.3534 13.5936 23.0822 14.0292 22.7354C14.8987 22.043 16.0606 21.0428 17.226 19.8127C19.5157 17.3958 22 13.9019 22 10C22 7.34784 20.9464 4.8043 19.0711 2.92893C17.1957 1.05357 14.6522 0 12 0C9.34784 0 6.8043 1.05357 4.92893 2.92893C3.05357 4.8043 2 7.34784 2 10C2 13.9019 4.48426 17.3958 6.77405 19.8127C7.93939 21.0428 9.10133 22.043 9.97082 22.7354C10.4064 23.0822 10.7705 23.3534 11.0278 23.5392C11.1565 23.6321 11.2585 23.7038 11.3296 23.753C11.3651 23.7776 11.3928 23.7966 11.4123 23.8098L11.4352 23.8253L11.4419 23.8298L11.444 23.8312L11.4448 23.8317ZM10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z"
                    fill="#9091A3"
                  />
                </svg>
              </div>
              <div className="value">
                <StyledLabel>
                  Срок свидетельства о государственной аккредитации:
                </StyledLabel>
                {`${this.props.feature &&
                  this.props.feature.stateAccreditationStartDate} - ${this.props
                  .feature && this.props.feature.stateAccreditationEndDate}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ArrowRight = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-30px);
`;

const StyledLabel = styled.div`
  color: #9091a3;
  font-size: 14px;
`;

const StyledButton = styled.button`
  background: #121ada !important;
  border-radius: 50%;
  opacity: 1;
  position: absolute;
  right: -50px;
  top: 0;
  width: 40px;
  height: 40px;
  > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-7px) translateY(-14px);
    color: white;
    font-weight: normal;
  }
`;

const StyledButtonTwo = styled.button`
  background: #121ada !important;
  border-radius: 50%;
  opacity: 1;
  position: absolute;
  right: -50px;
  top: 50px;
  width: 40px;
  height: 40px;
  > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-12px) translateY(-14px);
    color: white;
    font-weight: normal;
  }
`;

const StyledFeatureName = styled.h5`
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default Popup;
