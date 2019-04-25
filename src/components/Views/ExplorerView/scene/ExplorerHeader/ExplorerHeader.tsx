import React from 'react';
import { Block, Transaction } from 'web3/eth/types';

import ExplorerHeaderPlaceholder from './ExplorerHeader.Placeholder';
import Header from '../../../../common/Header/Loadable';
import HeaderField from '../../../../common/HeaderField/Loadable';
import thousandsFormat from '../../../../../utils/thousandsFormat';

const ExplorerHeader = React.memo(({ blocks, statistics }: {
  blocks: Block[],
  statistics: any,
}) => {
  const currentBlock = blocks.reverse()[0];
    
  // When we first launch the app, we fetch the 20 last blocks, causing this to go crazy.
  // So until the first 20 blocks are fetched, we'll just show a placeholder. 
  if (!currentBlock || blocks.length < 10) {
    return (
      <ExplorerHeaderPlaceholder />
    );
  }
    
  return (
    <Header>
      <HeaderField
        title="CURRENT BLOCK"
        value={thousandsFormat(currentBlock.number)}
      />
      <HeaderField
        title="AVERAGE GAS PRICE"
        value={((statistics.gasPrice / statistics.transactionCount) / 1000000000).toFixed(0)}
        suffix="gwei"
      />
      <HeaderField
        title="AVERAGE BLOCK SIZE"
        value={(statistics.gasUsed / blocks.length / 1000000).toFixed(1)}
        suffix="mgas"
      />
      <HeaderField
        title="AVERAGE BLOCK FULLNESS"
        value={`${(statistics.fullness / blocks.length * 100).toFixed(0)}%`}
      />
    </Header>
  );
});

export default ExplorerHeader;
