import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Card'),
  loading: () => (
    <div style={{
      width: '276px',
      height: '386px',
      textAlign: 'left',
      background: 'background: rgba(255, 255, 255, 1)',
      boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
      margin: '24px 0 0 24px',
    }} />
  ),
});
