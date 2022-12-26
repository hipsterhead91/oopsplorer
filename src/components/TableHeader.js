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
    <div className="table-header">

      {/* VALIDATOR */}
      <div id="th-validator" className="table-header__cell">
        <div className="table-header__sort-button">
          <div className="table-header__sort-icon">
            <span className="table-header__sort-icon-asc"></span>
            <span className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Validator</span>
        </div>
      </div>

      {/* VOTING POWER */}
      <div id="th-power" className="table-header__cell">
        <div onClick={() => sortNumbers('tokens_num')} className="table-header__sort-button">
          <div className="table-header__sort-icon">
            <span ref={vpAsc} className="table-header__sort-icon-asc"></span>
            <span ref={vpDsc} className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Voting Power</span>
        </div>
      </div>

      {/* COMMISSION */}
      <div id="th-commission" className="table-header__cell">
        <div onClick={() => sortNumbers('commission_num')} className="table-header__sort-button">
          <div className="table-header__sort-icon">
            <span ref={cmmAsc} className="table-header__sort-icon-asc"></span>
            <span ref={cmmDsc} className="table-header__sort-icon-dsc"></span>
          </div>
          <span className="table-header__column-name">Commission</span>
        </div>
      </div>

    </div>
  )

}

export default TableHeader;