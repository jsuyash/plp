import React from "react";
import RenderDialogContentByType from "./RenderDialogContentByType";
import "../../assets/styles/dialog.scss";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleOnKeyDown);
  }

  handleOnKeyDown(event) {
    const { keyCode } = event;
    if (keyCode && keyCode === 27) {
      this.props.onClose();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleOnKeyDown);
  }

  render() {
    const {
      status,
      onClose,
      dialogType,
      dialogProps = {},
      dialogActions = {},
      dialogValue = {}
    } = this.props;
    const { shortBottom = "", fullScreen = "", hideCloseIcon = false } = dialogProps;
    const { applyFilters } = dialogActions;

    if (!status) {
      return false;
    }
    return (
      <React.Fragment>
        <section
          className={`dialog-wrapper ${shortBottom ? "dialog-bottom-short" : ""}  ${
            fullScreen ? "full-screen-dialog" : ""
          }`}
          onKeyDown={this.handleOnKeyDown}
        >
          {!hideCloseIcon && (
            <div className="close-icon-wrapper">
              <span title="Close Dialog" className="close-icon" onClick={() => onClose()}>
                X
              </span>
            </div>
          )}
          <div className="dialog-content">
            <RenderDialogContentByType
              dialogType={dialogType}
              dialogProps={dialogProps}
              dialogValue={dialogValue}
              dialogActions={dialogActions}
            />
          </div>
          {dialogType && dialogType === "FILTERS" && (
            <div className="dialog-footer">
              <button onClick={onClose}>Close</button>
              <button onClick={applyFilters}>Apply</button>
            </div>
          )}
        </section>
        <div className="dialog-backdrop"></div>
      </React.Fragment>
    );
  }
}

export default Dialog;