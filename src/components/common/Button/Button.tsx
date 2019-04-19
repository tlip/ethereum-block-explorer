import React from 'react';

import './Button.scss';

export type ButtonProps = React.ComponentProps<any>;

const Button = ({ className, children, ...props}: ButtonProps) => (
  <div className={`button-container ${props.className}`} {...props}>
    {...children}
  </div>
);

export default Button;
