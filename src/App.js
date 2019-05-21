import React from "react";
import "./App.css";
import Download from "./Download";
import { connect } from "react-redux";
import { showModal, hideModal } from "./actions/ExportModalActions";
import ExportModal from "./components/exportModal/ExportModal";

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: modalProps => {
    dispatch(showModal({ modalProps }));
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openAlertModal = this.openExportModal.bind(this);
  }

  closeModal(event) {
    this.props.hideModal();
  }

  openExportModal = event => {
    this.props.showModal(
      {
        open: true,
        title: "Alert Modal",
        closeModal: this.closeModal
      },
      "alert"
    );
  };

  render() {
    return (
      <div className="App">
        <button className="primary-button" onClick={this.openExportModal}>
          Download Report
        </button>
        <ExportModal />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
