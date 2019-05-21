import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import CheckableItem from "../CheckableItem";
import styled from "styled-components";
import {
  IconButtonStyled,
  ExportOptionHeaderStyled,
  ExportOptionSelectStyled,
  ExportFieldSelectionContainerStyled,
  SelectionListContainerStyled,
  ColumnSelectionListStyled,
  RegionSelectionListStyled
} from "./StyledExportModal";

const mapStateToProps = state => ({
  ...state.exportModal
});

function getModalStyle() {
  return {
    top: "0",
    height: "100vh",
    width: "50%",
    minHeight: "450px",
    minWidth: "500px",
    right: "0px",
    display: "flex",
    flexDirection: "column",
    padding: "0"
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },

  closeButton: {
    alignSelf: "flex-end",
    color: "darkgray",
    padding: "1rem",
    marginRight: "0.5rem"
  },

  mainContainer: {
    margin: "0 1rem 2rem 1rem",
    borderTop: "5px solid teal"
  },

  exportOptionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem"
  },

  exportOptionSelect: {
    width: "50%"
  },

  exportFieldSelectionContainer: {
    margin: "3rem 1rem 1rem 1rem"
  },

  selectionListContainer: {
    display: "flex",
    justifyItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  columnSelectionList: {
    border: "1px solid darkgray",
    marginRight: "0.5rem",
    flex: "1",
    maxHeight: "calc(100vh - 230px)",
    overflowY: "scroll"
  },

  regionSelectionList: {
    border: "1px solid darkgray",
    marginLeft: "0.5rem",
    maxHeight: "calc(100vh - 230px)",
    overflowY: "scroll",
    flex: "1"
  },

  listItemOverride: {
    padding: "0"
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
      label: "PDF",
      value: "pdf"
    },
    {
      label: "Excel",
      value: "xls"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selectedExportOption: ["pdf"],
      selectedColumns: [],
      columnsDetail: [
        { columnName: "Organization Name", isSelected: true },
        { columnName: "Plan Code/Contract #", isSelected: false },
        { columnName: "PBP", isSelected: false },
        { columnName: "Segment", isSelected: true },
        { columnName: "Plan Name", isSelected: true },
        { columnName: "Product Type", isSelected: false },
        { columnName: "Plan Type", isSelected: false },
        { columnName: "Region", isSelected: true },
        { columnName: "County", isSelected: false },
        { columnName: "Current Enrollees", isSelected: false }
      ]
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
    this.setState({
      selectedExportOption: event.target.value
    });
  };

  selectAllHandler = event => {
    let columns = this.state.columnsDetail;
    columns = columns.map(column => {
      column.isSelected = true;
      return column;
    });

    this.setState({ columnsDetail: columns });
  };

  columnSelectionHandler = selectedColumn => () => {
    const currentIndex = this.state.columnsDetail.findIndex(
      column => column.columnName === selectedColumn.columnName
    );

    this.state.columnsDetail[currentIndex].isSelected = !this.state
      .columnsDetail[currentIndex].isSelected;

    this.setState({ columnsDetail: this.state.columnsDetail });
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
            <IconButtonStyled color="secondary">
              <Icon>close</Icon>
            </IconButtonStyled>

            <Paper className={classes.mainContainer} elevation={1}>
              <ExportOptionHeaderStyled>
                <Typography variant="subtitle2" gutterBottom>
                  Export Option
                </Typography>

                <ExportOptionSelectStyled>
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
                    value={this.state.selectedExportOption}
                    input={<Input id="select-multiple" />}
                    MenuProps={MenuProps}
                  >
                    {this.exportOptions.map(option => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </ExportOptionSelectStyled>
              </ExportOptionHeaderStyled>
              <ExportFieldSelectionContainerStyled>
                <Typography variant="subtitle2" gutterBottom>
                  Export Field Selection
                </Typography>

                <SelectionListContainerStyled>
                  <ColumnSelectionListStyled>
                    <ListItem onClick={this.selectAllHandler}>
                      Select All
                    </ListItem>
                    {this.state.columnsDetail.map(column => (
                      <ListItem
                        key={column.columnName}
                        button
                        className={classes.listItemOverride}
                      >
                        <CheckableItem
                          onSelectionChange={this.columnSelectionHandler(
                            column
                          )}
                          label={column.columnName}
                          selected={column.isSelected}
                        />
                      </ListItem>
                    ))}
                  </ColumnSelectionListStyled>

                  <RegionSelectionListStyled>
                    {[0, 1, 2, 3].map(value => (
                      <ListItem
                        key={value}
                        button
                        className={classes.listItemOverride}
                      >
                        <CheckableItem
                          onSelectionChange={this.columnSelectionHandler(value)}
                          label={`Line item ${value + 1}`}
                          selected={
                            this.state.selectedColumns.indexOf(value) !== -1
                          }
                        />
                      </ListItem>
                    ))}
                  </RegionSelectionListStyled>
                </SelectionListContainerStyled>
              </ExportFieldSelectionContainerStyled>
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

export default connect(
  mapStateToProps,
  null
)(ExportModalWrapped);
