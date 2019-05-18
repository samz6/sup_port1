import React from 'react';
import logo from './logo.svg';
import './App.css';
import Download from './Download';
import { connect } from 'react-redux';
import { showModal, hideModal } from './actions/ExportModalActions';
import ExportModal from './components/ExportModal'

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

    openExportModal = (event) => {
        console.log('vivek');
        this.props.showModal(
            {
                open: true,
                title: 'Alert Modal',
                closeModal: this.closeModal
            },
            'alert'
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header" />

                <button onClick={this.openExportModal}>confirm</button>
                <ExportModal />
            </div>
        );
    }
}

export default connect(
    null,
    mapDispatchToProps
)(App);
