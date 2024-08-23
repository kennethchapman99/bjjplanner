document.addEventListener("DOMContentLoaded", () => {
    const userSelections = {};

    // Initialize BJJ Mentor API settings
    const bjjMentorApiUrl = "https://api.openai.com/v1/completions"; // Replace with your BJJ Mentor API endpoint
    const apiKey = "YOUR_API_KEY"; // Replace with your BJJ Mentor API key

    // Function to make an API call to BJJ Mentor
    async function callBjjMentor(prompt) {
        const response = await fetch(bjjMentorApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Replace with your customGPT model
                prompt: prompt,
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    }

    // Function to display initial gameplan style selection
    async function showStyleSelection() {
        const questionnaireDiv = document.getElementById("questionnaire");
        questionnaireDiv.innerHTML = "";

        const prompt = "Please provide a list of BJJ gameplan styles to choose from.";
        const stylesResponse = await callBjjMentor(prompt);
        const styles = stylesResponse.split("\n");

        styles.forEach(style => {
            const styleDiv = document.createElement("div");
            styleDiv.style.margin = "10px 0";

            const label = document.createElement("label");
            label.textContent = style;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style.marginLeft = "10px";
            checkbox.addEventListener("change", () => {
                userSelections[style] = checkbox.checked;
            });

            styleDiv.appendChild(label);
            styleDiv.appendChild(checkbox);
            questionnaireDiv.appendChild(styleDiv);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Next: Focus Levels";
        submitButton.addEventListener("click", () => {
            showFocusSelection();
        });
        questionnaireDiv.appendChild(submitButton);
    }

    // Function to display position focus levels
    async function showFocusSelection() {
        document.getElementById("gameplan-description").style.display = "none";
        document.getElementById("focus-level").style.display = "block";

        const focusDiv = document.getElementById("focus-selection");
        focusDiv.innerHTML = "";

        const prompt = "Please provide a list of BJJ positions.";
        const positionsResponse = await callBjjMentor(prompt);
        const positions = positionsResponse.split("\n");

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
            showSuggestions();
        });
        focusDiv.appendChild(focusSubmitButton);
    }

    // Function to display suggested gameplans
    async function showSuggestions() {
        document.getElementById("focus-level").style.display = "none";
        document.getElementById("suggestions").style.display = "block";

        const suggestionsDiv = document.getElementById("suggested-gameplans");
        suggestionsDiv.innerHTML = "Suggested Gameplans based on your selections will be displayed here.";

        const prompt = "Based on the following styles and focus levels, suggest BJJ gameplans: " + JSON.stringify(userSelections);
        const suggestionsResponse = await callBjjMentor(prompt);
        const suggestions = suggestionsResponse.split("\n");

        suggestions.forEach(s => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.style.margin = "10px 0";
            suggestionDiv.textContent = s;
            suggestionsDiv.appendChild(suggestionDiv);
        });
    }

    // Initialize the app by showing the style selection
    showStyleSelection();

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
});


