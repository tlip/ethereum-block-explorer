import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ExplorerHeader'),
  loading: () => (
    <div style={{
      width: '100%',
      height: '191px',
      miniHeight: '191px',
      background: 'rgba(0, 0, 0, 0.1)',
    }} />
  ),
});
