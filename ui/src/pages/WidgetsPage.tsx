import { AssetHoldingAccount } from '@daml.js/account/lib/Account';
import React, { useContext } from 'react';
import { userContext } from '../App';


const ActiveAccountsCount = () => {
  const res = userContext.useStreamQueries(AssetHoldingAccount)
  const count = res.contracts.length;
  return (
    <>
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