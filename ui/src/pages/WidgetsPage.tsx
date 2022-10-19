import { AssetHoldingAccount } from '@daml.js/account/lib/Account';
import React from 'react';
import { userContext } from '../App';


const ActiveAccountsCount = () => {
  const res = userContext.useStreamQueries(AssetHoldingAccount)
  const count = res.contracts.length;
  return (
    <>
    {/* {res.contracts[0].payload.assetType.symbol} */}
    {count}
    </>
  )
}


export const Widgets = () => {
  return (
    <>
    <ActiveAccountsCount/>
    </>
  )
}