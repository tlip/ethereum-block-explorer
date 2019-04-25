import React from 'react';

import './Card.scss';

export type CardProps = React.ComponentProps<any>;

const Card = ({ className, children, ...props }: CardProps) => (
  <section className={`card-container ${className}`} {...props}>
    {...children}
  </section>
);

export default Card;
