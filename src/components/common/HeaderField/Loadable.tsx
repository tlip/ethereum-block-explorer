import React from 'react';
import Loadable from 'react-loadable';
import './HeaderField.scss';

export default Loadable({
  loader: () => import('./HeaderField'),
  loading: () => (
    <div style={{ minWidth: 207, overflow: 'hidden', padding: '3px 0', boxSizing: 'border-box' }}>
      <h2 style={{ marginTop: 0, fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' }}>{' '}</h2>
      <div style={{ height: 48, paddingRight: 20, boxSizing: 'border-box' }}>
        <div style={{ height: 48,  width: '100%', background: 'rgba(255, 255, 255, 0.1)' }} />
      </div>
    </div>
  ),
});
