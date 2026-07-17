# 🗺️ Instructions: How to Execute This Challenge

Welcome to the 50-Day Web Development Challenge. This is not a standard tutorial where you blindly copy code. This is a rigorous engineering gauntlet designed to teach you how the web actually works beneath the frameworks.

If you are completely new to Git, GitHub, or writing code locally on your computer, do not worry. This document will walk you through exactly how to set up your system and execute your daily tasks.

---

## 🛠️ Phase 1: First-Time System Setup (Do this once)

To write code like a professional engineer, you need to work locally on your computer, not just in a browser.

**Step 1: Install Your Tools**
1. Download and install **[Visual Studio Code (VS Code)](https://code.visualstudio.com/)**. This is the industry-standard text editor where you will write your code.
2. Download and install **[Git](https://git-scm.com/)**. This is the version control system that tracks changes to your code and connects your computer to GitHub. *(Windows users: Just click "Next" through the default installation settings).*

**Step 2: Create Your Master Repository on GitHub**
You will not create 50 different repositories. You will maintain ONE single timeline of your progress.
1. Log in to [GitHub](https://github.com/).
2. Click the **+** icon in the top right and select **New repository**.
3. Name it `50-Days-Web-Challenge`.
4. Set it to **Public** (so you can showcase your work).
5. Check the box that says **Add a README file** (Crucial!).
6. Click **Create repository**.

**Step 3: Bring the Repository to Your Local Computer**
Now, we need to connect that GitHub repository to your physical computer.
1. On your new GitHub repository page, click the green **<> Code** button and copy the HTTPS URL (e.g., `https://github.com/YourUsername/50-Days-Web-Challenge.git`).
2. Open **VS Code** on your computer.
3. Click on **Terminal** in the top menu bar, then select **New Terminal** (a command window will open at the bottom).
4. In the terminal, type `git clone` followed by a space, and paste your URL. It should look like this:
   `git clone https://github.com/YourUsername/50-Days-Web-Challenge.git`
5. Press **Enter**. Git will download the folder to your computer!
6. In VS Code, click **File > Open Folder** and select the newly downloaded `50-Days-Web-Challenge` folder. You are now ready to code.

---

## 📅 Phase 2: The Daily Workflow (Do this every day)

Every day, a new task will be published in the **50-Days-Dev-Challenge Repository**. Here is how you complete it:

**Step 1: Find the Daily Task**
* Open your web browser and navigate to the official 50-Days-Dev-Challenge Repository.
* Click on the folder for that specific day (e.g., `Day-01`).
* Read the `README.md` file inside. It contains the **Problem Statement**, the **Task Requirements**, and the **Core Concepts** you need to learn.
* Keep an eye on the supporter files given on each day that helps you get started with the task of the day.
* *Read the provided documentation links before you write a single line of code.*

**Step 2: Build the Solution Locally**
* Open your personal `50-Days-Web-Challenge` folder in **VS Code**.
* Right-click in the file explorer panel on the left and create a new folder named for the current day (e.g., `Day-01`).
* Inside that folder, create your files (e.g., `index.html`, `style.css`, `main.js`).
* Write your code to solve the daily task. 

**Step 3: Document Your Work**
* Inside every daily folder, you must create your own `README.md` file. 
* Write a brief summary explaining what you built, the concepts you learned, and how it works. This acts as your personal engineering log.

**Step 4: Save and Push to GitHub (The Git Cycle)**
Once your code is working, you need to send it back up to your GitHub repository so it is saved and visible to the world. Open your VS Code Terminal and run these three commands in order:

1. **Stage the changes:** 
   `git add .`
   *(This tells Git to prepare ALL new and modified files to be saved. Don't forget the period `.` at the end!)*

2. **Commit the changes:** 
   `git commit -m "Day 1: Built responsive layout"`
   *(This officially saves a snapshot of your code. Make a habit of writing proper, descriptive commit messages. Never just write "update".)*

3. **Push to GitHub:** 
   `git push`
   *(This uploads your saved snapshot to your live GitHub repository online.)*

---

## 🤖 Phase 3: How to Use AI Effectively

You are encouraged to use AI (like ChatGPT, Gemini, or Claude), but **do not use it as a ghostwriter.** If you blindly copy and paste the final solution, you will fail the final Capstone Project. 

* **Use AI as a Tutor:** If a concept like "Service Workers" confuses you, prompt the AI: *"Explain Service Workers to me using a simple analogy, and provide a basic code example."*
* **Ask for Debugging, Not Answers:** If your code breaks, paste it into the AI and ask, *"Why is this throwing an error?"* Understand the 'why' before fixing it.
* **Simplify Tasks:** If a daily task feels too complex, ask the AI to break it down into three smaller, manageable steps.

---

## 🏗️ The Core Engineering Philosophy

As you progress, you will notice we do not use massive libraries. We focus heavily on native browser APIs, vanilla JavaScript, and foundational protocols. 

**Standard, not a trend. The logic, not a language.** 

Frameworks come and go, but the underlying architecture of the web remains the same. By the end of this challenge, you won't just know how to write a script—you will understand system architecture, data flow, memory management, and network resilience. Focus on the architecture, and the code will follow.
