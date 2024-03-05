"use client";

import React, { useState, useEffect } from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "@/../ethereum/factory";
import Link from "next/link";

function CampaignIndex() {
  const [campaigns, setCampaigns] = useState<any>();

  useEffect(() => {
    const getCampaigns = async () => {
      const _campaigns: Array<any> = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(_campaigns);
    };
    getCampaigns();
  }, []);

  const renderCampaigns = () => {
    const items =
      (campaigns &&
        campaigns.map(address => {
          return {
            header: address,
            description: (
              <Link href={`/campaigns/${address}`}>
                <span>View Campaign</span>
              </Link>
            ),
            fluid: true
          };
        })) ||
      [];
    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <Button floated="right" content="Create Campaign" icon="add circle" primary />
      </Link>
      {renderCampaigns()}
    </div>
  );
}

export default CampaignIndex;
