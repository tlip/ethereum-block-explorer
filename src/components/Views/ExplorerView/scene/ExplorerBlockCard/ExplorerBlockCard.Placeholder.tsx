import React from 'react';

import Card from '../../../../common/Card';
import ExplorerTransactionBlock from '../ExplorerTransactionBlock';

const ExplorerBlockCardPlaceholder = () => (
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

export default ExplorerBlockCardPlaceholder;
