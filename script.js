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
    submitButton.textContent = "Next";
    submitButton.addEventListener("click", () => {
        document.getElementById("focus-selection").style.display = "block";
        showFocusSelection();
    });
    questionnaireDiv.appendChild(submitButton);
});

function showFocusSelection() {
    const focusDiv = document.getElementById("focus-selection");
    focusDiv.innerHTML = "";

    const focusTitle = document.createElement("h3");
    focusTitle.textContent = "Do you want to focus on specific positions or consider everything?";
    focusDiv.appendChild(focusTitle);

    const specificPositionsButton = document.createElement("button");
    specificPositionsButton.textContent = "Focus on Specific Positions";
    specificPositionsButton.addEventListener("click", () => {
        showSuggestions("specificPositions");
    });

    const everythingButton = document.createElement("button");
    everythingButton.textContent = "Consider Everything";
    everythingButton.addEventListener("click", () => {
        showSuggestions("everything");
    });

    focusDiv.appendChild(specificPositionsButton);
    focusDiv.appendChild(everythingButton);
}

function showSuggestions(focus) {
    const suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.style.display = "block";
    suggestionsDiv.innerHTML = "";

    const suggestionTitle = document.createElement("h3");
    suggestionTitle.textContent = "Suggested Techniques";
    suggestionsDiv.appendChild(suggestionTitle);

    // Example suggestions based on focus
    const suggestions = focus === "everything"
        ? ["Technique 1", "Technique 2", "Technique 3"]
        : ["Guard Pass 1", "Guard Pass 2"];

    suggestions.forEach(s => {
        const suggestionDiv = document.createElement("div");
        suggestionDiv.style.margin = "10px 0";
        suggestionDiv.textContent = s;
        suggestionsDiv.appendChild(suggestionDiv);
    });
}
