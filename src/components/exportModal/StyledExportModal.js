import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import green from '@material-ui/core/colors/green';

export const IconButtonStyled = styled(IconButton)`
  align-self: flex-end;
  color: darkgray;
  padding: 1rem;
  margin-right: 0.5rem;
`;

export const MainContainerStyled = styled(Paper)`
  elevation: ${({ theme }) => theme.elevation};
  margin: 0 1rem 2rem 1rem;
  border-top: 5px solid teal;
  box-shadow: 0px 2px 5px grey;
`;

export const MyPaper = styled.div`
  top: 0;
  height: 100vh;
  height: auto;
  width: 50%;
  min-height: 450px;
  min-width: 500px;
  right: 0px;
  display: flex;
  flex-direction: column;
  padding: 0;
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  padding: ${({ theme }) => theme.spacing.unit * 4};
  outline: none;
`;

export const ExportOptionHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;

export const ExportOptionSelectStyled = styled(FormControl)`
  width: 50%;
`;

export const ExportFieldSelectionContainerStyled = styled.div`
  margin: 3rem 1rem 1rem 1rem;
`;

export const SelectionListContainerStyled = styled.div`
  display: flex;
  justify-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
`;

export const ColumnSelectionListStyled = styled(List)`
  border: 1px solid darkgray;
  margin-right: 0.5rem;
  flex: 1;
  max-height: calc(100vh - 230px);
  overflow-y: scroll;
  padding-top: 0px !important;
  padding-bottom: 0px !important;

  &:first-child {
    margin-right: 1rem;
  }
`;

export const RegionSelectionListStyled = styled(List)`
  border: 1px solid darkgray;
  margin-right: 0.5rem;
  flex: 1;
  max-height: calc(100vh - 230px);
  // overflow-y: scroll;
`;

export const FiltersContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  justify-items: start;
  margin: 0 2rem;
`;

export const GreenSwitch = withStyles({
  switchBase: {
    color: green[300],
    '&$checked': {
      color: green[500]
    },
    '&$checked + $track': {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

export const SelectAllListItemStyled = styled(ListItem)`
  user-select: none;
  cursor: pointer;
  min-height: 54px;
`;
