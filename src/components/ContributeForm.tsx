"use client";

import React, { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "@/../ethereum/campaign";
import web3 from "@/../ethereum/web3";

interface ContributeFormProps {
  address: string;
  reloadSummary: () => void;
}

const ContributeForm = (props: ContributeFormProps) => {
  const { address, reloadSummary } = props;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether")
      });
      reloadSummary();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
      setValue("");
    }
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" labelPosition="right" onChange={event => setValue(event.target.value)} />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
