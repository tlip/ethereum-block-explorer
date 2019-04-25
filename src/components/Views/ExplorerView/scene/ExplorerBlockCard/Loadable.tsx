import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ExplorerBlockCard'),
  loading: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        overflowY: 'auto',
        width: '100',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    />
  ),
});
