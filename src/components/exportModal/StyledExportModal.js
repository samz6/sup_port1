import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import FormControl from "@material-ui/core/FormControl";

export const IconButtonStyled = styled(IconButton)`
  align-self: flex-end;
  color: darkgray;
  padding: 1rem;
  margin-right: 0.5rem;
`;

// const PaperStyled = styled(Paper)`
// position: absolute;
// width: 100px;
// backgroundColor: theme.palette.background.paper,
// boxShadow: theme.shadows[5],
// padding: theme.spacing.unit * 4,
// outline: "none"
// `;

export const ExportOptionHeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;

export const ExportOptionSelectStyled = styled(FormControl)`
  width: 40%;
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
`;

export const RegionSelectionListStyled = styled(List)`
  border: 1px solid darkgray;
  margin-right: 0.5rem;
  flex: 1;
  max-height: calc(100vh - 230px);
  overflow-y: scroll;
`;
