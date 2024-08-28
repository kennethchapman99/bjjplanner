document.addEventListener("DOMContentLoaded", () => {
    const gameplans = {
        "pressure_player": "Pressure Player",
        "top_game": "Top Game",
        "lapel_guard_sweeps": "Lapel Guard and Sweeps",
        "half_guard_wizard": "Half Guard Wizard",
        "no_gi_specialist": "No Gi Specialist",
        "leg_locker": "Leg Locker",
        "old_man_game": "Old Man Game",
        "speed_athleticism": "Speed and Athleticism"
    };

    const positions = {
        "pressure_player": ["Side Control", "Mount"],
        "top_game": ["Mount", "Side Control", "Knee on Belly"],
        "lapel_guard_sweeps": ["Closed Guard", "Spider Guard"],
        "half_guard_wizard": ["Half Guard"],
        "no_gi_specialist": ["Butterfly Guard", "Single Leg X"],
        "leg_locker": ["Ashigurami", "Single Leg X"],
        "old_man_game": ["Closed Guard", "Mount"],
        "speed_athleticism": ["De La Riva", "X Guard"]
    };

    const techniques = {
        "pressure_player": [
            {"position": "Side Control", "technique": "Knee on Belly", "video": "https://vimeo.com/example1"},
            {"position": "Mount", "technique": "Cross Collar Choke", "video": "https://vimeo.com/example2"}
        ],
        "top_game": [
            {"position": "Mount", "technique": "Armbar from Mount", "video": "https://vimeo.com/example3"},
            {"position": "Side Control", "technique": "Americana", "video": "https://vimeo.com/example4"}
        ]
        // Add more techniques for other gameplans...
    };

    const feedbackResponses = {
        "pressure_player": "Consider adding some advanced transitions from Side Control.",
        "top_game": "Try adding some submissions from Knee on Belly."
        // Add more feedback responses for other gameplans...
    };

    function showPositionFocus() {
        document.getElementById("gameplan-selection").style.display = "none";
        document.getElementById("position-focus").style.display = "block";
        const selectedGameplans = getSelectedGameplans();
        const positionsDiv = document.getElementById("positions");
        positionsDiv.innerHTML = "";

        selectedGameplans.forEach(gameplan => {
            const positionsList = positions[gameplan] || [];
            positionsList.forEach(position => {
                positionsDiv.innerHTML += `<div><strong>${position}</strong><br>
                    <label><input type="radio" name="${position}" value="strength"> Strength</label>
                    <label><input type="radio" name="${position}" value="weakness"> Weakness</label>
                    <label><input type="radio" name="${position}" value="not_priority"> Not a Priority</label>
                    </div>`;
            });
        });
    }

    function showSuggestions() {
        document.getElementById("position-focus").style.display = "none";
        document.getElementById("suggestions").style.display = "block";
        const selectedGameplans = getSelectedGameplans();
        const techniquesDiv = document.getElementById("techniques");
        techniquesDiv.innerHTML = "";

        selectedGameplans.forEach(gameplan => {
            const techniquesList = techniques[gameplan] || [];
            techniquesList.forEach(tech => {
                techniquesDiv.innerHTML += `<div><strong>${tech.position}:</strong> ${tech.technique} 
                    <a href="${tech.video}" target="_blank">Watch Video</a></div>`;
            });
        });
    }

    function showFeedback() {
        document.getElementById("suggestions").style.display = "none";
        document.getElementById("feedback").style.display = "block";
    }

    function updateGameplan() {
        const feedbackInput = document.getElementById("feedback-input").value;
        const selectedGameplans = getSelectedGameplans();
        let feedbackMessage = "";

        selectedGameplans.forEach(gameplan => {
            feedbackMessage += `${gameplans[gameplan]}: ${feedbackResponses[gameplan]} <br>`;
        });

        feedbackMessage += `<br> Your Feedback: ${feedbackInput}`;
        alert(feedbackMessage);
    }

    function getSelectedGameplans() {
        const form = document.getElementById("gameplan-form");
        return Array.from(form.elements)
            .filter(el => el.checked)
            .map(el => el.value);
    }

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










