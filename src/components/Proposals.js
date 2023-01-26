import React from "react";
import { useOutletContext } from "react-router-dom";
import Proposal from "./Proposal";

function Proposals() {

  const [chain, chainApi, totalBonded, activeProposals] = useOutletContext();

  return (
    <div className="proposals">
      <h2 className="proposals__heading">Active Proposals</h2>
      <p className="proposals__note"><span>Note:</span> this section is WIP. Proposal descriptions are in markdown format, which means that I need some specific libraries/plugins to render them beautyful. This type of knowledge is not in my learning priority, so maybe later.</p>
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