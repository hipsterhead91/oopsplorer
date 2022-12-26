import React, { useState, useEffect } from "react";

function Proposal(props) {

  const proposal = props.proposal;

  useEffect(() => {
    console.log(proposal)
  }, [])

  return (
    <div className="proposal">
      <h3 className="proposal__title">{proposal.content.title}</h3>
      <p className="proposal__description">{proposal.content.description}</p>
    </div>
  )
}

export default Proposal;