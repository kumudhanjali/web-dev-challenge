export async function fetchDashboardData(username) {

    const safeUsername = username.trim().toLowerCase();


    // ==========================================
    // 1. CREATE ALL REQUESTS AT THE SAME TIME
    // ==========================================

    const profilePromise = fetch(
        `https://api.github.com/users/${safeUsername}`
    );

    const reposPromise = fetch(
        `https://api.github.com/users/${safeUsername}/repos?sort=updated&per_page=3`
    );

    const followersPromise = fetch(
        `https://api.github.com/users/${safeUsername}/followers?per_page=5`
    );


    // ==========================================
    // 2. WAIT FOR ALL REQUESTS
    // ==========================================

    const responses = await Promise.all([

        profilePromise,

        reposPromise,

        followersPromise

    ]);


    // ==========================================
    // 3. CHECK FOR HTTP ERRORS
    // ==========================================

    responses.forEach((response) => {

        if (!response.ok) {

            throw new Error(
                "Something went wrong while fetching the dashboard."
            );

        }

    });


    // ==========================================
    // 4. PARSE ALL JSON RESPONSES IN PARALLEL
    // ==========================================

    const parsedData = await Promise.all(

        responses.map((response) =>
            response.json()
        )

    );


    // ==========================================
    // 5. ARRAY DESTRUCTURING
    // ==========================================

    const [

        profile,

        repos,

        followers

    ] = parsedData;


    // ==========================================
    // 6. RETURN ONE UNIFIED DASHBOARD OBJECT
    // ==========================================

    return {

        profile: profile,

        recentRepos: repos,

        recentFollowers: followers

    };

}