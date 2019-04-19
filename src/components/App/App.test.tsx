import App from './App';
import React from 'react';
import Renderer from 'react-test-renderer';
import MemoryRouter from 'react-router-dom/MemoryRouter';

Object.assign(global, {
  ...global,
  window: {
    env: { ...process.env },
  },
});

describe('<App />', () => {
  test('renders without exploding', () => {
    const Wrapper = Renderer.create(
      <MemoryRouter initialEntries={['/']}>
        <div style={{ width: '100vh', height: '100vh' }}>
          <App />
        </div>
      </MemoryRouter>
    );

    // Make sure it mounts
    expect(Wrapper.root.findByType(App));
  });
});
