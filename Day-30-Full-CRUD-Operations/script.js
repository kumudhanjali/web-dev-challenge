/* ========================================== */
/* DAY 30: COMPLETING THE CYCLE               */
/* PUT & DELETE REQUESTS                      */
/* ========================================== */


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const proposalForm =
    document.getElementById('proposal-form');


const titleInput =
    document.getElementById('initiative-title');


const descInput =
    document.getElementById('initiative-desc');


const submitBtn =
    document.getElementById('submit-btn');


const feedbackMessage =
    document.getElementById('feedback-message');


const updateBtn =
    document.getElementById('update-btn');


const deleteBtn =
    document.getElementById('delete-btn');


const manageFeedback =
    document.getElementById('manage-feedback');


/*
 * The README specifically asks us to
 * hardcode an ID such as 1 for testing.
 */

const TEST_ID = 1;


/* ========================================== */
/* POST — CREATE INITIATIVE                   */
/* ========================================== */

async function submitInitiative(dataPayload) {

    submitBtn.disabled = true;

    submitBtn.textContent = 'Submitting...';

    feedbackMessage.innerHTML = '';


    try {

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {

                method: 'POST',

                headers: {
                    'Content-type':
                        'application/json; charset=UTF-8'
                },

                body: JSON.stringify(dataPayload)

            }
        );


        if (!response.ok) {

            throw new Error(
                `Server rejected the request. Status: ${response.status}`
            );

        }


        const serverResponse =
            await response.json();


        console.log(
            'POST — Initiative Created:',
            serverResponse
        );


        feedbackMessage.innerHTML = `
            <p class="success-message">
                ✅ Initiative created successfully!
                (ID: ${serverResponse.id})
            </p>
        `;


        proposalForm.reset();


    } catch (error) {

        console.error(
            'POST Error:',
            error
        );


        feedbackMessage.innerHTML = `
            <p class="error-message">
                ⚠️ ${error.message}
            </p>
        `;

    } finally {

        submitBtn.disabled = false;

        submitBtn.textContent = 'Submit Proposal';

    }

}


/* ========================================== */
/* PUT — UPDATE INITIATIVE                   */
/* ========================================== */

async function updateInitiative(id) {

    manageFeedback.innerHTML = '';


    /*
     * PUT replaces the complete resource,
     * so we provide the full updated object.
     */

    const updatedData = {

        id: id,

        title: 'Campus Coding Club [UPDATED]',

        body:
            'This initiative description has been updated using a PUT request.',

        userId: 1

    };


    try {

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/' + id,
            {

                /*
                 * HTTP method required by
                 * the Day 30 README.
                 */

                method: 'PUT',


                /*
                 * Standard JSON headers.
                 */

                headers: {
                    'Content-type':
                        'application/json; charset=UTF-8'
                },


                /*
                 * Convert the JavaScript object
                 * into JSON.
                 */

                body: JSON.stringify(updatedData)

            }
        );


        if (!response.ok) {

            throw new Error(
                `Update failed. Status: ${response.status}`
            );

        }


        /*
         * JSONPlaceholder returns the
         * modified object.
         */

        const serverResponse =
            await response.json();


        /*
         * IMPORTANT:
         * This console output is the evidence
         * requested by the README.
         */

        console.log(
            'PUT — Initiative Updated Successfully:',
            serverResponse
        );


        manageFeedback.innerHTML = `
            <p class="success-message">
                ✅ Proposal #${id} updated successfully!
            </p>
        `;


    } catch (error) {

        console.error(
            'PUT Error:',
            error
        );


        manageFeedback.innerHTML = `
            <p class="error-message">
                ⚠️ ${error.message}
            </p>
        `;

    }

}


/* ========================================== */
/* DELETE — DESTROY INITIATIVE               */
/* ========================================== */

async function deleteInitiative(id) {

    manageFeedback.innerHTML = '';


    try {

        /*
         * DELETE does NOT need headers
         * or a request body.
         */

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts/' + id,
            {

                method: 'DELETE'

            }
        );


        if (!response.ok) {

            throw new Error(
                `Delete failed. Status: ${response.status}`
            );

        }


        /*
         * JSONPlaceholder returns an empty
         * object for a successful DELETE.
         */

        const serverResponse =
            await response.json();


        /*
         * README specifically asks us
         * to log a success message.
         */

        console.log(
            'DELETE — Initiative Deleted Successfully:',
            serverResponse
        );


        manageFeedback.innerHTML = `
            <p class="success-message">
                ✅ Proposal #${id} deleted successfully!
            </p>
        `;


    } catch (error) {

        console.error(
            'DELETE Error:',
            error
        );


        manageFeedback.innerHTML = `
            <p class="error-message">
                ⚠️ ${error.message}
            </p>
        `;

    }

}


/* ========================================== */
/* PROPOSAL FORM EVENT                        */
/* ========================================== */

proposalForm.addEventListener(
    'submit',
    (event) => {

        /*
         * Prevent the browser from
         * refreshing the page.
         */

        event.preventDefault();


        const title =
            titleInput.value.trim();


        const description =
            descInput.value.trim();


        /*
         * Basic validation.
         */

        if (
            title === '' ||
            description === ''
        ) {

            feedbackMessage.innerHTML = `
                <p class="error-message">
                    ⚠️ Please fill out all fields.
                </p>
            `;

            return;

        }


        /*
         * Create the POST payload.
         */

        const newInitiative = {

            title: title,

            body: description,

            userId: 1

        };


        console.log(
            'POST — Sending Payload:',
            newInitiative
        );


        submitInitiative(
            newInitiative
        );

    }
);


/* ========================================== */
/* UPDATE BUTTON EVENT                        */
/* ========================================== */

updateBtn.addEventListener(
    'click',
    () => {

        /*
         * The README asks us to hardcode
         * an ID such as 1.
         */

        updateInitiative(
            TEST_ID
        );

    }
);


/* ========================================== */
/* DELETE BUTTON EVENT                        */
/* ========================================== */

deleteBtn.addEventListener(
    'click',
    () => {

        /*
         * BONUS CHALLENGE:
         * Never delete without asking first.
         */

        const confirmed =
            window.confirm(
                'Are you sure you want to delete this initiative? This action cannot be undone.'
            );


        /*
         * Only execute DELETE if the
         * user clicks "OK".
         */

        if (confirmed) {

            deleteInitiative(
                TEST_ID
            );

        } else {

            console.log(
                'DELETE — User cancelled the deletion.'
            );

        }

    }
);