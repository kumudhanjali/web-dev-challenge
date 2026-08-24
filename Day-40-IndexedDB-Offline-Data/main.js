/* ========================================== */
/* main.js: DAY 40 APPLICATION ENGINE         */
/* ========================================== */


import {

    submitInitiative

} from './api.js';


import {

    getOfflineData

} from './db.js';


/* ========================================== */
/* DOM ELEMENTS                               */
/* ========================================== */

const proposalForm =
    document.getElementById(
        'proposal-form'
    );


const feedbackMessage =
    document.getElementById(
        'feedback-message'
    );


const networkStatus =
    document.getElementById(
        'network-status'
    );


const networkText =
    document.getElementById(
        'network-text'
    );


const offlineList =
    document.getElementById(
        'offline-list'
    );


const proposalCount =
    document.getElementById(
        'proposal-count'
    );


const submitButton =
    document.getElementById(
        'submit-button'
    );


const buttonText =
    document.getElementById(
        'button-text'
    );


/* ========================================== */
/* NETWORK STATUS                             */
/* ========================================== */

function updateNetworkStatus() {

    networkStatus.classList.remove(
        'online',
        'offline'
    );


    if (
        navigator.onLine
    ) {

        networkStatus.classList.add(
            'online'
        );


        networkText.textContent =
            'Online';

    } else {

        networkStatus.classList.add(
            'offline'
        );


        networkText.textContent =
            'Offline';

    }

}


/* ========================================== */
/* FEEDBACK MESSAGE                           */
/* ========================================== */

function showFeedback(
    message,
    type = 'default'
) {

    feedbackMessage.className =
        `feedback-message ${type}`;


    feedbackMessage.innerHTML =
        `
            <span class="feedback-dot"></span>

            <span>
                ${message}
            </span>
        `;

}


/* ========================================== */
/* RENDER OFFLINE DATA                        */
/* BONUS CHALLENGE                            */
/* ========================================== */

async function renderOfflineData() {

    try {

        const proposals =
            await getOfflineData();


        console.log(
            '📦 getOfflineData() result:',
            proposals
        );


        proposalCount.textContent =
            `${proposals.length} ${
                proposals.length === 1
                    ? 'record'
                    : 'records'
            }`;


        if (
            proposals.length === 0
        ) {

            offlineList.innerHTML =
                `
                    <div class="empty-state">

                        <div class="empty-icon">

                            +

                        </div>

                        <p>

                            Nothing waiting yet.

                        </p>

                        <span>

                            Offline submissions will
                            appear here.

                        </span>

                    </div>
                `;


            return;

        }


        offlineList.innerHTML =
            proposals
            .slice()
            .reverse()
            .map(
                (
                    proposal
                ) => {

                    const date =
                        new Date(
                            proposal.savedAt
                        );


                    return `
                        <article class="saved-record">

                            <div class="record-meta">

                                <span>
                                    #${proposal.id}
                                </span>

                                <span>
                                    ${date.toLocaleTimeString(
                                        [],
                                        {
                                            hour:
                                                '2-digit',

                                            minute:
                                                '2-digit'
                                        }
                                    )}
                                </span>

                            </div>

                            <h4>
                                ${escapeHTML(
                                    proposal.title
                                )}
                            </h4>

                            <p>
                                ${escapeHTML(
                                    proposal.body
                                )}
                            </p>

                        </article>
                    `;

                }
            )
            .join('');

    } catch (
        error
    ) {

        console.error(
            'Unable to display IndexedDB data:',
            error
        );

    }

}


/* ========================================== */
/* BASIC HTML ESCAPING                        */
/* ========================================== */

function escapeHTML(
    value
) {

    const element =
        document.createElement(
            'div'
        );


    element.textContent =
        value;


    return element.innerHTML;

}


/* ========================================== */
/* FORM SUBMISSION                            */
/* ========================================== */

if (
    proposalForm
) {

    proposalForm.addEventListener(
        'submit',
        async (
            event
        ) => {

            event.preventDefault();


            const title =
                document.getElementById(
                    'initiative-title'
                ).value.trim();


            const body =
                document.getElementById(
                    'initiative-desc'
                ).value.trim();


            if (
                !title ||
                !body
            ) {

                showFeedback(
                    'Please complete both fields before saving.',
                    'error'
                );


                return;

            }


            const payload =
                {
                    title,
                    body
                };


            submitButton.disabled =
                true;


            buttonText.textContent =
                'Saving...';


            showFeedback(
                navigator.onLine
                    ? 'Sending your proposal to the server...'
                    : 'No connection detected. Preparing local storage...'
            );


            try {

                await submitInitiative(
                    payload
                );


                showFeedback(
                    'Proposal submitted successfully to the server.',
                    'success'
                );


                proposalForm.reset();

            } catch (
                error
            ) {

                if (
                    error.message ===
                    'OFFLINE_SAVED'
                ) {

                    showFeedback(
                        'You are offline. Your proposal is safely stored on this device.',
                        'offline'
                    );


                    proposalForm.reset();


                    await renderOfflineData();

                } else {

                    showFeedback(
                        `Unable to save proposal: ${error.message}`,
                        'error'
                    );

                }

            } finally {

                submitButton.disabled =
                    false;


                buttonText.textContent =
                    'Save proposal';

            }

        }
    );

}


/* ========================================== */
/* ONLINE EVENT                               */
/* BONUS: RECOVER OFFLINE DATA                */
/* ========================================== */

window.addEventListener(
    'online',
    async () => {

        updateNetworkStatus();


        showFeedback(
            'Connection restored. Recovering your offline records...',
            'success'
        );


        await renderOfflineData();


        console.log(
            '🌐 Browser is back online. Offline data has been retrieved.'
        );

    }
);


/* ========================================== */
/* OFFLINE EVENT                              */
/* ========================================== */

window.addEventListener(
    'offline',
    () => {

        updateNetworkStatus();


        showFeedback(
            'Connection lost. New proposals will be stored safely in IndexedDB.',
            'offline'
        );

    }
);


/* ========================================== */
/* INITIALIZE                                 */
/* ========================================== */

window.addEventListener(
    'DOMContentLoaded',
    async () => {

        updateNetworkStatus();


        await renderOfflineData();


        if (
            navigator.onLine
        ) {

            showFeedback(
                'Ready to protect your data.'
            );

        } else {

            showFeedback(
                'You are offline. Your next proposal will be saved locally.',
                'offline'
            );

        }

    }
);