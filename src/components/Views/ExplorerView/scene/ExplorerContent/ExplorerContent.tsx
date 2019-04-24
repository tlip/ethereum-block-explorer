
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

  // Object keys in JS are sorted, so this is guaranteed to be the newest block number
  const newestBlockNum = Object.keys(props.blocks)[Object.keys(props.blocks).length - 1];

  // If there are blocks newer than what blockRangeVisible says, then
  // we'll have a button pop up a la Twitter telling the user that we can add 
  // newer blocks.

  // This is so that we don't mess the user up if they're analyzing a specific block and/or transactioini
  const needsUpdate = props.blockRangeVisible[1] < +newestBlockNum;

  // Here we're going to filter out the blocks with numbers outside of the range
  // passed in blockRangeVisible
  const _blocks: (Block | {})[] = Object.values(props.blocks)
    .filter(block => (
      block &&
        (block.number > props.blockRangeVisible[0]) && (block.number <= props.blockRangeVisible[1])
    ));

  // We will always show at least 20 cards.
  // If we have less than 20 blocks fetched, then we'll push an empty object.
  while (_blocks.length < props.blockRangeVisible[1] - props.blockRangeVisible[0]) {
    _blocks.unshift({});
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
