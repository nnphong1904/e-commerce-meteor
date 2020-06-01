import React, { useState, useEffect } from 'react';
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
    // minWidth: '700',
    width: '95%',
    boxShadow: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    
  },
  tableContainer: {
    boxShadow: 'none',
    height: '80vh',
    paddingBottom: 10
  }
});
const OrdersTable = ({ordersList})=>{
  const [currentOrdersList, setCurrentOrdersList] = useState([]);
  const [unSortedOrdersList, setUnSortedOrdersList] = useState([]);
  const [doSortArray , setDoSortArray] = useState(false);

  const updateCurrentOrdersList = (newOrdersList)=>{
    setCurrentOrdersList([...newOrdersList]);
    setUnSortedOrdersList([...newOrdersList]);
  }
  // console.log(currentOrdersList);
  const shortOrdersAsPendingOrderFirst = ()=>{
    console.log('sort')
    if (doSortArray === false){
      const newSortedOrders = [...currentOrdersList.sort((order1, order2)=>{
          if (order1.status === 0 && (order2.status === 1 || order2.status === -1)){
            return -1;
          }
          if ((order1.status === 1 || order1.status === -1) && order2.status === 0){
            return 1;
          }
          if (order1.status === 1 && order2.status === -1){
            return -1
          }
          if (order1.status === -1 && order2.status === 1){
            return 1;
          }
      })];
      // const newSortedOrders = [...currentOrdersList.sort()];
      setDoSortArray(true);
      // setCurrentOrdersList([...unSortedOrdersList]);
    }
    else {
      setDoSortArray(false);
      setCurrentOrdersList([...unSortedOrdersList]);
    }
  }

  useEffect(()=>{
      setCurrentOrdersList([...ordersList]);
      setUnSortedOrdersList([...ordersList])
  }, [ordersList])
  // console.log(ordersList);
  const classes = useStyles();
  const content = (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">ORDER ID</StyledTableCell>
            <StyledTableCell align="left">ORDER DATE</StyledTableCell>
            <StyledTableCell align="left">DETAIL</StyledTableCell>
            <StyledTableCell align="left">TOTAL($)</StyledTableCell>
            <StyledTableCell align="left">
              <div className="status-holder">
                <div onClick={shortOrdersAsPendingOrderFirst}>STATUS</div> 
                <img onClick={shortOrdersAsPendingOrderFirst} className="dropdown-btn" src={Dropdown}/>
              </div>
            </StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            currentOrdersList.map((order, orderIndex)=>{
              const content = (
                <StyledTableRow key={orderIndex}>
                  <StyledTableCell align="left">{order.orderId}</StyledTableCell>
                  <StyledTableCell align="left">
                    {
                        
                          order.createAt === undefined ? `Today, 8th Aug, 2018` : new Date((order.createAt)).toString().split(' ').slice(0,4).join(', ')
                    }
                  </StyledTableCell>
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
                          <ChangeStatusAction currentOrdersList={currentOrdersList} updateOrdersList={updateCurrentOrdersList} orderIndex={orderIndex} orderId={order.orderId} />
                        </div>
                     </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              );
              return content;
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  );
  return content;
}

export default OrdersTable;