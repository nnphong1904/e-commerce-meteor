import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductAdminAction from '../ProductAdminAction/ProductAdminAction.jsx';
import Paper from '@material-ui/core/Paper';
import ProductProfile from '../ProductProfile/ProductProfile.jsx';
import Dropdown from '../../assets/image/dropdown.svg';
import './ProductsTableAdmin.css';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: '#acacac',
  },
  body: {
    fontSize: 14,
    border: 'none',
    width: 600,
    paddingRight: 50
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
    width: '100%',
    boxShadow: 'none',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tableContainer: {
    boxShadow: 'none',
    height: '100%'
  },
  noPadding: {
    paddingRight: 0
  }
});
const ProductsTableAdmin = ({turnOnEditProductForm, productsList=[]})=>{
  const [currentProductsList, setCurrentProductsList] = useState([]);
  useEffect(()=>{
    setCurrentProductsList([...productsList]);
  }, [productsList])
  const classes = useStyles();
  const content = (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">PRODUCTS</StyledTableCell>
            <StyledTableCell align="left">SOLD</StyledTableCell>
            <StyledTableCell align="left">DATE ADDED</StyledTableCell>
            <StyledTableCell align="left">PROFIT($)</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            currentProductsList.map((product, productIndex)=>{
              const content = (
                <StyledTableRow key={productIndex} align="left">
                  <StyledTableCell align="left">
                    <div className='admin-product-profile-holder'>
                      <ProductProfile productName={product.name} productAvatar={product.avt} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {`${product.numberOfItem}`}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                     {`Today, 8th Aug, 2018`}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {`${product.price.toFixed(2)}`}
                  </StyledTableCell>
                  <StyledTableCell className={classes.noPadding}  align="center">
                    <div className="action-container">
                      <div className="action-holder">
                          <button className="product-action-btn">ACTION</button>
                          <img className="dropdown-btn product-action-dropdown" src={Dropdown}/>
                          <div className="product-admin-action-container">
                             <ProductAdminAction turnOnEditForm={turnOnEditProductForm}  currentList={currentProductsList} updateProductsList={setCurrentProductsList} productIndex={productIndex} productId={product._id._str}/>
                          </div>
                      </div>
                      </div>
                  </StyledTableCell>
                  
                </StyledTableRow>
              );
              return content;P
            })
          }
        </TableBody>
      </Table>
    </TableContainer>

  );
  return content;
}

export default ProductsTableAdmin;