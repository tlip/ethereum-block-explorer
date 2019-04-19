import React from 'react';
import { Block, Transaction } from 'web3/eth/types';

import ExplorerHeaderPlaceholder from './ExplorerHeader.Placeholder';
import Header from '../../../../common/Header';
import HeaderField from '../../../../common/HeaderField';
import thousandsFormat from '../../../../../utils/thousandsFormat';

const ExplorerHeader = React.memo(({ blocks }: { blocks: Block[] }) => {
  const averageBlockStats = { gasUsed: 0, fullness: 0, gasPrice: 0, length: 0 };
  const currentBlock = blocks[0];
    
  // When we first launch the app, we fetch the 20 last blocks, causing this to go crazy.
  // So until the first 20 blocks are fetched, we'll just show a placeholder. 
  if (!currentBlock || blocks.length < 19) {
    return (
      <ExplorerHeaderPlaceholder />
    );
  }

  // Iterate through our blocks and aggregate some values to show some average statistics
  blocks
    .forEach((block: Block) => {
      averageBlockStats.gasUsed += block.gasUsed;
      averageBlockStats.fullness += (block.gasUsed / block.gasLimit);
      block.transactions.forEach(({ gasPrice }: Transaction, i: number) => {
        averageBlockStats.gasPrice += +gasPrice;
        averageBlockStats.length++;
      });
    });
    
  return (
    <Header>
      <HeaderField
        title="CURRENT BLOCK"
        value={thousandsFormat(currentBlock.number)}
      />
      <HeaderField
        title="AVERAGE GAS PRICE"
        value={((averageBlockStats.gasPrice / averageBlockStats.length) / 1000000000).toFixed(0)}
        suffix="gwei"
      />
      <HeaderField
        title="AVERAGE BLOCK SIZE"
        value={(averageBlockStats.gasUsed / blocks.length / 1000000).toFixed(1)}
        suffix="mgas"
      />
      <HeaderField
        title="AVERAGE BLOCK FULLNESS"
        value={`${(averageBlockStats.fullness / blocks.length * 100).toFixed(0)}%`}
      />
    </Header>
  );
});

export default ExplorerHeader;
