
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductProfile from '../ProductProfile/ProductProfile.jsx';
import CircleCheckBox from '../CircleCheckBox/CircleCheckBox.jsx';
import QuantitySelector from '../QuantitySelector/QuantitySelector.jsx';
import './ProductsTable.css';
const useStyles = makeStyles({
  table: {
    border:0,
  
  },
  'table-holder':{
    boxShadow: 'none',
    
  },
  tableItem: {
    paddingLeft:0,

  }
});

const ProductsTable = (props)=>{
  const classes = useStyles();
  const content = (
    <TableContainer className={classes["table-holder"]} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.tableItem} align="left">Product</TableCell>
            <TableCell  align="left">Color</TableCell>
            <TableCell  align="left">Size</TableCell>
            <TableCell  align="left">Quantity</TableCell>
            <TableCell  align="left">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>        
            <TableRow>
              <TableCell className={classes.tableItem}>
                <div className="product-in-cart-profile">
                  <ProductProfile/>
                  <div className="wrapper wrapped-remove-btn">
                    <button className="product-btn">Remove</button>
                  </div>
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="product-in-cart-color">
                  <div className="wrapper wrapped-product-color">
                    <CircleCheckBox />
                  </div>
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="product-in-cart-size">
                  <div className="wrapper wrapped-product-size">S</div>
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="selector-quantity-in-cart">
                  <div id="test" className="wrapper wrapped-quantity-selector"><QuantitySelector/></div>
                </div>
              </TableCell>
              <TableCell align="left">
                <div className="product-in-cart-price">
                  <div className="wrapper wrapped-product-price">$69</div>
                </div>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
  return content;
}

export default ProductsTable;