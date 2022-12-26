import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Proposal from "./Proposal";

function Proposals() {

  const [chain, chainApi, totalBonded, activeProposals] = useOutletContext();

  useEffect(() => {
    console.log(activeProposals)
  }, [activeProposals])

  return (
    <div className="proposals">
      <h2 className="proposals__heading">Active Proposals</h2>
      {
        (activeProposals && activeProposals.length > 0)
          ? activeProposals.map(proposal => {
            return <Proposal key={proposal.proposal_id} proposal={proposal} />
          })
          : <p className="proposals__no-proposals">Oops! There are no active proposals at this moment.</p>
      }
    </div>
  )
}

export default Proposals;