# 🗓️ Day 43: Global State Management (The Pub/Sub Pattern)

## 🎯 Problem Statement
In a modular application, UI components live in isolation (especially Web Components wrapped in a Shadow DOM). If Component A needs to update based on an action taken in Component B, passing data manually between them is messy and unscalable. Today, we architect a central "Source of Truth"—a Global Store. We will engineer a Publish-Subscribe (Pub/Sub) engine where components can "subscribe" to data changes, and the store automatically notifies them whenever the state updates.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES6 Classes)
* **Core Concepts:** The Pub/Sub Design Pattern, Centralized State, Reactivity, Spread Syntax (`...`), Callbacks.
* **Goal:** Engineer a centralized memory store that automatically broadcasts state changes to any active subscribers across the application.

## 📝 Task Requirements
1. **The Store Class:** Create a new file in your core directory called `store.js`. Inside, define an ES6 `class StateStore`.
2. **The Memory Bank:** In the `constructor(initialState)`, create two properties: `this.state = initialState;` and `this.listeners = [];`. The listeners array will hold the functions of every component that wants to be notified of changes.
3. **The Subscription Engine:** Create a `subscribe(listenerFunction)` method. It should `push` the provided function into the `this.listeners` array.
4. **The Broadcast Engine:** Create a `setState(newState)` method. 
   * First, update the state by merging the old state with the new using the spread operator: `this.state = { ...this.state, ...newState };`.
   * Second, loop through every function in `this.listeners` and execute it, passing in the newly updated state: `this.listeners.forEach(listener => listener(this.state));`.
5. **Export a Singleton:** At the bottom of `store.js`, initialize one single instance of the store and export it: `export const globalStore = new StateStore({ cartCount: 0, userTheme: 'light' });`.
6. **Implement Reactivity:** Open your UI files (e.g., `main.js` or your Web Components). Import `globalStore`. Call `globalStore.subscribe()` to update the UI automatically, and `globalStore.setState()` to trigger those updates!

## 🚀 Bonus Challenge (Optional)
What if a component is removed from the DOM? If its listener is still inside the `listeners` array, you have created a Memory Leak! Update your `subscribe` method so that it *returns a function*. When that returned function is called, it should filter the `listeners` array to remove that specific subscriber. 

## ⚠️ Common Pitfalls & Expected Bugs
* **Mutating State Directly:** Never write `globalStore.state.cartCount = 5`. If you mutate the state directly, the `setState` method never runs, the listeners never get notified, and the UI never updates! ALWAYS use `globalStore.setState({ cartCount: 5 })`.
* **Multiple Store Instances:** You must use the Singleton pattern. If you write `new StateStore()` inside two different files, they will create two entirely different, disconnected memory banks. Always export and import the *exact same instance* from `store.js`.

## 🧠 Outcomes & Learnings
* Demystified how state management libraries like Redux and Zustand work under the hood.
* Engineered a reactive application where the UI automatically syncs with JavaScript memory.
* Mastered the industry-standard Publish-Subscribe software design pattern.

## 📚 Resources & Documentation
* [Patterns.dev: The Observer / PubSub Pattern](https://www.patterns.dev/posts/observer-pattern/)
* [MDN Web Docs: Spread syntax (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, and post it to LinkedIn. 

> **Day 43/50 of the Web Development Challenge! 🚀**
>
> Today we tackled one of the most complex architectural challenges in frontend engineering: Global State Management. 🧠
>
> Passing data between disconnected UI components usually results in tangled, tightly coupled code. Instead of relying on bloated libraries like Redux to solve this, I engineered a native Publish-Subscribe (Pub/Sub) engine using Vanilla JavaScript. 
>
> By creating a centralized `StateStore` class, any module or Web Component can subscribe to specific data points. When `setState()` is called, the store automatically broadcasts the new payload to all active listeners, perfectly syncing the UI with the core memory state. Standard, reactive architecture.
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #50daysdev #50daysweb #JavaScript #StateManagement #PubSub #SoftwareArchitecture #FrontendEngineering #CodingChallenge