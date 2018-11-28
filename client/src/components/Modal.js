import React, { Component } from "react";

class Popup extends Component {
  render() {
    return (
      <div
        className="modal"
        style={{ display: this.props.open ? "inline-block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Информация о объекте</h5>
              <button
                type="button"
                className="close"
                onClick={this.props.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Адресс: какая то фигня</p>
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
