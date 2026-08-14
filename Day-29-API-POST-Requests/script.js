/* ========================================== */
/* DAY 29: API POST REQUESTS & PAYLOADS       */
/* ========================================== */


const proposalForm =
    document.getElementById('proposal-form');


const titleInput =
    document.getElementById('initiative-title');


const descInput =
    document.getElementById('initiative-desc');


const submitBtn =
    proposalForm.querySelector('button');


const feedbackMessage =
    document.getElementById('feedback-message');



/* ========================================== */
/* SUBMIT INITIATIVE                          */
/* ========================================== */

async function submitInitiative(dataPayload) {

    /*
     * Disable the button while the request
     * is being processed.
     *
     * This prevents duplicate submissions.
     */

    submitBtn.disabled = true;

    submitBtn.textContent = 'Submitting...';

    feedbackMessage.innerHTML = '';


    try {

        /* ====================================== */
        /* POST REQUEST                           */
        /* ====================================== */

        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {

                /*
                 * HTTP Method
                 */

                method: 'POST',


                /*
                 * Tell the server that we are
                 * sending JSON data.
                 */

                headers: {
                    'Content-type':
                        'application/json; charset=UTF-8'
                },


                /*
                 * Convert our JavaScript object
                 * into a JSON string.
                 */

                body: JSON.stringify(dataPayload)

            }
        );


        /* ====================================== */
        /* CHECK SERVER RESPONSE                  */
        /* ====================================== */

        if (!response.ok) {

            throw new Error(
                `Server rejected the payload. Status: ${response.status}`
            );

        }


        /*
         * Convert the server's JSON response
         * back into a JavaScript object.
         */

        const serverResponse =
            await response.json();


        console.log(
            'Server Confirmation:',
            serverResponse
        );


        /* ====================================== */
        /* SUCCESS MESSAGE                        */
        /* ====================================== */

        feedbackMessage.innerHTML = `
            <p class="success-message">
                ✅ Initiative proposed successfully!
                (ID: ${serverResponse.id})
            </p>
        `;


        /*
         * Clear the form after successful
         * submission.
         */

        proposalForm.reset();


    } catch (error) {

        /* ====================================== */
        /* ERROR HANDLING                         */
        /* ====================================== */

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

        /*
         * Re-enable the button regardless of
         * whether the request succeeded or failed.
         */

        submitBtn.disabled = false;

        submitBtn.textContent = 'Submit Proposal';

    }

}



/* ========================================== */
/* FORM SUBMISSION                            */
/* ========================================== */

if (proposalForm) {

    proposalForm.addEventListener(
        'submit',
        (e) => {

            /*
             * Prevent the browser from
             * refreshing the page.
             */

            e.preventDefault();


            /* ================================== */
            /* GET USER INPUT                     */
            /* ================================== */

            const title =
                titleInput.value.trim();


            const desc =
                descInput.value.trim();


            /* ================================== */
            /* VALIDATE INPUT                    */
            /* ================================== */

            if (
                title === '' ||
                desc === ''
            ) {

                alert(
                    'Please fill out all fields.'
                );

                return;

            }


            /* ================================== */
            /* CREATE PAYLOAD                     */
            /* ================================== */

            const newInitiative = {

                title: title,

                body: desc,

                userId: 1

            };


            console.log(
                'Sending Payload:',
                newInitiative
            );


            /* ================================== */
            /* SEND DATA                           */
            /* ================================== */

            submitInitiative(
                newInitiative
            );

        }
    );

}