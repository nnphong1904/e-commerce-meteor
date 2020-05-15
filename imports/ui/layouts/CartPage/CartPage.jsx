import React from 'react';
import './CartPage.css';
import CircleCheckBox from '../../components/CircleCheckBox/CircleCheckBox.jsx';
import ProductHolder from '../../components/ProductHolder/ProductHolder.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    boxShadow: 'none',
    backgroundColor: 'white',
    marginLeft: '5px'
  },
  tableItem: {
   
  }
});

const CartPage = (props)=>{
  const classes = useStyles();
  const fakeObject ={
    avt:'https://i.pinimg.com/564x/06/6b/40/066b401775f48d2e4ac886c387d21363.jpg',
    price:69.00,
    name:'Fake Product',
    sizes: [{size:'M', noItems:10}]
  };
  const content = (
  <div className="cart-page-container">
  <div className="cart-page-header">MY BAG</div>
    <div className="products-list">
      <TableContainer className={classes.table}  component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableItem} align="left">Product</TableCell>
              <TableCell className={classes.tableItem} align="left">Color</TableCell>
              <TableCell className={classes.tableItem} align="left">Size</TableCell>
              <TableCell className={classes.tableItem} align="left">Quantity</TableCell>
              <TableCell className={classes.tableItem} align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow >
                <TableCell >
                  <ProductHolder product={fakeObject}/>
                </TableCell>
                <TableCell className={classes.tableItem} align="left">
                  <CircleCheckBox/>
                </TableCell>
                <TableCell className={classes.tableItem} align="left">
                  <span className="product-in-cart-size">
                    S  
                  </span>
                </TableCell>
                <TableCell className={classes.tableItem} align="left">
                  <span className="change-quantity-holder">
                      <button className="increase change-quantity-btn">+</button>
                      <input 
                        type="number" 
                        className="quantity-selector" 
                        //vaulue={1}
                        />
                      <button className="decrease change-quantity-btn">-</button>
                  </span>
                </TableCell>
                <TableCell className={classes.tableItem} align="left">asdf</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
  );
  return content;
}
export default CartPage;