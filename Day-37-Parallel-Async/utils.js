export function debounce(callback, delay = 600) {

    let timeoutId;

    return (...args) => {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}