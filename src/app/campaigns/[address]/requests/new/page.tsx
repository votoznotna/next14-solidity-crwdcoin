"use client";

import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Campaign from "@/../ethereum/campaign";
import ContributeForm from "@/components/ContributeForm";
import web3 from "@/../ethereum/web3";

interface RequestNewProps {
  params: {
    address: string;
  };
}

function RequestNew(props: RequestNewProps) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const campaign = Campaign(props.params.address);
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      router.push(`/campaigns/${props.params.address}/requests`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Link href={`/campaigns/${props.params.address}/requests`}>
        <span>Back</span>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={event => setDescription(event.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={event => setValue(event.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={recipient} onChange={event => setRecipient(event.target.value)} />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default RequestNew;
