import { createMigrate, persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import reduxPersistLocalStorage from 'redux-persist/lib/storage';
import reduxPersistSessionStorage from 'redux-persist/lib/storage/session';
import getRootReducer from 'reduxStore/reducers';
import { defaultNetwork } from 'reduxStore/slices';
import toasts from 'reduxStore/slices/toastsSlice';
import transactionsInfo from 'reduxStore/slices/transactionsInfoSlice';
import transactions from 'reduxStore/slices/transactionsSlice';
import { ReducersEnum } from 'types/reducers.types';

const migrations: any = {
  2: (state: any) => {
    return {
      ...state,
      networkConfig: defaultNetwork
    };
  }
};

function getSessionStoragePersistConfig(key: string, blacklist: string[] = []) {
  return {
    key,
    version: 1,
    storage: reduxPersistSessionStorage,
    blacklist
  };
}

const transactionsInfoPersistConfig = getSessionStoragePersistConfig(
  'dapp-core-transactionsInfo'
);
const transactionsReducerPersistConfig = getSessionStoragePersistConfig(
  'dapp-core-transactions',
  [ReducersEnum.transactionsToSign]
);
const toastsReducerPersistConfig = getSessionStoragePersistConfig(
  'dapp-core-toasts'
);

const localStoragePersistConfig: PersistConfig<any> = {
  key: 'dapp-core-store',
  version: 2,
  storage: reduxPersistLocalStorage,
  whitelist: [
    ReducersEnum.account,
    ReducersEnum.loginInfo,
    ReducersEnum.modals,
    ReducersEnum.networkConfig
  ],
  migrate: createMigrate(migrations, { debug: false })
};
const sessionStorageReducers = {
  [ReducersEnum.toasts]: persistReducer(toastsReducerPersistConfig, toasts),
  [ReducersEnum.transactions]: persistReducer(
    transactionsReducerPersistConfig,
    transactions
  ),
  [ReducersEnum.transactionsInfo]: persistReducer(
    transactionsInfoPersistConfig,
    transactionsInfo
  )
};

export default persistReducer(
  localStoragePersistConfig,
  getRootReducer(sessionStorageReducers)
);
