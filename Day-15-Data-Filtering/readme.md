# 🗓️ Day 15: Array Filtering & Real-Time Search (Data Manipulation)

## 🎯 Problem Statement
Yesterday, we successfully rendered our Initiatives Gallery dynamically from a JavaScript array. But what happens when the Synexus community grows to have 50 or 100 projects? Users need a way to find exactly what they are looking for. Today, we are engineering a real-time search filter. By manipulating our data arrays before they hit the DOM, we can instantly update the UI as the user types.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript
* **Core Concepts:** Reusable Functions, The `'input'` Event, Array Methods (`.filter()`), String Methods (`.toLowerCase()`, `.includes()`).
* **Goal:** Intercept user input and use it to filter a dataset, re-rendering the UI to match the specific search criteria.

## 📝 Task Requirements
1. **The Search UI:** Open your `index.html`. Right above your `<div id="dynamic-grid">`, add a search input: `<input type="text" id="search-projects" placeholder="Search initiatives...">`.
2. **Refactor into a Function:** Open `script.js`. Instead of having your `.forEach` loop run globally, wrap it inside a reusable function called `renderProjects(dataArray)`. This allows us to call the function multiple times with different lists of data!
3. **Clear the Grid:** Inside your new `renderProjects` function, the very first line must be `gridContainer.innerHTML = '';`. If you don't do this, every time you search, it will just add more cards to the bottom of the page instead of replacing them.
4. **Listen to the Input:** Select your `#search-projects` input. Attach an event listener for the `'input'` event (which fires every single time a keystroke happens).
5. **The Filter Logic:** Inside the event listener, get the value of the input and convert it to lowercase (e.g., `const searchTerm = searchInput.value.toLowerCase();`). 
6. **Execute the Search:** Use the array `.filter()` method on your `projectsData`. Return only the projects where the `project.title.toLowerCase().includes(searchTerm)`. Finally, pass that newly filtered array back into your `renderProjects()` function!

## 🚀 Bonus Challenge (Optional)
Add a "No Results Found" state! In your `renderProjects` function, check if the `dataArray.length === 0`. If it is empty, inject a message into the grid container saying, "No initiatives match your search." 

## ⚠️ Common Pitfalls & Expected Bugs
* **Case Sensitivity:** If a user types "store", but your data says "StoreLane", JavaScript will think they don't match because of the capital "S". You must normalize both the search term and the data title using `.toLowerCase()` before comparing them!
* **Mutating the Original Array:** `.filter()` is great because it creates a *new* array. Never permanently delete items from your original `projectsData` array, otherwise, deleting the search text won't bring the projects back!

## 🧠 Outcomes & Learnings
* Shifted from static rendering to dynamic, state-driven UI updates.
* Mastered the `.filter()` array method, a core pillar of functional programming.
* Engineered a lightning-fast, client-side search engine without needing a database query.

## 📚 Resources & Documentation
* [MDN Web Docs: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* [MDN Web Docs: String.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screen recording showing your search bar filtering projects in real-time, and post it to LinkedIn. 

> **Day 15/50 of the Web Development Challenge with @Synexus! 🚀**
>
> Today we built a client-side search engine from scratch. 🔍
>
> Following yesterday's transition to a data-driven architecture, I engineered a real-time search feature for our Initiatives Gallery. By utilizing Vanilla JavaScript's `.filter()` method and the `'input'` event, the DOM dynamically re-renders exactly what the user is looking for with every single keystroke.
>
> We also tackled edge cases like case-sensitivity normalization and empty-state UI. Logic dictates the experience.
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #synexuscore #50daysdev #50daysweb #synexuswebdev #JavaScript #FrontendEngineering #WebDevelopment #CodingChallenge