import React from 'react';
import './HeaderField.scss';

export type HeaderFieldProps = {
  title: string,
  value?: number | string,
  suffix?: string,
  loading?: boolean,
};

const HeaderField = ({ title, value, suffix, loading }: HeaderFieldProps) => {
  if (loading) {
    return (
      <div className="headerfield-container">
        <h2>{title}</h2>
        <div className="headerfield-value-container">
          <div className="headerfield-value-loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="headerfield-container">
      <h2>{title}</h2>
      <div className="headerfield-value-container">
        {
          !value
            ? null
            : (
              <span className="headerfield-value">
                {value}
              </span>
            )
        }
        {
          !suffix
            ? null
            : (
              <span className="headerfield-value-suffix">
                {suffix}
              </span>
            )
        }
      </div>
    </div>
  );
};

export default HeaderField;
