# 🗓️ Day 17: Theme Engineering & Persistent State (Dark Mode)

## 🎯 Problem Statement
Modern platforms respect user preferences. Forcing users to stare at a bright white screen at 2:00 AM causes eye strain and leads to high bounce rates. Dark Mode is no longer a "trend"—it is an industry standard. Today, we are engineering a Theme Toggle that allows users to switch to a dark UI. More importantly, using our knowledge from Day 16, we will save this preference to `localStorage` so the platform remembers their choice the next time they visit.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript, CSS3
* **Core Concepts:** CSS Custom Properties (Variables), Global DOM Manipulation (`document.body`), UI State Tracking, LocalStorage Persistence.
* **Goal:** Engineer a global state switch that modifies the underlying CSS variable architecture and persists across browser sessions.

## 📝 Task Requirements
1. **The Toggle Button:** Open `index.html`. Add a button to your navigation bar with an ID like `<button id="theme-toggle">🌙</button>`.
2. **The CSS Architecture:** Open `style.css`. On Day 2, we set up our colors in the `:root` selector. Now, create a new class called `.dark-theme`. Inside it, redefine those exact same variables with dark colors (e.g., `--bg-color: #121212; --text-color: #f1f1f1;`).
3. **The JavaScript Engine:** Open `script.js`. Select your `#theme-toggle` button. Attach a `'click'` event listener to it.
4. **Global DOM Manipulation:** Inside the listener, use `document.body.classList.toggle('dark-theme');`. This applies your dark variables to the entire document simultaneously!
5. **Save the State:** Still inside the listener, write a conditional statement. If `document.body.classList.contains('dark-theme')`, save it to storage: `localStorage.setItem('synexus_theme', 'dark')`. Else, set it to `'light'`.
6. **State Recovery:** At the very top of your script (outside any functions), check `localStorage` for the `'synexus_theme'` key. If the value is `'dark'`, automatically apply the `.dark-theme` class to the `document.body` so the site loads in dark mode immediately!

## 🚀 Bonus Challenge (Optional)
Tap into the user's operating system preferences! Look up the `window.matchMedia('(prefers-color-scheme: dark)')` API. If the user hasn't explicitly set a theme on your site yet, use this API to check if their Windows or Mac system is currently in Dark Mode, and default your site to match it.

## ⚠️ Common Pitfalls & Expected Bugs
* **Hardcoded Colors:** If you used `color: #333;` directly on your paragraphs instead of `color: var(--text-color);`, the dark mode toggle will not work on that text. Dark Mode relies 100% on CSS Variables. Refactor your CSS!
* **The "FOUC" (Flash of Unstyled Content):** If your JavaScript loads too slowly, the page will flash white for a split second before turning dark. To fix this, ensure your `<script defer>` tag is placed efficiently, or move the theme-check script directly into the `<head>`.

## 🧠 Outcomes & Learnings
* Leveraged the power of CSS Custom Properties for global theme manipulation.
* Consolidated DOM manipulation and LocalStorage into a single, cohesive user experience feature.
* Understood the mechanics behind one of the most ubiquitous UI components on the web.

## 📚 Resources & Documentation
* [MDN Web Docs: Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
* [MDN Web Docs: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screen recording showing your theme toggle (and refreshing the page to show it saved!), and post it to LinkedIn. 

> **Day 17/50 of the Web Development Challenge with @Synexus! 🚀**
>
> Today we built an industry-standard feature: Persistent Dark Mode. 🌙
>
> Building a theme toggle isn't just about changing colors; it's about architectural planning. By relying strictly on CSS Variables (`:root`), I was able to use Vanilla JavaScript to swap out the entire platform's color palette with a single class toggle on the `<body>` element.
>
> Taking it a step further, I integrated yesterday's LocalStorage lesson to ensure the browser remembers the user's preference across sessions. 
> 
> Good engineering respects the user's eyes and their choices. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #synexuscore #50daysdev #50daysweb #synexuswebdev #JavaScript #CSS3 #DarkMode #FrontendEngineering #CodingChallenge