import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
    ...state.exportModal
});

function getModalStyle() {

    return {
        top: `61px`,
        height: '450px',
        right: `0`
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none'
    }
});

class ExportModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            console.log(nextProps)
            this.setState({
                modalIsOpen: nextProps.modalProps.open
            });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalIsOpen}
                    onClose={this.closeModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            Text in a modal
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

ExportModal.propTypes = {
    classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const ExportModalWrapped = withStyles(styles)(ExportModal);

// export default ExportModalWrapped;

export default connect(
    mapStateToProps,
    null
)(ExportModalWrapped);
