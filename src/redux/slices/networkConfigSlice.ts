import { ChainID } from '@elrondnetwork/erdjs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkType } from '../../types';

export const defaultNetwork: NetworkType = {
  id: 'not-configured',
  name: 'NOT CONFIGURED',
  egldLabel: '',
  walletAddress: '',
  apiAddress: '',
  gatewayAddress: '',
  explorerAddress: ''
};

export interface InitializeNetworkConfigPayload {
  walletConnectBridge: string;
  walletConnectDeepLink: string;
  network: NetworkType;
  chainID: ChainID;
}

export interface NetworkConfigStateType {
  walletConnectBridge: string;
  walletConnectDeepLink: string;
  network?: NetworkType;
  chainID?: ChainID;
}

const initialState = {
  walletConnectBridge: '',
  walletConnectDeepLink: '',
  network: defaultNetwork
};

export const networkConfigSlice = createSlice({
  name: 'appConfig',
  initialState: initialState,
  reducers: {
    initializeNetworkConfig: (
      state: NetworkConfigStateType,
      action: PayloadAction<InitializeNetworkConfigPayload>
    ) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { initializeNetworkConfig } = networkConfigSlice.actions;

export default networkConfigSlice.reducer;
