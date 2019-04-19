const actionComposer: ActionComposer = (dispatch: Function, type: string) =>
  (payload: any) => dispatch({ type, payload });

export default actionComposer;
