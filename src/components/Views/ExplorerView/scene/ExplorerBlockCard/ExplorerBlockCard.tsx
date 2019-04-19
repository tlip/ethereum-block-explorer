import React from 'react';
import moment from 'moment';
import { Block } from 'web3/eth/types';

import Card from '../../../../common/Card';
import thousandsFormat from '../../../../../utils/thousandsFormat';
import ExplorerTransactionBlock from '../ExplorerTransactionBlock';

import './ExplorerBlockCard.scss';

export type ExplorerBlockCardProps = {
  block: Block | { [field: string]: any },
};

const ExplorerBlockCard = (props: ExplorerBlockCardProps) => {
  const [milliSinceLastMined, setmilliSinceLastMined] = React.useState('0s');

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
  
  React.useEffect(() => {
    updateTimeElapsed();
    const updateSeconds = setInterval(updateTimeElapsed, 1000);
    return () => clearInterval(updateSeconds);
  }, [props.block.timestamp]);

  if (!props.block.number) {
    return (
      <Card>
        <div className="explorerblockcard-header">
          <div className="explorerblockcard-header-top">
            <div className="explorerblockcard-header-loading" style={{ width: 100 }} />
            <div className="explorerblockcard-header-loading" style={{ width: 59 }} />
          </div>
          <div className="explorerblockcard-header-bottom">
            <div className="explorerblockcard-header-loading" style={{ width: 113 }} />
          </div>
        </div>
        <div className="explorerblockcard-body">
          {
            new Array(20).fill(1).map(() => (
              <ExplorerTransactionBlock key={Math.random()} />
            ))
          }
        </div>
      </Card>
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
