import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Header'),
  loading: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      position: 'relative',
      width: '100%',
      height: '191px',
      padding: '48px',
      boxSizing: 'border-box',
    }} />
  ),
});
