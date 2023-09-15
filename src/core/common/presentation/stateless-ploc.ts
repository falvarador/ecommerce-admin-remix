export abstract class StatelessPloc<S> {
  private internalState: S;

  constructor(initalState: S) {
    this.internalState = initalState;
  }

  public get currentState(): S {
    return this.internalState;
  }

  changeState(state: S) {
    this.internalState = state;
  }
}
