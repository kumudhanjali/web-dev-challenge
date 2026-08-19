# 🗓️ Day 35: API Security & Authentication (Bearer Tokens)

## 🎯 Problem Statement
A public API is fine for reading generic data, but mutating data (`POST`, `PUT`, `DELETE`) requires strict security. If a platform allows anyone to send a deletion command, the database will be compromised instantly. Modern architecture solves this using Authentication Tokens (usually JSON Web Tokens, or JWTs). Today, we will engineer a secure request pipeline that pulls a saved cryptographic token from memory and attaches it to our HTTP headers, proving to the server that we have the authority to execute the command.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES8+)
* **Core Concepts:** HTTP Security, The `Authorization` Header, Bearer Tokens, LocalStorage Retrieval, `401 Unauthorized`.
* **Goal:** Securely transmit credentials alongside a data payload to an authenticated server endpoint.

## 📝 Task Requirements
1. **Mock the Login:** Open your browser's DevTools, go to the Application tab (LocalStorage), and manually add a key called `auth_token` with a value of `mock_jwt_12345`. This simulates a user who has already logged in.
2. **The Secure Fetch:** Open `api.js`. Create a new async function called `secureDeleteResource(targetId)`.
3. **Retrieve the Token:** Inside the function, immediately attempt to pull the token from storage: `const token = localStorage.getItem('auth_token');`.
4. **The Gatekeeper:** Write a defensive check. If the token does not exist (`!token`), throw a custom error immediately: `"Access Denied: No authentication token found."` Do not even attempt the network request.
5. **The Header Configuration:** In your `fetch` options object, add the `Authorization` header. The industry standard protocol requires the word "Bearer " followed by the token:
   `'Authorization': 'Bearer ' + token`
6. **Handle 401s:** Even if we send a token, it might be expired or invalid. Add a specific status check for `response.status === 401` and throw an `"Unauthorized: Session expired"` error.

## 🚀 Bonus Challenge (Optional)
Centralize your security! Instead of manually typing out the `Authorization` header in every single `POST`, `PUT`, and `DELETE` function, write a utility function called `getAuthHeaders()` that automatically checks LocalStorage and returns the fully formatted headers object. Then, spread (`...`) that object into your fetch options!

## ⚠️ Common Pitfalls & Expected Bugs
* **The "Bearer " Typo:** Notice the space after the word Bearer? `Bearer ${token}`. If you forget that space, the server reads `Bearermock_jwt_12345` and will reject your request immediately.
* **Storing Sensitive Data:** `localStorage` is accessible via JavaScript, making it vulnerable to XSS (Cross-Site Scripting) attacks. In enterprise production environments, highly sensitive tokens are often stored in `HttpOnly` cookies, but `localStorage` remains the standard for learning and many single-page applications.

## 🧠 Outcomes & Learnings
* Engineered a secure network request pipeline.
* Mastered the industry standard `Authorization: Bearer` protocol.
* Applied the "Standard, not a trend. The Logic, not a language" philosophy to API security—this exact header logic is used across Python, Java, and JavaScript.

## 📚 Resources & Documentation
* [MDN Web Docs: Authorization Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
* [JWT.io: Introduction to JSON Web Tokens](https://jwt.io/introduction)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, and post it to LinkedIn. 

> **Day 35/50 of the Web Development Challenge! 🚀**
>
> Today we locked down our network architecture by mastering API Authentication. 🔒
>
> Building a platform that pulls public data is one thing, but modifying a backend database requires strict authorization protocols. I engineered a secure HTTP request pipeline using Vanilla JavaScript that extracts local session tokens and injects them directly into the `Authorization: Bearer` header. 
>
> We also handled critical security edge cases, like intercepting unauthorized attempts locally before they consume server bandwidth, and gracefully handling `401 Unauthorized` responses from expired sessions. Standard, secure engineering. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #50daysdev #50daysweb #JavaScript #WebSecurity #API #FrontendEngineering #CodingChallenge