import Web3 from 'web3';
import { Block, Transaction } from 'web3/eth/types';
import { Subscription, BlockHeader } from 'web3-eth';

export as namespace Web3Context;

export = Web3Context;

declare namespace Web3Context {
  type State = {
    web3: Web3,
    headerSubscription?: Subscription<BlockHeader>,
    blocks: { [blockNumber: number]: Block },
    blockRangeVisible: number[],
    statistics: {
      gasUsed: number,
      fullness: number,
      gasPrice: number,
      transactionCount: number,
    }
  };

  type Actions = {
    setBlock: (block: { [blockNumber: number]: Block }) => void,
    getMoreBlocks: () => void,
    showNewerBlocks: () => void,
  };

  type Value = {
    state: State,
    actions: Actions,
  };
}
