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
import ChangeStatusAction from '../ChangeStatusAction/ChangeStatusAction.jsx';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: '#acacac',
  },
  body: {
    fontSize: 14,
    border: 'none'
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    boxShadow: 'none'
  },
  tableContainer: {
    boxShadow: 'none',
    height: '100%'
  }
});
const OrdersTable = ({ordersList})=>{
 // console.log(onClickFunction);
  console.log(ordersList);
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
            <StyledTableCell align="left">
              <div className="status-holder">
                <div>STATUS</div> 
                <img className="dropdown-btn" src={Dropdown}/>
              </div>
            </StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            ordersList.map((order, orderIndex)=>{
              const content = (
                <StyledTableRow key={orderIndex}>
                  <StyledTableCell align="left">{order.orderId}</StyledTableCell>
                  <StyledTableCell align="left">{`Today, 8th Aug, 2018`}</StyledTableCell>
                  <StyledTableCell align="left">
                    {
                      `${JSON.parse(order.orderDetails)[0].name}(${JSON.parse(order.orderDetails)[0].size}) X ${JSON.parse(order.orderDetails)[0].quantity}`
                    }
                  </StyledTableCell>
                  <StyledTableCell align="left">{`${order.subtotal.toFixed(2)}`}</StyledTableCell>
                  <StyledTableCell align="left"><OrderStatus status={order.status} /></StyledTableCell>
                  <StyledTableCell align="left">
                    <div className="action-container">
                     <div className="action-holder">
                        <button className="change-order-status">ACTION</button>
                        <img className="dropdown-btn change-status-dropdown" src={Dropdown}/>
                        <div className="change-status-action-container">
                          <ChangeStatusAction/>
                        </div>
                     </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              );
              return content;
            })
          }
          {/* <TableRow>
              <StyledTableCell align="left">AFBD112</StyledTableCell>
              <StyledTableCell align="left">{`Today, 8th Aug, 2018`}</StyledTableCell>
              <StyledTableCell align="left">Collete Stretch Linen Minidress (M) x 1</StyledTableCell>
              <StyledTableCell align="left">60.00</StyledTableCell>
              <StyledTableCell align="left"><OrderStatus status={0} /></StyledTableCell>
              <StyledTableCell align="left"><button className="change-order-status">ACTION</button></StyledTableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>

  );
  return content;
}

export default OrdersTable;