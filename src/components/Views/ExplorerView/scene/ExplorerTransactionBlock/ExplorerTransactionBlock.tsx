import React from 'react';

import './ExplorerTransactionBlock.scss';
import { Web3Context } from '@src/contexts/Web3Context';

const ExplorerTransactionBlock = (props: { transaction?: any }) => {

  // isHovering state hook to track whether or not the component is being hovered on
  const [isHovering, setHovering] = React.useState(false);

  // Pre-parse the transaction value to reuse in 2 places
  const parsedValue = props.transaction
    ? props.transaction.value.slice(0, -13).slice(0, 5) / 10000
    : 0;

  return (
    <li className="explorertransactionblock-container">
      <div
        className={`explorertransactionblock-block ${parsedValue && 'active'}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      />

      {/**
        * If this TransactioinBlock is being hovered on & isn't a placeholder,
        * then this is a tooltip.
        */
        !isHovering || !props.transaction || !props.transaction.hash 
          ? null
          : (
            <div className="explorertransactionblock-tooltip">
              <div className="explorertransactionblock-tooltip-top">
                {/* Transaction Sender */}
                <div>
                  <div className="explorertransactionblock-tooltip-field">
                    FROM
                  </div>
                  <div className="explorertransactionblock-tooltip-value">
                    {
                      props.transaction.from
                        ? `${props.transaction.from.slice(0,6)}...${props.transaction.from.slice(-6)}`
                        : null
                    }
                  </div>
                </div>
                {/* Transaction Recipipent */}
                <div>
                  <div className="explorertransactionblock-tooltip-field">
                    TO
                  </div>
                  <div className="explorertransactionblock-tooltip-value">
                    {
                      props.transaction.to
                        ? `${props.transaction.to.slice(0,6)}...${props.transaction.to.slice(-6)}`
                        : null
                    }
                  </div>
                </div>
              </div>
              <div className="explorertransactionblock-tooltip-bottom">
                {/* Transaction Value */}
                <div>
                  <div className="explorertransactionblock-tooltip-field">
                    VALUE
                  </div>
                  <div className="explorertransactionblock-tooltip-value">
                    <div>
                      {/* Value in ETH */}
                      {parsedValue} ETH
                    </div>
                    <div>
                      {/* Value in USD */}
                      <Web3Context.Consumer>
                        {({ state }) => (
                          parsedValue
                            ? `$${(parsedValue * state.ethPrice).toFixed(2)} @ $${state.ethPrice}`
                            : ''
                        )}
                      </Web3Context.Consumer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      }

    </li>
  );
};

export default ExplorerTransactionBlock;
