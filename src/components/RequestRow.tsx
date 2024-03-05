"use client";

import React from "react";
import { Table, TableRow, TableCell, Button } from "semantic-ui-react";
import web3 from "@/../ethereum/web3";
import Campaign from "@/../ethereum/campaign";
import { fromJSON } from "postcss";

interface RequestRowProps {
  id: number;
  request: any;
  approversCount: string;
  address: string;
}

function RequestRow(props: RequestRowProps) {
  const { approversCount, address, request, id } = props;
  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  };
  const onFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  };

  const readyToFinalize = request.approvalCount > parseInt(approversCount) / 2;

  return (
    <TableRow disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <TableCell>{id}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>{web3.utils.fromWei(request.value, "ether")}</TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>
        {parseInt(request.approvalCount)} / {parseInt(approversCount)}
      </TableCell>
      <TableCell>
        {request.complete ? null : (
          <Button color="green" onClick={onApprove} basic>
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
export default RequestRow;
