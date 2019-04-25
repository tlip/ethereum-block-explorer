import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ExplorerView'),
  loading: () => (
    <main style={{ height: '100vh', maxHeight: '100vh', width: '100%' }}>
      <header style={{ width: '100%', height: '191px', background: 'rgba(0, 0, 0, 0.1)' }} />
    </main>
  ),
});
