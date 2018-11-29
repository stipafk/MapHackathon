import React, { Component } from "react";

class Popup extends Component {
  render() {
    return (
      <div
        className="modal"
        style={{ display: this.props.feature ? "inline-block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.feature && this.props.feature.name}
              </h5>
              <button
                type="button"
                className="close"
                onClick={this.props.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Адрес: {this.props.feature && this.props.feature.adres}</p>
              <p>
                Время работы:
                <br />
                {this.props.feature && this.props.feature.workingSchedule}
              </p>
              {this.props.feature &&
                this.props.feature.stateAccreditationStartDate && (
                  <p>
                    Дата принятия решения о государственной аккредитации:
                    <br />
                    {this.props.feature.stateAccreditationStartDate}
                  </p>
                )}
              {this.props.feature &&
                this.props.feature.stateAccreditationCertificateRequisites && (
                  <p>
                    Реквизиты свидетельства о государственной аккредитации:
                    <br />
                    {this.props.feature.stateAccreditationCertificateRequisites}
                  </p>
                )}
              {this.props.feature &&
                this.props.feature.stateAccreditationEndDate && (
                  <p>
                    Срок окончания свидетельства о государственной аккредитации:
                    <br />
                    {this.props.feature.stateAccreditationEndDate}
                  </p>
                )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.onClose}
              >
                Закрыть
              </button>
              <button
                type="button"
                onClick={this.props.zoom}
                className="btn btn-primary"
              >
                Приблизить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
