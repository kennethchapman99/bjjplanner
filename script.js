document.addEventListener("DOMContentLoaded", () => {
    const userSelections = {};

    const questions = [
        { category: "Top Game", text: "Do you prefer to dominate from the top position?" },
        { category: "Guard Player", text: "Are you comfortable playing from the bottom, working with various guard positions?" },
        { category: "Lapel Player", text: "Do you incorporate lapel grips and techniques into your game?" },
        { category: "Pressure Passer", text: "Do you prefer to pass the guard with heavy pressure and control?" },
        { category: "Speed Passer", text: "Are you more inclined to use quick, dynamic movements to pass the guard?" },
        { category: "No Gi", text: "Is your focus on No Gi techniques, where grips and movement are different from Gi?" },
    ];

    const questionnaireDiv = document.getElementById("questionnaire");

    questions.forEach(q => {
        const questionDiv = document.createElement("div");
        questionDiv.style.margin = "10px 0";

        const label = document.createElement("label");
        label.textContent = q.text;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginLeft = "10px";
        checkbox.addEventListener("change", () => {
            userSelections[q.category] = checkbox.checked;
        });

        questionDiv.appendChild(label);
        questionDiv.appendChild(checkbox);
        questionnaireDiv.appendChild(questionDiv);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Next: Focus Levels";
    submitButton.addEventListener("click", () => {
        document.getElementById("focus-level").style.display = "block";
        showFocusSelection();
    });
    questionnaireDiv.appendChild(submitButton);

    // Slide-out tray functionality
    const trayToggle = document.getElementById("tray-toggle");
    const chordTray = document.getElementById("chord-tray");

    trayToggle.addEventListener("click", () => {
        if (chordTray.style.right === "0px") {
            chordTray.style.right = "-400px";
        } else {
            chordTray.style.right = "0px";
        }
    });

    // Placeholder function for focus selection
    function showFocusSelection() {
        const focusDiv = document.getElementById("focus-selection");
        focusDiv.innerHTML = "";

        // Example focus selection logic
        const positions = ["Guard", "Mount", "Side Control", "Back Control"];

        positions.forEach(pos => {
            const posDiv = document.createElement("div");
            posDiv.textContent = `How would you rate your focus on ${pos}?`;

            const select = document.createElement("select");
            ["Strength", "Weakness", "Not a Priority"].forEach(level => {
                const opt = document.createElement("option");
                opt.value = level;
                opt.textContent = level;
                select.appendChild(opt);
            });

            posDiv.appendChild(select);
            focusDiv.appendChild(posDiv);
        });

        const focusSubmitButton = document.createElement("button");
        focusSubmitButton.textContent = "Next: See Suggestions";
        focusSubmitButton.addEventListener("click", () => {
            document.getElementById("suggestions").style.display = "block";
            showSuggestions();
        });
        focusDiv.appendChild(focusSubmitButton);
    }

    function showSuggestions() {
        const suggestionsDiv = document.getElementById("suggested-gameplans");
        suggestionsDiv.innerHTML = "Suggested Gameplans based on your selections will be displayed here.";

        // Placeholder logic to display suggestions
    }
});

