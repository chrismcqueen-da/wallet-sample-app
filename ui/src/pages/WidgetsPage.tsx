import { AssetHoldingAccount } from "@daml.js/account/lib/Account";
import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { userContext } from "../App";

const ActiveAccountsCount = () => {
  const res = userContext.useStreamQueries(AssetHoldingAccount);
  const count = res.contracts.length;
  return (
    <Card>
      <CardContent>
        {/* {res.contracts[0].payload.assetType.symbol} */}
        {count}
      </CardContent>
    </Card>
  );
};

const Invite: React.FC<InviteProps> = (props) => {
  const { issuer, fungible, symbol, owner, reference } = props;
  // create form to capture party ID
  const ledger = userContext.useLedger();
  const [recipient, setPartyId] = React.useState("");
  const onChange = (e) => {
    setPartyId(e.target.value)
  }
  const onClick = () => {
    ledger.exerciseByKey(
      AssetHoldingAccount.Invite_New_Asset_Holder,
      { _1: { issuer, symbol, reference, fungible }, _2: owner },
      { recipient }
    );
  };
  return (
    <div>
      <input onChange={onChange} type="string" />
      <Button onClick={onClick}>invite</Button>
    </div>
  );
};
const Row: React.FC<InviteProps & { id: string }> = (props) => {
  const { id, symbol, issuer, fungible, reference, owner } = props;
  return (
    <div>
      <div>{id}</div>
      <div>{symbol}</div>
      <Invite {...props} />
    </div>
  );
};

const ActiveAccounts = () => {
  const res = userContext.useStreamQueries(AssetHoldingAccount);
  const rows = res.contracts.map((contract) => (
    <Row
      id={contract.contractId}
      symbol={contract.payload.assetType.symbol}
      fungible={contract.payload.assetType.fungible}
      reference={contract.payload.assetType.reference}
      issuer={contract.payload.assetType.issuer}
      owner={contract.payload.owner}
    />
  ));
  return <div>{rows}</div>;
};

interface InviteProps {
  issuer: string;
  fungible: boolean;
  symbol: string;
  owner: string;
  reference: string | null;
}

export const Widgets = () => {
  return (
    <>
      <ActiveAccountsCount />
      <ActiveAccounts />
    </>
  );
};
