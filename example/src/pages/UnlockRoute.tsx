import React from 'react';
import { DappUI } from 'dapp-core';

export const UnlockRoute: () => JSX.Element = () => {
  const { ExtensionLoginButton, WebWalletLoginButton, LedgerLoginButton } =
    DappUI;

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              callbackRoute={'/home'}
              loginButtonText={'Extension'}
            />
            <WebWalletLoginButton
              callbackRoute={'/home'}
              loginButtonText={'Web wallet'}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              callbackRoute={'/home'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
