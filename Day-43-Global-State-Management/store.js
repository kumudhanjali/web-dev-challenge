class StateStore {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (currentListener) => currentListener !== listener
      );
    };
  }

  notify() {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }
}


export const globalStore = new StateStore({
  cartCount: 0
});