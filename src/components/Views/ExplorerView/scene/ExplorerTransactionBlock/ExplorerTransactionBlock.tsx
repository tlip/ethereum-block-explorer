import React from 'react';

import './ExplorerTransactionBlock.scss';

const ExplorerTransactionBlock = (props: { transaction?: any }) => (
  <div className="explorertransactionblock-container">
    <div className="explorertransactionblock-block" />
    {
      !props.transaction || !props.transaction.hash 
        ? null
        : (
          <div className="explorertransactionblock-tooltip">
            <div className="explorertransactionblock-tooltip-top">
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
              <div>
                <div className="explorertransactionblock-tooltip-field">
                  VALUE
                </div>
                <div className="explorertransactionblock-tooltip-value">
                  {
                    props.transaction.value
                      ? +props.transaction.value.slice(0, -13).slice(0, 5) / 10000 
                      : null
                  } ETH
                </div>
              </div>
            </div>
          </div>
        )
    }
  </div>
);

export default ExplorerTransactionBlock;
