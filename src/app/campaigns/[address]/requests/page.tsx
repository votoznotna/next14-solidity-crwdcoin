"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Table } from "semantic-ui-react";
import Campaign from "@/../ethereum/campaign";
import RequestRow from "@/components/RequestRow";

interface RequestIndexPageProps {
  params: {
    address: string;
  };
}

interface RowsProps {
  requests: any;
  approversCount: string;
}

function RequestIndex(props: RequestIndexPageProps) {
  const { address } = props.params;
  const campaign = Campaign(address);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [rowsProps, setRowsProps] = useState<RowsProps>();

  const getRequestCount = async () => {
    const _requestCount = await campaign.methods.getRequestsCount().call();
    const _approversCount = await campaign.methods.approversCount().call();
    const _requests = await Promise.all(
      Array(parseInt(_requestCount))
        .fill(undefined)
        .map((_, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    setRequestCount(parseInt(_requestCount));
    setRowsProps({
      requests: _requests,
      approversCount: _approversCount
    });
  };
  useEffect(() => {
    getRequestCount();
  }, []);

  const renderRows = (renderRowsProps: RowsProps) => {
    const { requests, approversCount } = renderRowsProps;
    return (
      requests &&
      requests.map((request: any, index: number) => {
        return (
          <RequestRow
            key={index}
            request={request}
            id={index}
            address={props.params.address}
            approversCount={approversCount}
          />
        );
      })
    );
  };

  return (
    <React.Fragment>
      <h3>Requests</h3>
      <Link href={`/campaigns/${props.params.address}/requests/new`}>
        <Button primary floated="right" style={{ marginBottom: 10 }}>
          Add Request
        </Button>
      </Link>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Recipient</TableHeaderCell>
            <TableHeaderCell>Approval Count</TableHeaderCell>
            <TableHeaderCell>Approve</TableHeaderCell>
            <TableHeaderCell>Finalize</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>{rowsProps && renderRows(rowsProps)}</TableBody>
      </Table>
      <div>
        Found {requestCount} {requestCount === 1 ? "request" : "requests"}.
      </div>
    </React.Fragment>
  );
}
export default RequestIndex;
