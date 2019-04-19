import React from 'react';
import moment from 'moment';
import { Block } from 'web3/eth/types';

import ExplorerTransactionBlock from '../ExplorerTransactionBlock';
import ExplorerBlockCardPlaceholder from './ExplorerBlockCard.Placeholder';
import Card from '../../../../common/Card';
import thousandsFormat from '../../../../../utils/thousandsFormat';

import './ExplorerBlockCard.scss';

export type ExplorerBlockCardProps = {
  block: Block | { [field: string]: any },
};

// This component is a Card that represents a Block.
const ExplorerBlockCard = (props: ExplorerBlockCardProps) => {

  // This state hook holds the milliseconds since mined
  const [milliSinceLastMined, setmilliSinceLastMined] = React.useState('0s');

  // If a real Block object is passed as a prop, then
  // This will parse the timestamp diff in `#m #s`
  const updateTimeElapsed = () => {
    if (props.block.timestamp) {
      const lastMined = moment(props.block.timestamp * 1000);
      const minutes = moment().diff(lastMined, 'minutes');
      const seconds = moment().diff(lastMined, 'seconds');
      const elapsed = minutes
        ? `${minutes}m ${seconds - minutes * 60}s`
        : `${seconds}s`;

      setmilliSinceLastMined(elapsed);
    }
  };

  // This will launch the first time the card receives a real block
  // object. It updates the "mined #m #s ago" text
  React.useEffect(() => {
    updateTimeElapsed();
    const updateSeconds = setInterval(updateTimeElapsed, 1000);
    return () => clearInterval(updateSeconds);
  }, [props.block.timestamp]);

  // If an empty object is passed as a block prop, then we'll return
  // an empty placeholder
  if (!props.block.number) {
    return (
      <ExplorerBlockCardPlaceholder />
    );
  }

  return (
    <Card>
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
          <span>
            mined {milliSinceLastMined} ago
          </span>
        </div>
      </div>
      <div className="explorerblockcard-body">
        {
          props.block.transactions.slice(0, 100).map((transaction: any) => (
            <ExplorerTransactionBlock key={transaction.hash} {...{ transaction }} />
          ))
        }
      </div>
    </Card>
  );
};

export default ExplorerBlockCard;
