document.addEventListener("DOMContentLoaded", () => {
    const userSelections = {};

    // Initialize OpenAI API settings
    const openAiApiUrl = "https://api.openai.com/v1/completions";
    const apiKey = "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";

    // Function to make an API call to OpenAI
    async function callOpenAi(prompt) {
        const response = await fetch(openAiApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    }

    // Function to display the ChatGPT spark icon
    function addSparkIcon(parentElement) {
        const sparkIcon = document.createElement("span");
        sparkIcon.innerHTML = "&#x2728;";  // Unicode for spark emoji
        sparkIcon.className = "spark-icon";
        parentElement.appendChild(sparkIcon);
    }

    // Function to display initial gameplan style selection
    async function showStyleSelection() {
        const questionnaireDiv = document.getElementById("questionnaire");
        questionnaireDiv.innerHTML = "";

        const prompt = "What are the six most common BJJ gameplan styles?";
        const stylesResponse = await callOpenAi(prompt);
        const styles = stylesResponse.split("\n").slice(0, 6);

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

        // Add the "Other" option for a custom gameplan
        const otherDiv = document.createElement("div");
        otherDiv.style.margin = "10px 0";

        const otherLabel = document.createElement("label");
        otherLabel.textContent = "Other: ";

        const otherInput = document.createElement("input");
        otherInput.type = "text";
        otherInput.placeholder = "Enter your own gameplan";
        otherInput.style.marginLeft = "10px";
        otherInput.addEventListener("input", () => {
            userSelections["Other"] = otherInput.value;
        });

        otherDiv.appendChild(otherLabel);
        otherDiv.appendChild(otherInput);
        questionnaireDiv.appendChild(otherDiv);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Next: Focus Levels";
        submitButton.addEventListener("click", () => {
            showFocusSelection();
        });
        questionnaireDiv.appendChild(submitButton);

        // Add the spark icon to indicate ChatGPT was used
        addSparkIcon(questionnaireDiv);
    }

    // Function to display position focus levels
    async function showFocusSelection() {
        document.getElementById("gameplan-description").style.display = "none";
        document.getElementById("focus-level").style.display = "block";

        const focusDiv = document.getElementById("focus-selection");
        focusDiv.innerHTML = "";

        const prompt = "Please provide a list of BJJ positions.";
        const positionsResponse = await callOpenAi(prompt);
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

        // Add the spark icon to indicate ChatGPT was used
        addSparkIcon(focusDiv);
    }

    // Function to display suggested gameplans
    async function showSuggestions() {
        document.getElementById("focus-level").style.display = "none";
        document.getElementById("suggestions").style.display = "block";

        const suggestionsDiv = document.getElementById("suggested-gameplans");
        suggestionsDiv.innerHTML = "Suggested Gameplans based on your selections will be displayed here.";

        const prompt = "Based on the following styles and focus levels, suggest BJJ gameplans: " + JSON.stringify(userSelections);
        const suggestionsResponse = await callOpenAi(prompt);
        const suggestions = suggestionsResponse.split("\n");

        suggestions.forEach(s => {
            const suggestionDiv = document.createElement("div");
            suggestionDiv.style.margin = "10px 0";
            suggestionDiv.textContent = s;
            suggestionsDiv.appendChild(suggestionDiv);
        });

        // Add the spark icon to indicate ChatGPT was used
        addSparkIcon(suggestionsDiv);
    }

    // Initialize the app by showing the style selection
    showStyleSelection();

    // Slide-out tray functionality with Observable chord diagram
    const trayToggle = document.getElementById("tray-toggle");
    const chordTray = document.getElementById("chord-tray");

    trayToggle.addEventListener("click", () => {
        if (chordTray.style.right === "0px") {
            chordTray.style.right = "-400px";
        } else {
            chordTray.style.right = "0px";
        }
    });

    // Embed Observable chord diagram
    document.getElementById("chord-diagram").src = "https://observablehq.com/embed/@ken-chapman/bjjmap?cells=viewof+diagram";
});




