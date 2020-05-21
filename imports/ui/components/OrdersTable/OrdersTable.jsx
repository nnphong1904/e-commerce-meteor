import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrderStatus from '../OrderStatus/OrderStatus.jsx';
import Dropdown from '../../assets/image/dropdown.svg';
import './OrdersTable.css';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: '#acacac',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    boxShadow: 'none'
  },
  tableContainer: {
    boxShadow: 'none'
  }
});
const OrdersTable = ()=>{
 // console.log(onClickFunction);
   const classes = useStyles();
  const content = (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ORDER ID</StyledTableCell>
            <StyledTableCell align="left">ORDER DATE</StyledTableCell>
            <StyledTableCell align="left">DETAIL</StyledTableCell>
            <StyledTableCell align="left">TOTAL($)</StyledTableCell>
            <StyledTableCell align="left"><div className="status-holder">STATUS <img src={Dropdown}/></div></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
              <StyledTableCell align="left">AFBD112</StyledTableCell>
              <StyledTableCell align="left">{`Today, 8th Aug, 2018`}</StyledTableCell>
              <StyledTableCell align="left">Collete Stretch Linen Minidress (M) x 1</StyledTableCell>
              <StyledTableCell align="left">60.00</StyledTableCell>
              <StyledTableCell align="left"><OrderStatus status={0} /></StyledTableCell>
              <StyledTableCell align="left"><button className="change-order-status">ACTION</button></StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  );
  return content;
}

export default OrdersTable;