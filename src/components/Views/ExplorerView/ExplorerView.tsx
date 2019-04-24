import React from 'react';

import ExplorerHeader from './scene/ExplorerHeader/Loadable';
import ExplorerContent from './scene/ExplorerContent/Loadable';
import { Web3Context } from '../../../contexts/Web3Context';

import './ExplorerView.scss';

const ExplorerView = () => (
  <div className="explorerview-container">
    <Web3Context.Consumer>
      {({ state, actions }) => (
        <>
          {/* Header with current Ethereum statistics */}
          <ExplorerHeader
            blocks={Object.values(state.blocks).filter(block => block)}
            statistics={state.statistics}
          />
          {/* Page content with block cards  */}
          <ExplorerContent
            blocks={state.blocks}
            blockRangeVisible={state.blockRangeVisible}
            getMoreBlocks={actions.getMoreBlocks}
            showNewerBlocks={actions.showNewerBlocks}
          />
        </>
      )}
    </Web3Context.Consumer>
  </div>
);

export default ExplorerView;
