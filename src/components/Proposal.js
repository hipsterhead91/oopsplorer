import React from "react";
import {tweakProposalType, tweakProposalStatus, tweakProposalPeriod} from "../utils/formatting";

function Proposal(props) {

  const proposal = props.proposal;

  return (
    <div className="proposal">
      <h3 className="proposal__title">#{proposal.proposal_id} {proposal.content.title}</h3>
      <p className="proposal__data"><span>Type: </span>{tweakProposalType(proposal.content['@type'])}</p>
      <p className="proposal__data"><span>Status: </span>{tweakProposalStatus(proposal.status)}</p>
      <p className="proposal__data"><span>Voting Start: </span>{tweakProposalPeriod(proposal.voting_start_time)}</p>
      <p className="proposal__data"><span>Voting End: </span>{tweakProposalPeriod(proposal.voting_end_time)}</p>
      <p className="proposal__description">{proposal.content.description}</p>
    </div>
  )
}

export default Proposal;