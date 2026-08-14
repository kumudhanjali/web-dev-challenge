# 🗓️ Day 28: Real-Time API Search & Network Throttling

## 🎯 Problem Statement
Clicking a "Search" button is a high-friction user experience. We want our GitHub Contributor Lookup tool to fetch data dynamically as the user types. But every time we use `fetch()`, we consume server resources. If a user types "JavaScript" quickly, firing 10 API requests in half a second will trigger a `403 Forbidden` or `429 Too Many Requests` error, temporarily banning our IP address from the API. 

Today, we engineer a Real-Time Search interface that protects the network utilizing a **Debouncer**. We will command the browser to wait until the user pauses typing before dispatching the HTTP request.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES8+)
* **Core Concepts:** API Rate Limiting, The `debounce` pattern, Real-time DOM updates, Edge-case handling (empty inputs).
* **Goal:** Engineer a predictive, keystroke-driven API search that optimizes network payloads and handles rate-limit HTTP errors.

## 📝 Task Requirements
1. **Refactor the UI:** Open `index.html`. You no longer need the `<button id="search-dev-btn">`. Hide it or delete it. The `<input type="text" id="github-username">` will now do all the heavy lifting.
2. **Bring Back the Gatekeeper:** Open `script.js`. At the top of your file, paste the `debounce` higher-order function you wrote back on Day 21. 
3. **Handle Empty States:** In your `fetchContributor` function (from Day 26), add a check at the very beginning. If the `username` is an empty string `""`, clear the `#dev-profile-card` HTML and `return` immediately so it doesn't try to fetch a blank username.
4. **Bind the Input Event:** Select your `#github-username` input. Attach an `'input'` event listener to it. 
5. **Apply the Debounce:** Instead of passing your fetch function directly to the event listener, wrap it in the `debounce` function with a delay of `500` milliseconds. 
6. **Rate Limit Gatekeeping:** GitHub returns a specific status code when you make too many requests. Inside your `fetchContributor` `try/catch` block, add an `else if (response.status === 403 || response.status === 429)` check. If triggered, throw a custom error: `throw new Error("API Rate Limit exceeded. Please wait a moment.");`

## 🚀 Bonus Challenge (Optional)
Look up the **`AbortController`** API. What happens if a user types "brad", waits 500ms (triggering a fetch), and then immediately types "traversy", triggering a second fetch? If the first fetch takes longer to return than the second one, the UI will overwrite the correct data with the old data! Use an `AbortController` to cancel any in-flight API requests before starting a new one.

## ⚠️ Common Pitfalls & Expected Bugs
* **Losing the Input Value:** When you wrap a function in a debounce, passing the `event` object can sometimes be tricky depending on how you structured it. It is often safer to grab `document.getElementById('github-username').value` directly inside the fetch function rather than relying on `e.target.value`.
* **The "Undefined" Search:** Make sure you are using `.trim()` on the input value. A user accidentally hitting the spacebar shouldn't trigger an API call!

## 🧠 Outcomes & Learnings
* Bridged Phase 2 (Performance) with Phase 3 (Asynchronous APIs).
* Engineered a modern, predictive search UI without relying on external libraries.
* Handled real-world network limitations (Rate Limiting) explicitly in the code.

## 📚 Resources & Documentation
* [GitHub REST API: Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
* [MDN Web Docs: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screen recording showing your real-time search firing only after you stop typing, and post it to LinkedIn. 

> **Day 28/50 of the Web Development Challenge with @Synexus! 🚀**
>
> Today we modernized our platform by building a Real-Time API Search. 🔍
>
> Forcing a user to click a "Search" button is outdated UX. However, fetching data on every keystroke will instantly trigger API Rate Limits and ban your IP. To solve this, I combined our API architecture with the `debounce` performance utility we wrote back in Phase 2.
>
> Now, the JavaScript engine intelligently waits for the user to pause for 500ms before dispatching the HTTP request. We get the premium feel of predictive search while perfectly optimizing our network payload and handling `403 Rate Limit` errors smoothly. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #synexuscore #50daysdev #50daysweb #synexuswebdev #JavaScript #API #Performance #FrontendEngineering #CodingChallenge