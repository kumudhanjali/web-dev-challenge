# 🗓️ Day 27: API Array Iteration & Dynamic Feeds

## 🎯 Problem Statement
Fetching a single user profile is a great start, but real platforms are built on dynamic lists: social media feeds, product catalogs, and project boards. Today, we are extending our "Community Contributor Lookup" tool. When we search for a developer, we don't just want their profile—we want to fetch a live array of their most recently updated open-source repositories and dynamically render them as a grid of project cards.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES8+)
* **Core Concepts:** Endpoint Parameters (`?sort=updated`), JSON Arrays, `Array.forEach()`, DOM Clearing, Empty States.
* **Goal:** Extract an array of objects from an external server and dynamically inject them into the DOM as a standardized UI grid.

## 📝 Task Requirements
1. **The Grid UI:** Open `index.html`. Right below your `#dev-profile-card`, create a container for the projects: `<div id="repos-grid" class="initiatives-grid"></div>`. (We can reuse our CSS Grid class from Day 5!).
2. **The New Async Function:** Open `script.js`. Create a new function: `async function fetchRepositories(username) { }`.
3. **The Fetch Call:** Inside your `try/catch` block, fetch the data. GitHub allows us to append parameters to the URL to filter the results. Use this endpoint to get their 6 most recently updated repos: 
   `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
4. **Clear the Canvas:** Before you loop through the new data, you MUST write `reposGrid.innerHTML = '';` so you don't accidentally stack new search results on top of old ones.
5. **Handle the Empty State:** What if the user exists, but they have zero public repositories? Write an `if` statement checking if `data.length === 0`. If true, inject a message saying "No public repositories found." and `return` to stop the function.
6. **Iterate and Inject:** If data exists, use `.forEach()` on the array. For each `repo`, construct an HTML template literal card. Include the `repo.name`, `repo.description`, and `repo.html_url`. Inject this into your grid using `+=`.
7. **Chain the Logic:** Go back to yesterday's `fetchContributor` function. If the profile is successfully fetched, call `fetchRepositories(username)` right at the end of the `try` block so both pieces of data load together!

## 🚀 Bonus Challenge (Optional)
APIs often return `null` if a data point is missing (for example, if a repository doesn't have a description). If you just inject `repo.description`, the UI will literally say "null". Use a Logical OR operator (`||`) inside your template literal to provide a fallback string: `${repo.description || "No description provided."}`.

## ⚠️ Common Pitfalls & Expected Bugs
* **The "Undefined" Trap:** If you misspell the property name (e.g., typing `repo.url` instead of GitHub's actual property name `repo.html_url`), your links will result in `undefined` errors. Always use `console.log(data)` to inspect the exact structure of the API response in your browser tools!
* **Over-fetching:** If you don't use the `&per_page=6` parameter, GitHub might return up to 30 repositories at once, blowing out your CSS layout. Always control your data intake.

## 🧠 Outcomes & Learnings
* Combined REST API fetching with client-side Array iteration.
* Mastered URL endpoint parameters (query strings) to filter backend data.
* Engineered professional edge cases (Empty States and Null Fallbacks).

## 📚 Resources & Documentation
* [GitHub REST API: List repositories for a user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
* [MDN Web Docs: Logical OR (||)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screenshot of a loaded grid of repositories, and post it to LinkedIn. 

> **Day 27/50 of the Web Development Challenge with @Synexus! 🚀**
>
> Today we leveled up our API architecture by handling Dynamic JSON Arrays. 📊
>
> Fetching a single data object is easy, but rendering a dynamic feed requires connecting external data streams with client-side iteration. I expanded our GitHub lookup tool to fetch a developer's most recent open-source repositories and dynamically render them into a CSS Grid.
>
> I also tackled critical UX edge cases: handling "Empty States" when a user has no projects, and using logical OR operators (`||`) to prevent `null` values from breaking the UI. Standard engineering accounts for the unknowns. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #synexuscore #50daysdev #50daysweb #synexuswebdev #JavaScript #API #WebArchitecture #FrontendEngineering #CodingChallenge