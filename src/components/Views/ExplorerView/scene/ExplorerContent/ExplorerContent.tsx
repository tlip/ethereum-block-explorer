
import React from 'react';
import { Block } from 'web3/eth/types';
import ExplorerBlockCard from '../ExplorerBlockCard';
import Button from '../../../../common/Button';

import './ExplorerContent.scss';

export type ExplorerContentProps = {
  blocks: { [blockNumber: number]: Block },
  blockRangeVisible: number[],
  getMoreBlocks: Function,
  showNewerBlocks: Function,
};

const ExplorerContent = (props: ExplorerContentProps) => {
  const newestBlockNum = Object.keys(props.blocks)[Object.keys(props.blocks).length - 1];
  const needsUpdate = props.blockRangeVisible[1] < +newestBlockNum;
  const _blocks: (Block | {})[] = Object.values(props.blocks)
    .filter(block => (
      block &&
        (block.number > props.blockRangeVisible[0]) && (block.number <= props.blockRangeVisible[1])
    ));

  while (_blocks.length < 20) {
    _blocks.push({});
  }

  return (
    <div className="explorerviewcontent-container">
      {
        _blocks.reverse().map((block: Block | any) => (
          <ExplorerBlockCard key={block.timestamp || Math.random()} {...{ block }} />
        ))
      }
      <div className={`explorerviewcontent-show-newer-container ${needsUpdate? 'active' : ''}`}>
        <Button onClick={props.showNewerBlocks}>
          SHOW NEWER BLOCKS
        </Button>
      </div>
      <div className="explorerviewcontent-load-more-container">
        <Button onClick={props.getMoreBlocks}>
          LOAD MORE
        </Button>
      </div>
    </div>
  );
};

export default ExplorerContent;
