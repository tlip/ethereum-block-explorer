import App from './App';
import React from 'react';
import Renderer from 'react-test-renderer';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import injectEnv from '../../inject.env';

// @ts-ignore
window.env = injectEnv;

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
