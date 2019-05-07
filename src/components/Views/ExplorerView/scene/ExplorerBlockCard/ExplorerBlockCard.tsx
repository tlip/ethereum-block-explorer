import React from 'react';
import { Block } from 'web3/eth/types';

import ExplorerTransactionBlock from '../ExplorerTransactionBlock';
import ExplorerBlockCardTime from '../ExplorerBlockCardTime';
import ExplorerBlockCardPlaceholder from './ExplorerBlockCard.Placeholder';
import Card from '../../../../common/Card/Loadable';
import { CaretDownIcon } from '../../../../common/Icons';
import thousandsFormat from '../../../../../utils/thousandsFormat';

import './ExplorerBlockCard.scss';

export type ExplorerBlockCardProps = {
  block: Block | { [field: string]: any },
};

// This component is a Card that represents a Block.
const ExplorerBlockCard = React.memo((props: ExplorerBlockCardProps) => {

  // If a block has over 100 transactions, it can be expanded
  // to show the rest of them
  const [isExpanded, toggleExpanded] = React.useState(false);

  // If an empty object is passed as a block prop, then we'll return
  // an empty placeholder
  if (!props.block.number) {
    return (
      <ExplorerBlockCardPlaceholder />
    );
  }

  return (
    <Card
      style={
        isExpanded?
          { width: Math.ceil(props.block.transactions.length / 100) * 300 - 24 }
          : undefined
      }
    >
      {/* Block header */}
      <div className="explorerblockcard-header">
        <div className="explorerblockcard-header-top">
          <span>
            #{thousandsFormat(props.block.number)}
          </span>
          <span>
            {props.block.transactions.length} TXs
          </span>
        </div>
        <div className="explorerblockcard-header-bottom">
          <ExplorerBlockCardTime timestamp={props.block.timestamp} />
        </div>
      </div>
      {/* Block body */}
      <div className={`explorerblockcard-body ${isExpanded ? 'expanded' : ''}`}>
        {/**
          * This is the grid of squares representing transactions
          */
          props.block.transactions
            .slice(0, isExpanded ? undefined : 100)
            .map((transaction: any) => (
              <ExplorerTransactionBlock key={transaction.hash} {...{ transaction }} />
            ))
        }
      </div>
      {/**
        * This is the footer that gives the user the option to expand/hide
        * the rest of the 100 transactions (if the block has over 100 tx).
        */
        props.block.transactions.length <= 100
          ? null
          : (
            <div className="explorerblockcard-footer">
              <span>
                {
                  isExpanded
                    ? `HIDE ${props.block.transactions.length - 100} TX`
                    : `${props.block.transactions.length - 100} MORE TX`
                }
              </span>
              <button
                className="explorerblockcard-footer-button"
                onClick={() => toggleExpanded(!isExpanded)}
              >
                <div style={{ transform: `rotate(${isExpanded? 180 : 0}deg)` }}>
                  <CaretDownIcon />
                </div>
              </button>
            </div>
          )
      }
    </Card>
  );
});

export default ExplorerBlockCard;
