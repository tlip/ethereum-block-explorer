import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackPreload: true */ './Content'),
  loading: () => (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '96px',
        maxWidth: '96px',
        minWidth: '96px',
        height: '100vh',
        maxHeight: '100vh',
        background: ' rgba(0, 5, 255, 0.8)',
        boxShadow: '5px 0px 50px rgba(0, 0, 0, 0.1)',
      }}/>
      <div style={{ width: 'calc(100vh - 96px', height: '100vh'}}>
        <div style={{ width: '100%', height: '191px', background: 'rgba(0, 108, 255, 0.7)' }} />
        <div style={{ width: '100% ', height: '100vh'}} />
      </div>
    </div>
  ),
});
