import React, { useState } from 'react';
import FirstPage from '../../assets/image/first-page.svg';
import Prev from '../../assets/image/prev.svg';
import Next from '../../assets/image/next.svg';
import LastPage from '../../assets/image/last-page.svg';
const TablePaginationActions = ({list, dataLength})=>{
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(6)
  
  const content = (
    <div className="table-pagination-holder">
        <img src={FirstPage} />
        <img src={Prev} />
        <img src={Next} />
        <img src={LastPage} />
    </div>
  );
  return content;
}

export default TablePaginationActions;