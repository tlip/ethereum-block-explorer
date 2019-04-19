import React from 'react';
import { Block, Transaction } from 'web3/eth/types';
import Header from '../../../../common/Header';
import HeaderField from '../../../../common/HeaderField';
import thousandsFormat from '../../../../../utils/thousandsFormat';

const ExplorerHeader = React.memo(({ blocks }: { blocks: Block[] }) => {
  const averageBlockStats = { gasUsed: 0, fullness: 0, gasPrice: 0, length: 0 };
  const currentBlock = blocks[0];
    
  if (!currentBlock || blocks.length < 19) {
    return (
      <Header>
        <HeaderField title="CURRENT BLOCK" loading />
        <HeaderField title="AVERAGE GAS PRICE" loading />
        <HeaderField title="AVERAGE BLOCK SIZE" loading />
        <HeaderField title="AVERAGE BLOCK FULLNESS" loading />
      </Header>
    );
  }

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
