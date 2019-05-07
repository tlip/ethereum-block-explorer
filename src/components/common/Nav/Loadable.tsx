import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Nav'),
  loading: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '96px',
      minWidth: '96px',
      height: '100vh',
      maxHeight: '100vh',
      background: ' rgba(0, 5, 255, 0.8)',
      boxShadow: '5px 0px 50px rgba(0, 0, 0, 0.1)',
    }}/>
  ),
});
