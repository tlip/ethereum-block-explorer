import React from 'react';

import Card from '../../common/Card';
import ExplorerHeader from './scene/ExplorerHeader';
import { Web3Context } from '../../../contexts/Web3Context';

import './ExplorerView.scss';
import ExplorerContent from './scene/ExplorerContent';

// Themed Component
//
const ExplorerView = () => (
  <div className="explorerview-container">
    <Web3Context.Consumer>
      {({ state, actions }) => (
        <>
          <ExplorerHeader
            blocks={Object.values(state.blocks).reverse().filter(block => block)}
          />
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
