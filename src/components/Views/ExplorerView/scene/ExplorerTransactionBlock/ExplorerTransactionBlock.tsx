import React from 'react';

import './ExplorerTransactionBlock.scss';

const ExplorerTransactionBlock = (props: { transaction?: any }) => {

  // isHovering state hook to track whether or not the component is being hovered on
  const [isHovering, setHovering] = React.useState(false);

  // Pre-parse the transaction value to reuse in 2 places
  const parsedValue = props.transaction
    ? props.transaction.value.slice(0, -13).slice(0, 5) / 10000
    : 0;

  return (
    <div className="explorertransactionblock-container">
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
                        ? parsedValue
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
};

export default ExplorerTransactionBlock;
