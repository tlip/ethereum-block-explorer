import React from 'react';
import Web3 from 'web3';
import axios, { AxiosResponse } from 'axios';
import actionComposer from '../utils/actionComposer';
import { canUseDOM } from 'exenv';
import { Block, Eth } from 'web3-eth';
import { BlockHeader } from 'web3/eth/types';

const { NODE_ENV, RAZZLE_PRODUCT_ID } = !canUseDOM
  ? process.env
  // @ts-ignore
  : window.env;


// Initial State
//
const initialState: Web3Context.State = {
  web3: new Web3(new Web3.providers.WebsocketProvider(
    `wss://mainnet.infura.io/ws/v3/${RAZZLE_PRODUCT_ID}`
  )),
  headerSubscription: undefined,
  blocks: {},
  blockRangeVisible: [Infinity, -Infinity],
  ethPrice: 0,
  statistics: {
    gasUsed: 0,
    fullness: 0,
    gasPrice: 0,
    transactionCount: 0,
  },
};


// Initial Context
//
const initialContext: Web3Context.Value = {
  state: initialState,
  actions: {
    setBlock: (block: { [blockNumber: number]: Block }) => undefined,
    getMoreBlocks: () => undefined,
    showNewerBlocks: () => undefined,
  },
};


// Reducer
//
const themeReducer = (
  state: Web3Context.State = initialState,
  action: ActionType
) => {
  switch (action.type) {
  case 'SET_WEB3':
    return { ...state, web3: action.payload };
  case 'SET_SUBSCRIPTION':
    return { ...state, headerSubscription: action.payload };
  case 'UPDATE_BLOCK_RANGE':
    return { ...state, blockRangeVisible: action.payload };
  case 'SET_ETH_PRICE':
    return { ...state, ethPrice: action.payload };
  case 'SET_BLOCK':
    const block: Block | any = Object.values(action.payload)[0] || {};
    return {
      ...state,
      blocks: { ...state.blocks, ...action.payload },
      statistics: {
        gasUsed: state.statistics.gasUsed + (block.gasUsed || 0),
        gasPrice: state.statistics.gasPrice + ([0, ...block.transactions].reduce((a, b) => a + +b.gasPrice) || 0),
        fullness: state.statistics.fullness + (block.gasUsed / block.gasLimit || 0),
        transactionCount: state.statistics.transactionCount + block.transactions.length,
      },
    };
  default:
    return state;
  }
};


// Exports
//
export const Web3Context = React.createContext(initialContext);

export const Web3ContextProvider = (props: any) => {
  /**
   * Set provider at root of project so make reducer hook available
   * anywhere with the consumer
   */


  // Create Reducer
  //
  const [_state, dispatch] = React.useReducer(themeReducer, initialState);
  const state = _state!;


  // Curate Actions
  //
  
  const setBlock: DispatchFunction = actionComposer(dispatch, 'SET_BLOCK');
  const showNewerBlocks: DispatchFunction = () => actionComposer(dispatch, 'UPDATE_BLOCK_RANGE')([
    state.blockRangeVisible[0],
    (Object.values(state.blocks)[Object.values(state.blocks).length - 1] as Block).number,
  ]);

  //  Get block by number
  const getBlock = (blockNumber: number) => {
    state.web3.eth.getBlock(blockNumber, true, (err: Error, block: Block) => {
      if (err) {
        console.log(err);
        return;
      } else if (!block) {
        getBlock(blockNumber);
        return;
      }
      setBlock({ [blockNumber]: block });
    });
  };

  // Get surrent ETH price
  const setCurrentEthPrice = () => (
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .then((value: AxiosResponse<any>) => actionComposer(dispatch, 'SET_ETH_PRICE')(value.data.USD))
      .catch((err: Error) => {
        if (NODE_ENV !== 'production') {
          console.log(err);
        }
        return state.ethPrice;
      })
  );

  // Fetch 20 earlier blocks than currently in the state
  const getMoreBlocks = () => {
    const range = state.blockRangeVisible;
    const earliestBlock = range[0] - 20;
    let i = range[0];
    
    while (i-- > earliestBlock) {
      getBlock(i);
      range[0] = Math.min(i, range[0]);
    }
    actionComposer(dispatch, 'UPDATE_BLOCK_RANGE')(range);
  };

  // Get either missed (after reconnect) or last 20 blocks (fresh init)
  const getRecentBlocks = () => {
    state.web3.eth.getBlockNumber()
      .then((blockNumber: number) => {
        let i = blockNumber;
        let range = [Infinity, -Infinity];
        const receivedBlockNumbers = Object.keys(state.blocks);
        const firstBlockNumber = receivedBlockNumbers.length
          ? receivedBlockNumbers[receivedBlockNumbers.length - 1]
          : blockNumber - 20;

        while (i-- >= firstBlockNumber) {
          getBlock(i);
          range = [Math.min(i, range[0]), Math.max(i, range[1])];
        }
        actionComposer(dispatch, 'UPDATE_BLOCK_RANGE')(range);
      })
      .catch(() => {
        console.log('Could not get current block number...');
      });
  };

  // Subscribe to `newBlockHeader` evens through our web3 client.
  const subscribeToNewBlockHeaders = () => {
    getRecentBlocks();

    const headerSubscription = state.web3.eth.subscribe('newBlockHeaders');

    headerSubscription
      .on('data', (block: BlockHeader) => {
        setCurrentEthPrice();
        getBlock(block.number - 1);
      });

    actionComposer(dispatch, 'SET_SUBSCRIPTION')(headerSubscription);
  };

  // On mount, subscribe to newBlockHeaders pub/sub feed
  // On unmount, unsubscribe
  React.useEffect(() => {
    subscribeToNewBlockHeaders();
    setCurrentEthPrice();
    return () => {
      state.headerSubscription && state.headerSubscription.unsubscribe();
    };
  }, []);
  

  // Create context value
  const web3ContextValue: Web3Context.Value = {
    state,
    actions: {
      setBlock,
      getMoreBlocks,
      showNewerBlocks,
    },
  };

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {props.children}
    </Web3Context.Provider>
  );
};
