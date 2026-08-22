export async function fetchUserData(username) {

    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
        throw new Error("User not found");
    }

    return response.json();
}