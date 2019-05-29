import { createMuiTheme, ListItemText } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import CheckableItem from '../CheckableItem';
import {
  ColumnSelectionListStyled,
  ExportFieldSelectionContainerStyled,
  ExportOptionHeaderStyled,
  ExportOptionSelectStyled,
  FiltersContainerStyled,
  IconButtonStyled,
  MainContainerStyled,
  MyPaper,
  RegionSelectionListStyled,
  GreenSwitch,
  SelectionListContainerStyled,
  SelectAllListItemStyled
} from './StyledExportModal';

const mapStateToProps = state => ({
  ...state.exportModal
});

// const PaperStyled = styled(Paper)`
//   position: absolute;
//   width: 100px;
//   background-color: ${({ theme }) => theme.palette.background.paper};
//   box-shadow: ${({ theme }) => theme.shadows[5]};
//   padding: ${({ theme }) => theme.spacing.unit * 4};
//   outline: "none";
// `;

const styles = theme => ({
  listItemOverride: {
    padding: '0'
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
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
      label: 'CSV',
      value: 'csv'
    },
    {
      label: 'Excel',
      value: 'xls'
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      selectedExportOption: ['pdf'],
      selectedColumns: [],
      columnsDetail: [
        { columnName: 'Organization Name', isSelected: true },
        { columnName: 'Plan Code/Contract #', isSelected: false },
        { columnName: 'PBP', isSelected: false },
        { columnName: 'Segment', isSelected: true },
        { columnName: 'Plan Name', isSelected: true },
        { columnName: 'Product Type', isSelected: false },
        { columnName: 'Plan Type', isSelected: false },
        { columnName: 'Region', isSelected: true },
        { columnName: 'County', isSelected: false },
        { columnName: 'Current Enrollees', isSelected: false },
        { columnName: 'ABC Column 1', isSelected: false },
        { columnName: 'ABC Column 2', isSelected: false },
        { columnName: 'ABC Column 3', isSelected: false },
        { columnName: 'Organization Name', isSelected: true },
        { columnName: 'Plan Code/Contract #', isSelected: false },
        { columnName: 'PBP', isSelected: false },
        { columnName: 'Segment', isSelected: true },
        { columnName: 'Plan Name', isSelected: true },
        { columnName: 'Product Type', isSelected: false },
        { columnName: 'Plan Type', isSelected: false },
        { columnName: 'Region', isSelected: true },
        { columnName: 'County', isSelected: false },
        { columnName: 'Current Enrollees', isSelected: false },
        { columnName: 'ABC Column 1', isSelected: false },
        { columnName: 'ABC Column 2', isSelected: false },
        { columnName: 'ABC Column 3', isSelected: false }
      ],
      columnsDetail1: [],
      columnsDetail2: [],
      filters: [
        {
          label: '90 days',
          value: true
        },
        {
          label: '30 days',
          value: false
        },
        {
          label: 'Mail order',
          value: true
        },
        {
          label: 'Retail',
          value: true
        }
      ]
    };

    this.splitColumnsDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      console.log(nextProps);
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      });
    }

    // TODO: To write logic for checking for comparing the columnsDetails props and when it is getti ng change then only we have call splitColumnsDetails()
    // if () { this.splitColumnsDetails(); }
    this.splitColumnsDetails();
  }

  splitColumnsDetails() {
    const cd = this.state.columnsDetail;
    let cd1 = [];
    let cd2 = [];
    if (cd.length === 0) {
    } else if (cd.length <= 10) {
      cd1 = cd;
    } else if (cd.length > 10 && cd.length <= 20) {
      cd1 = cd.slice(0, 10);
      cd2 = cd.slice(10);
    } else {
      cd1 = cd.slice(0, cd.length / 2);
      cd2 = cd.slice(cd.length / 2);
    }

    this.setState({
      columnsDetail1: cd1,
      columnsDetail2: cd2
    });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  exportOptionOnChangeHandler = event => {
    this.setState({
      selectedExportOption: event.target.value
    });
  };

  isAllColumnsSelected = () => {
    let cd1 = this.state.columnsDetail1;
    let cd2 = this.state.columnsDetail2;

    let totalSelectedCols = 0;
    for (const col of cd1) {
      if (col.isSelected === true) {
        totalSelectedCols += 1;
      }
    }

    for (const col of cd2) {
      if (col.isSelected === true) {
        totalSelectedCols += 1;
      }
    }

    return totalSelectedCols === cd1.length + cd2.length;
  };

  selectAllHandler = event => {
    let cd1 = this.state.columnsDetail1;
    let cd2 = this.state.columnsDetail2;

    if (this.isAllColumnsSelected()) {
      cd1 = cd1.map(column => {
        column.isSelected = false;
        return column;
      });

      cd2 = cd2.map(column => {
        column.isSelected = false;
        return column;
      });
    } else {
      cd1 = cd1.map(column => {
        column.isSelected = true;
        return column;
      });

      cd2 = cd2.map(column => {
        column.isSelected = true;
        return column;
      });
    }

    this.setState({ columnsDetail1: cd1, columnsDetail2: cd2 });
  };

  columnSelectionHandler = (columnName, selectedColumn) => () => {
    let changedColumn =
      columnName === 'leftCol' ? this.state.columnsDetail1 : this.state.columnsDetail2;

    const currentIndex = changedColumn.findIndex(
      column => column.columnName === selectedColumn.columnName
    );

    const columns = changedColumn;
    columns[currentIndex].isSelected = !columns[currentIndex].isSelected;

    // this.setState({ ...this.state, columnsDetail: columns });
    columnName === 'leftCol'
      ? this.setState({ columnsDetail: columns })
      : this.setState({ columnsDetail2: columns });
  };

  filterChangeHandler = filter => event => {
    console.log({ filter });
    const tempFilters = [...this.state.filters];
    console.log({ tempFilters });
    for (const tempFilter of tempFilters) {
      if (tempFilter.label === filter.label) {
        tempFilter.value = !tempFilter.value;
        break;
      }
    }

    this.setState({
      filters: tempFilters
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
          <ThemeProvider theme={theme}>
            <MyPaper>
              <IconButtonStyled color="secondary">
                <Icon>close</Icon>
              </IconButtonStyled>

              <MainContainerStyled elevation={1}>
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
                            <Chip key={value} label={value} />
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

                <FiltersContainerStyled>
                  {this.state.filters.map(filter => {
                    return (
                      <FormControlLabel
                        control={
                          <GreenSwitch
                            checked={filter.value}
                            onChange={this.filterChangeHandler(filter)}
                            value={filter.value}
                            color="primary"
                          />
                        }
                        label={filter.label}
                        key={filter.label}
                      />
                    );
                  })}
                </FiltersContainerStyled>

                <ExportFieldSelectionContainerStyled>
                  <Typography variant="subtitle2" gutterBottom>
                    Export Field Selection
                  </Typography>

                  <SelectionListContainerStyled>
                    <ColumnSelectionListStyled>
                      <SelectAllListItemStyled onClick={this.selectAllHandler}>
                        {this.isAllColumnsSelected() ? 'Unselect All' : 'Select All'}
                      </SelectAllListItemStyled>
                      {this.state.columnsDetail1.map(column => (
                        <ListItem
                          key={column.columnName}
                          button
                          className={classes.listItemOverride}
                        >
                          <CheckableItem
                            onSelectionChange={this.columnSelectionHandler('leftCol', column)}
                            label={column.columnName}
                            selected={column.isSelected}
                          />
                        </ListItem>
                      ))}
                    </ColumnSelectionListStyled>

                    <ColumnSelectionListStyled>
                      {this.state.columnsDetail2.map(column => (
                        <ListItem
                          key={column.columnName}
                          button
                          className={classes.listItemOverride}
                        >
                          <CheckableItem
                            onSelectionChange={this.columnSelectionHandler('rightCol', column)}
                            label={column.columnName}
                            selected={column.isSelected}
                          />
                        </ListItem>
                      ))}
                    </ColumnSelectionListStyled>
                  </SelectionListContainerStyled>
                </ExportFieldSelectionContainerStyled>
              </MainContainerStyled>
            </MyPaper>
          </ThemeProvider>
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
