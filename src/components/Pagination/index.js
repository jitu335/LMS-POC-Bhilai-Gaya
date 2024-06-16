import React, { useState } from "react";
import _ from "lodash";
import Pagination from "react-responsive-pagination";

function PaginationTabs({ shareQuery, paginate,}) { 

  return ( 
    <>
      <div className="mt-10">
        <Pagination total={shareQuery.totalPages} current={shareQuery.currentPage} onPageChange={(page) => paginate(page)} />
      </div>
    </>
  );
}

export default PaginationTabs;
