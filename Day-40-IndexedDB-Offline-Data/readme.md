# 🗓️ Day 40: Client-Side Databases (IndexedDB)

## 🎯 Problem Statement
A Progressive Web App (PWA) must handle data gracefully during network outages. If a user submits a form while offline, a standard `fetch` will fail, and their data will be lost. We need a robust place to store structured data (and even files/images) directly in the browser. Today, we utilize **IndexedDB**, a low-level, asynchronous, transactional database built into every modern browser. We will build a wrapper module to save user inputs locally when the network drops.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES8+)
* **Core Concepts:** The `indexedDB` API, Database Versions, Object Stores, Asynchronous Transactions, Network State Interception.
* **Goal:** Engineer a module that opens a local database, creates an object store, and securely writes offline data payloads for future server synchronization.

## 📝 Task Requirements
1. **The DB Module:** Create a new file called `db.js`.
2. **Open the Database:** Write an initialization function that calls `indexedDB.open('PlatformDB', 1)`. Because IndexedDB is older and uses an event-based callback system, wrap this in a `Promise` so we can use `async/await` in the rest of our app!
3. **The Upgrade Event:** IndexedDB requires a strict schema setup. Attach an `onupgradeneeded` listener to your open request. Inside it, use `db.createObjectStore('offline_proposals', { keyPath: 'id', autoIncrement: true })`. This creates our "table" and tells it to auto-generate unique IDs.
4. **The Write Transaction:** Export a function `saveOfflineData(payload)`. 
   * Open the DB.
   * Start a `transaction` on your object store with `'readwrite'` permissions.
   * Call `store.add(payload)` to save the data securely to the user's hard drive.
5. **Intercept the Network:** Open your `api.js` file and find the `POST` request function (from Day 29). 
6. **The Offline Redirect:** Right before the `fetch()` call, check `if (!navigator.onLine)`. If they are offline, import and call your new `saveOfflineData(payload)` function, alert the user that their data was saved locally, and `return` to stop the fetch!

## 🚀 Bonus Challenge (Optional)
How do we get that offline data back? Write a `getOfflineData()` function in your `db.js` module that opens a `'readonly'` transaction and uses `store.getAll()` to retrieve an array of everything saved while offline. Console log this array when the user returns online!

## ⚠️ Common Pitfalls & Expected Bugs
* **The Callback Hell:** Native IndexedDB does not use Promises by default; it relies entirely on `.onsuccess` and `.onerror` events. If you don't wrap the initial connection in a `new Promise((resolve, reject) => { ... })`, you won't be able to `await` your database connection in your API module.
* **Changing the Schema:** If you decide to rename your object store or add a new one, you MUST increment the version number in `indexedDB.open('PlatformDB', 2)`. The `onupgradeneeded` event only fires when the version number goes up!

## 🧠 Outcomes & Learnings
* Mastered the most powerful client-side storage API available in the browser.
* Engineered a transaction-based database wrapper from scratch.
* Completely eliminated data loss during network outages, finalizing the PWA offline architecture.

## 📚 Resources & Documentation
* [MDN Web Docs: Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
* [Web.dev: Storage for the Web](https://web.dev/storage-for-the-web/)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screenshot of your browser's DevTools showing data saved in IndexedDB, and post it to LinkedIn. 

> **Day 40/50 of the Web Development Challenge! 🚀**
>
> Today we finalized our offline architecture by building a Client-Side Database. 🗄️
>
> Service Workers cache our UI, but what happens when a user submits data without an internet connection? `localStorage` is synchronous and limited, so I engineered a wrapper around the browser's native **IndexedDB** API.
>
> By wrapping the event-driven transactions in ES6 Promises, I created a seamless module that intercepts `POST` requests when the network drops. Instead of losing data, the payload is securely written to a local object store, waiting for the connection to return before syncing with the server. Enterprise-grade offline reliability. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #50daysdev #50daysweb #JavaScript #IndexedDB #PWA #OfflineFirst #FrontendEngineering #CodingChallenge