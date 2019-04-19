declare module 'react-router-dom';
declare module 'react-router-dom/StaticRouter';
declare module 'react-router-dom/MemoryRouter';
declare module 'react-router-dom/BrowserRouter';
declare module 'react-router-dom/Switch';
declare module 'react-router-dom/Route';

// Default Context

type DispatchFunction = (payload?: any) =>
  void;

type ActionComposer = (dispatch: Function, type: string) =>
  DispatchFunction;

interface ActionType {
  type: string;
  payload: any;
}
