import React from 'react';

import './Button.scss';

export type ButtonProps = React.ComponentProps<any>;

const Button = ({ className, children, ...props }: ButtonProps) => (
  <button className={`button-container ${className}`} {...props}>
    {...children}
  </button>
);

export default Button;
