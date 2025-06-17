import React, { useState } from "react";
import {useFlags} from 'launchdarkly-react-client-sdk';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const paginationDisplayStyle = useFlags().paginationStyle;
  console.log(paginationDisplayStyle);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px", flexWrap: paginationDisplayStyle}}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          style={{
            margin: "0 5px",
            backgroundColor: currentPage === index + 1 ? "#007bff" : "#fff",
            color: currentPage === index + 1 ? "#fff" : "#000",
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;