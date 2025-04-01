document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score-display');
    const matchComment = document.getElementById('match-comment');
    
    // Comments for different score ranges
    const comments = {
        terrible: [
            "Yikes! You two might want to see other people.",
            "The stars are not aligned for this match.",
            "Maybe you're better off as strangers.",
            "This match is like oil and water - they don't mix!",
            "You'd better leave this relationship before it starts."
        ],
        poor: [
            "There's some friction here. Proceed with caution.",
            "You might need to work extra hard on this relationship.",
            "Not the worst, but definitely challenging.",
            "You'll need a lot of patience with each other.",
            "This relationship might be more work than fun."
        ],
        average: [
            "You have a decent foundation to build on.",
            "With some effort, this could work out.",
            "Not bad! You have potential together.",
            "You're compatible in some ways, different in others.",
            "An ordinary match with ordinary challenges."
        ],
        good: [
            "You two have great chemistry!",
            "This relationship has real potential!",
            "You complement each other well.",
            "You'll bring out the best in each other.",
            "This match has a bright future ahead!"
        ],
        perfect: [
            "You two are perfect for each other!",
            "A match made in heaven!",
            "Soul mates found! This is the real deal.",
            "The universe created you two to be together!",
            "This is what true love looks like!"
        ]
    };
    
    calculateBtn.addEventListener('click', function() {
        // Get the names
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();
        
        // Validate inputs
        if (name1 === '' || name2 === '') {
            alert('Please enter both names!');
            return;
        }
        
        // Calculate match percentage (random but deterministic based on names)
        const score = calculateMatchScore(name1, name2);
        
        // Get appropriate comment based on score
        const comment = getMatchComment(score);
        
        // Display results
        scoreDisplay.textContent = `${score}%`;
        matchComment.textContent = comment;
        resultContainer.style.display = 'block';
        
        // Add some animation
        scoreDisplay.classList.add('pulse');
        setTimeout(() => {
            scoreDisplay.classList.remove('pulse');
        }, 1000);
    });
    
    function calculateMatchScore(name1, name2) {
        // This creates a deterministic but seemingly random score based on the names
        const combinedNames = name1.toLowerCase() + name2.toLowerCase();
        let hash = 0;
        
        for (let i = 0; i < combinedNames.length; i++) {
            hash = ((hash << 5) - hash) + combinedNames.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        // Use the hash to generate a number between 1-100
        const score = Math.abs(hash % 100) + 1;
        return score;
    }
    
    function getMatchComment(score) {
        let category;
        
        if (score < 20) {
            category = 'terrible';
        } else if (score < 40) {
            category = 'poor';
        } else if (score < 60) {
            category = 'average';
        } else if (score < 80) {
            category = 'good';
        } else {
            category = 'perfect';
        }
        
        // Get a random comment from the appropriate category
        const categoryComments = comments[category];
        const randomIndex = Math.floor(Math.random() * categoryComments.length);
        return categoryComments[randomIndex];
    }
});