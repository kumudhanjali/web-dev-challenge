class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["name", "role"];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute("name") || "Unknown User";
        const role = this.getAttribute("role") || "No role assigned";

        const initials = name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }

                .card {
                    width: 280px;
                    padding: 28px;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #ffffff, #f5f3ff);
                    border: 1px solid #e9e5ff;
                    box-shadow: 0 12px 30px rgba(88, 60, 150, 0.12);
                    text-align: center;
                    font-family: Arial, sans-serif;
                    transition: 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(88, 60, 150, 0.2);
                }

                .avatar {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #7c3aed, #ec4899);
                    color: white;
                    font-size: 26px;
                    font-weight: bold;
                }

                h2 {
                    margin: 0 0 8px;
                    color: #2d1b4e;
                    font-size: 22px;
                }

                p {
                    margin: 0;
                    color: #7c3aed;
                    font-size: 15px;
                    font-weight: 600;
                }

                .line {
                    width: 45px;
                    height: 3px;
                    margin: 18px auto;
                    border-radius: 10px;
                    background: linear-gradient(90deg, #7c3aed, #ec4899);
                }

                .status {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 13px;
                    border-radius: 20px;
                    background: #ecfdf5;
                    color: #059669;
                    font-size: 12px;
                    font-weight: bold;
                }

                .dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #10b981;
                }
            </style>

            <div class="card">
                <div class="avatar">${initials}</div>
                <h2>${name}</h2>
                <p>${role}</p>
                <div class="line"></div>

                <div class="status">
                    <span class="dot"></span>
                    Available
                </div>
            </div>
        `;
    }
}

customElements.define("user-card", UserCard);