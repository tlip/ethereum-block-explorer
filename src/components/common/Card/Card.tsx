import React from 'react';

import './Card.scss';

export type CardProps = React.ComponentProps<any>;

const Card = ({ className, children, ...props }: CardProps) => (
  <div className={`card-container ${className}`} {...props}>
    {...children}
  </div>
);

export default Card;
