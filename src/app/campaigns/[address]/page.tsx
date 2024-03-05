"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Campaign from "@/../ethereum/campaign";
import { Button, CardGroup, Grid } from "semantic-ui-react";
import ContributeForm from "@/components/ContributeForm";
import web3 from "@/../ethereum/web3";

interface CampaignShowPageProps {
  params: {
    address: string;
  };
}

interface SummaryProps {
  address: string;
  minimumContribution: string;
  balance: string;
  requestsCount: string;
  approversCount: string;
  manager: string;
}

function CampaignShow(props: CampaignShowPageProps) {
  const [summary, setSummary] = useState<SummaryProps>();

  const getSummary = async () => {
    const campaign = Campaign(props.params.address);
    const _summaryArray = await campaign.methods.getSummary().call();
    setSummary({
      address: props.params.address,
      minimumContribution: _summaryArray[0],
      balance: _summaryArray[1],
      requestsCount: _summaryArray[2],
      approversCount: _summaryArray[3],
      manager: _summaryArray[4]
    });
  };

  useEffect(() => {
    getSummary();
  }, []);

  const renderCards = (renderCardsProps: SummaryProps) => {
    const { balance, manager, minimumContribution, requestsCount, approversCount } = renderCardsProps;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "You must contribute at least this much wei to become an approver"
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the contract. Requests must be approved by approvers"
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who have already donated to this campaign"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "The balance is how much money this campaign has left to spend."
      }
    ];

    return <CardGroup items={items} />;
  };

  return (
    <React.Fragment>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{summary && renderCards(summary)}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.params.address} reloadSummary={getSummary} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${props.params.address}/requests`}>
              <Button primary>View Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

export default CampaignShow;
