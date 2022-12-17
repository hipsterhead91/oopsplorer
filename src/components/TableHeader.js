import React, { useState, useRef } from "react";

function TableHeader(props) {

  const shownValidators = props.shownValidators;
  const setShownValidators = props.setShownValidators;
  const [order, setOrder] = useState('ASC');
  const vpAsc = useRef();
  const vpDsc = useRef();
  const cmmAsc = useRef();
  const cmmDsc = useRef();

  const sortNumbers = (column) => {
    if (order === 'ASC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return a[column] > b[column] ? 1 : -1
      });
      setShownValidators(sorted);
      setOrder('DSC');
    } else if (order === 'DSC') {
      const sorted = [...shownValidators].sort((a, b) => {
        return a[column] < b[column] ? 1 : -1
      });
      setShownValidators(sorted);
      setOrder('ASC');
    }
  }

  return (
    <div className="validators__header">

      {/* VALIDATOR */}
      <div className="validators__header-cell">
        <div className="validators__sort-button">
          <div className="validators__sort-icon">
            <span className="validators__sort-icon-asc"></span>
            <span className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__column-name">Validator</span>
        </div>
      </div>

      {/* VOTING POWER */}
      <div className="validators__header-cell validators__header-cell_right">
        <div onClick={() => sortNumbers('tokens_num')} className="validators__sort-button">
          <div className="validators__sort-icon">
            <span ref={vpAsc} className="validators__sort-icon-asc"></span>
            <span ref={vpDsc} className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__column-name">Voting Power</span>
        </div>
      </div>

      {/* COMMISSION */}
      <div className="validators__header-cell validators__header-cell_right">
        <div onClick={() => sortNumbers('commission_num')} className="validators__sort-button">
          <div className="validators__sort-icon">
            <span ref={cmmAsc} className="validators__sort-icon-asc"></span>
            <span ref={cmmDsc} className="validators__sort-icon-dsc"></span>
          </div>
          <span className="validators__column-name">Commission</span>
        </div>
      </div>

    </div>
  )

}

export default TableHeader;