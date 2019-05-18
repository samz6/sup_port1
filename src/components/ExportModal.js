import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.exportModal
});

function getModalStyle() {
    return {
        top: '0',
        height: '100vh',
        width: '50%',
        minHeight: '450px',
        minWidth: '500px',
        right: '0px',
        display: 'flex',
        flexDirection: 'column',
        padding: '0'
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
    },

    closeButton: {
        alignSelf: 'flex-end',
        color: 'darkgray',
        padding: '1rem',
        marginRight: '0.5rem'
    },

    mainContainer: {
        minHeight: '400px',
        margin: '0 1rem 2rem 1rem',
        borderTop: '5px solid teal'
    },

    exportOptionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem'
    },

    exportOptionSelect: {
        width: '50%'
    },

    exportFieldSelectionContainer: {
        margin: '3rem 1rem 1rem 1rem'
    },

    selectionListContainer: {
        display: 'flex',
        justifyItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    columnSelectionList: {
        border: '1px solid darkgray',
        marginRight: '0.5rem',
        flex: '1'
    },

    regionSelectionList: {
        border: '1px solid darkgray',
        marginLeft: '0.5rem',
        flex: '1'
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

class ExportModal extends React.Component {
    exportOptions = [
        {
            label: 'PDF',
            value: 'pdf'
        },
        {
            label: 'Excel',
            value: 'xls'
        }
    ];

    selectedExportOption = ['pdf'];

    selectedColumns = [1];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            console.log(nextProps);
            this.setState({
                modalIsOpen: nextProps.modalProps.open
            });
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    exportOptionOnChangeHandler = event => {
        /* const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        } */
        this.selectedExportOption = event.target.value;
    };

    columnSelectionHandler = value => () => {
        const currentIndex = this.selectedColumns.indexOf(value);
        const newChecked = [...this.selectedColumns];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.selectedColumns = newChecked;
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
                        <IconButton
                            color="secondary"
                            className={classes.closeButton}
                            aria-label="Add an alarm"
                        >
                            <Icon>close</Icon>
                        </IconButton>

                        <Paper className={classes.mainContainer} elevation={1}>
                            <div className={classes.exportOptionHeader}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Export Option
                                </Typography>

                                <FormControl className={classes.exportOptionSelect}>
                                    {/* <InputLabel htmlFor="select-multiple">Export Option</InputLabel> */}
                                    <Select
                                        multiple
                                        onChange={this.exportOptionOnChangeHandler}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {selected.map(value => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        className={classes.chip}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        value={this.selectedExportOption}
                                        input={<Input id="select-multiple" />}
                                        MenuProps={MenuProps}
                                    >
                                        {this.exportOptions.map(option => (
                                            <MenuItem key={option.label} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.exportFieldSelectionContainer}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Export Field Selection
                                </Typography>

                                <div className={classes.selectionListContainer}>
                                    <List className={classes.columnSelectionList}>
                                        {[0, 1, 2, 3, 4, 5, 6].map(value => (
                                            <ListItem key={value} button>
                                                <ListItemText primary={`Line item ${value + 1}`} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        onChange={this.columnSelectionHandler(
                                                            value
                                                        )}
                                                        checked={
                                                            this.selectedColumns.indexOf(value) !==
                                                            -1
                                                        }
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>

                                    <List className={classes.regionSelectionList}>
                                        {[0, 1, 2, 3].map(value => (
                                            <ListItem key={value} button>
                                                <ListItemText primary={`Line item ${value + 1}`} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox
                                                        onChange={this.columnSelectionHandler(
                                                            value
                                                        )}
                                                        checked={
                                                            this.selectedColumns.indexOf(value) !==
                                                            -1
                                                        }
                                                    />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </div>
                        </Paper>
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
