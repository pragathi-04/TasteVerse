// Beginner Mode JavaScript
let selectedIngredients = [];
let currentRecipes = [];
let userProgress = {
    recipesCompleted: 0,
    confidenceLevel: 1,
    currentStep: 1
};

// Initialize beginner mode
function initializeBeginnerMode() {
    // Load saved progress
    const savedProgress = localStorage.getItem('tasteverse_beginner_progress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }
    
    // Initialize toggle switch as active since we're in beginner mode
    const toggleSwitch = document.getElementById('toggleSwitch');
    if (toggleSwitch) {
        toggleSwitch.classList.add('active');
    }
    
    // Update UI based on progress
    updateProgress();
    updateConfidenceMeter();
    
    // Show welcome message for new users
    if (userProgress.recipesCompleted === 0) {
        showWelcomeMessage();
    }
}

// Update progress visualization
function updateProgress() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('completed', 'current');
        
        if (index < userProgress.currentStep) {
            step.classList.add('completed');
        } else if (index === userProgress.currentStep - 1) {
            step.classList.add('current');
        }
    });
}

// Update confidence meter
function updateConfidenceMeter() {
    const meter = document.getElementById('confidenceMeter');
    const label = document.getElementById('confidenceLabel');
    
    if (!meter || !label) return;
    
    const percentage = Math.min((userProgress.recipesCompleted / 5) * 100, 100);
    meter.style.width = percentage + '%';
    
    if (userProgress.recipesCompleted === 0) {
        label.textContent = 'Just starting out';
    } else if (userProgress.recipesCompleted < 3) {
        label.textContent = 'Getting comfortable';
    } else if (userProgress.recipesCompleted < 5) {
        label.textContent = 'Building confidence';
    } else {
        label.textContent = 'Feeling confident!';
    }
}

// Show welcome message for new users
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('Welcome to TasteVerse! 🎉 We\'re excited to help you start your cooking journey!', 'success');
    }, 1000);
}

// Start cooking journey
function startCookingJourney() {
    showNotification('Great choice! Let\'s find you a perfect first recipe! 🍳', 'info');
    scrollToSection('simple-recipe-finder');
}

// Show cooking basics modal
function showCookingBasics() {
    document.getElementById('cookingBasicsModal').style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show recipes by category
function showRecipes(category) {
    const recipes = getBeginnerRecipesByCategory(category);
    displayRecipes(recipes);
    showNotification(`Showing ${category} recipes perfect for beginners! 🍽️`, 'info');
}

// Get beginner recipes by category
function getBeginnerRecipesByCategory(category) {
    const allRecipes = getBeginnerRecipes();
    return allRecipes.filter(recipe => recipe.category === category);
}

// Get all beginner recipes
function getBeginnerRecipes() {
    return [
        {
            id: 1,
            title: 'Perfect Scrambled Eggs',
            description: 'Learn to make the fluffiest scrambled eggs with this simple technique.',
            category: 'breakfast',
            time: '5 minutes',
            difficulty: 'Easy',
            ingredients: [
                { name: 'eggs', amount: '2-3 large', preparation: 'room temperature' },
                { name: 'butter', amount: '1 tablespoon', preparation: 'unsalted' },
                { name: 'salt', amount: '1/4 teaspoon', preparation: 'fine sea salt' },
                { name: 'black pepper', amount: '1/8 teaspoon', preparation: 'freshly ground' },
                { name: 'milk (optional)', amount: '1 tablespoon', preparation: 'whole milk' }
            ],
            equipment: ['Non-stick pan', 'Wooden spoon or spatula', 'Mixing bowl', 'Whisk or fork'],
            steps: [
                {
                    step: 1,
                    instruction: 'Crack 2-3 eggs into a mixing bowl',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Room temperature',
                    technique: 'Crack eggs on flat surface, not edge of bowl',
                    visualCue: 'Eggs should be at room temperature for best results'
                },
                {
                    step: 2,
                    instruction: 'Add 1/4 teaspoon salt and 1/8 teaspoon black pepper',
                    time: '30 seconds',
                    timer: 30,
                    temperature: 'Room temperature',
                    technique: 'Season before cooking for better flavor distribution',
                    visualCue: 'Salt should be fine, pepper freshly ground'
                },
                {
                    step: 3,
                    instruction: 'Add 1 tablespoon milk (optional) and whisk until well combined',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Room temperature',
                    technique: 'Whisk in circular motion until no streaks remain',
                    visualCue: 'Mixture should be uniform yellow color'
                },
                {
                    step: 4,
                    instruction: 'Heat 1 tablespoon butter in non-stick pan over medium-low heat',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Medium-low heat (300°F)',
                    technique: 'Melt butter slowly, don\'t let it brown',
                    visualCue: 'Butter should be melted and foamy, not brown'
                },
                {
                    step: 5,
                    instruction: 'Pour egg mixture into pan and let sit for 30 seconds',
                    time: '30 seconds',
                    timer: 30,
                    temperature: 'Medium-low heat',
                    technique: 'Don\'t stir immediately, let bottom set',
                    visualCue: 'Edges should start to set and look slightly opaque'
                },
                {
                    step: 6,
                    instruction: 'Gently push eggs from edges toward center with spatula',
                    time: '2-3 minutes',
                    timer: 180,
                    temperature: 'Medium-low heat',
                    technique: 'Push, don\'t scramble - let curds form naturally',
                    visualCue: 'Eggs should form soft, creamy curds'
                },
                {
                    step: 7,
                    instruction: 'Remove from heat while still slightly wet and serve immediately',
                    time: '30 seconds',
                    timer: 30,
                    temperature: 'Off heat',
                    technique: 'Residual heat will finish cooking',
                    visualCue: 'Eggs should be creamy, not dry'
                }
            ],
            tips: [
                'Use room temperature eggs for fluffier results',
                'Don\'t over-stir - let curds form naturally',
                'Remove from heat while still slightly wet',
                'Add cheese in step 3 for extra flavor',
                'Serve immediately for best texture'
            ],
            totalTime: '5 minutes',
            prepTime: '2.5 minutes',
            cookTime: '2.5 minutes',
            servingSize: '1-2 people',
            nutritionInfo: 'High protein, low carb, good source of vitamins'
        },
        {
            id: 2,
            title: 'Simple Pasta with Tomato Sauce',
            description: 'A classic pasta dish that\'s perfect for beginners.',
            category: 'lunch',
            time: '20 minutes',
            difficulty: 'Easy',
            ingredients: [
                { name: 'pasta', amount: '8 oz (225g)', preparation: 'spaghetti or penne' },
                { name: 'tomato sauce', amount: '1 can (14 oz)', preparation: 'crushed tomatoes' },
                { name: 'garlic', amount: '3 cloves', preparation: 'minced' },
                { name: 'onion', amount: '1 medium', preparation: 'diced' },
                { name: 'olive oil', amount: '3 tablespoons', preparation: 'extra virgin' },
                { name: 'salt', amount: '1 teaspoon', preparation: 'for pasta water' },
                { name: 'black pepper', amount: '1/4 teaspoon', preparation: 'freshly ground' },
                { name: 'basil', amount: '2 tablespoons', preparation: 'fresh, chopped' },
                { name: 'parmesan cheese', amount: '1/2 cup', preparation: 'grated' }
            ],
            equipment: ['Large pot', 'Large skillet', 'Colander', 'Wooden spoon', 'Chef\'s knife', 'Cutting board'],
            steps: [
                {
                    step: 1,
                    instruction: 'Fill large pot with 4 quarts water and bring to rolling boil',
                    time: '5 minutes',
                    timer: 300,
                    temperature: 'High heat (212°F)',
                    technique: 'Cover pot to speed up boiling process',
                    visualCue: 'Water should be rapidly bubbling with large bubbles'
                },
                {
                    step: 2,
                    instruction: 'Add 1 teaspoon salt to boiling water, then add 8 oz pasta',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'High heat',
                    technique: 'Stir immediately to prevent sticking',
                    visualCue: 'Pasta should be completely submerged in water'
                },
                {
                    step: 3,
                    instruction: 'Cook pasta according to package directions (8-10 minutes)',
                    time: '8-10 minutes',
                    timer: 600,
                    temperature: 'High heat',
                    technique: 'Stir occasionally, test for doneness',
                    visualCue: 'Pasta should be al dente - firm but not hard'
                },
                {
                    step: 4,
                    instruction: 'While pasta cooks, heat 3 tablespoons olive oil in large skillet',
                    time: '2 minutes',
                    timer: 120,
                    temperature: 'Medium heat (350°F)',
                    technique: 'Heat oil until shimmering',
                    visualCue: 'Oil should move easily when pan is tilted'
                },
                {
                    step: 5,
                    instruction: 'Add 1 diced onion and cook until translucent (3-4 minutes)',
                    time: '3-4 minutes',
                    timer: 240,
                    temperature: 'Medium heat',
                    technique: 'Stir frequently, don\'t let it brown',
                    visualCue: 'Onion should be soft and translucent, not brown'
                },
                {
                    step: 6,
                    instruction: 'Add 3 minced garlic cloves and cook for 1 minute',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Medium heat',
                    technique: 'Stir constantly to prevent burning',
                    visualCue: 'Garlic should be fragrant but not brown'
                },
                {
                    step: 7,
                    instruction: 'Add 1 can crushed tomatoes and simmer for 5 minutes',
                    time: '5 minutes',
                    timer: 300,
                    temperature: 'Medium-low heat',
                    technique: 'Stir occasionally, let flavors meld',
                    visualCue: 'Sauce should be slightly thickened and bubbling gently'
                },
                {
                    step: 8,
                    instruction: 'Drain pasta, reserving 1/2 cup pasta water',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Off heat',
                    technique: 'Save starchy water for sauce consistency',
                    visualCue: 'Pasta should be drained but not rinsed'
                },
                {
                    step: 9,
                    instruction: 'Mix pasta with sauce, adding reserved water if needed',
                    time: '2 minutes',
                    timer: 120,
                    temperature: 'Medium heat',
                    technique: 'Toss gently to coat evenly',
                    visualCue: 'Pasta should be evenly coated with sauce'
                },
                {
                    step: 10,
                    instruction: 'Add fresh basil and parmesan cheese, serve immediately',
                    time: '1 minute',
                    timer: 60,
                    temperature: 'Off heat',
                    technique: 'Garnish just before serving',
                    visualCue: 'Dish should be hot and aromatic'
                }
            ],
            tips: [
                'Save pasta water - it helps sauce stick to pasta',
                'Don\'t rinse pasta after draining',
                'Taste and adjust seasoning before serving',
                'Add fresh herbs at the end for best flavor',
                'Serve immediately while hot'
            ],
            totalTime: '20 minutes',
            prepTime: '5 minutes',
            cookTime: '15 minutes',
            servingSize: '4 people',
            nutritionInfo: 'Good source of carbs, lycopene from tomatoes'
        },
        {
            id: 3,
            title: 'Grilled Cheese Sandwich',
            description: 'The ultimate comfort food that\'s impossible to mess up.',
            category: 'lunch',
            time: '10 minutes',
            difficulty: 'Easy',
            ingredients: ['bread', 'cheese', 'butter'],
            steps: [
                {
                    instruction: 'Butter one side of each bread slice',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Place cheese between bread slices (buttered sides out)',
                    time: '1 minute',
                    timer: 60
                },
                {
                    instruction: 'Heat a pan over medium heat',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Place sandwich in pan and cook until golden brown',
                    time: '3-4 minutes',
                    timer: 240
                },
                {
                    instruction: 'Flip sandwich and cook the other side',
                    time: '3-4 minutes',
                    timer: 240
                },
                {
                    instruction: 'Remove from pan and serve immediately',
                    time: '30 seconds',
                    timer: 30
                }
            ],
            tips: ['Use medium heat for even cooking', 'Don\'t rush the process', 'Add extras like ham or tomato'],
            totalTime: '10 minutes',
            prepTime: '3 minutes',
            cookTime: '7 minutes'
        },
        {
            id: 4,
            title: 'Basic Chicken Breast',
            description: 'Learn to cook chicken breast perfectly every time.',
            category: 'dinner',
            time: '25 minutes',
            difficulty: 'Easy',
            ingredients: ['chicken breast', 'salt', 'pepper', 'olive oil'],
            steps: [
                {
                    instruction: 'Pat chicken breast dry and season with salt and pepper',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Heat olive oil in a large pan over medium-high heat',
                    time: '3 minutes',
                    timer: 180
                },
                {
                    instruction: 'Place chicken in pan and cook for 6-7 minutes',
                    time: '6-7 minutes',
                    timer: 420
                },
                {
                    instruction: 'Flip chicken and cook for another 6-7 minutes',
                    time: '6-7 minutes',
                    timer: 420
                },
                {
                    instruction: 'Check internal temperature reaches 165°F',
                    time: '1 minute',
                    timer: 60
                },
                {
                    instruction: 'Remove from pan and let rest for 5 minutes',
                    time: '5 minutes',
                    timer: 300
                },
                {
                    instruction: 'Slice and serve',
                    time: '1 minute',
                    timer: 60
                }
            ],
            tips: ['Use a meat thermometer', 'Don\'t overcook', 'Let it rest for juiciness'],
            totalTime: '25 minutes',
            prepTime: '2 minutes',
            cookTime: '13-15 minutes',
            restTime: '5 minutes'
        },
        {
            id: 5,
            title: 'Chocolate Chip Cookies',
            description: 'Everyone\'s favorite cookie, made simple for beginners.',
            category: 'snacks',
            time: '30 minutes',
            difficulty: 'Easy',
            ingredients: ['flour', 'butter', 'sugar', 'eggs', 'chocolate chips'],
            steps: [
                {
                    instruction: 'Preheat oven to 375°F (190°C)',
                    time: '10 minutes',
                    timer: 600
                },
                {
                    instruction: 'Mix softened butter and sugar until creamy',
                    time: '3 minutes',
                    timer: 180
                },
                {
                    instruction: 'Add eggs one at a time and mix well',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Add flour gradually and mix until combined',
                    time: '3 minutes',
                    timer: 180
                },
                {
                    instruction: 'Fold in chocolate chips gently',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Drop rounded tablespoons onto baking sheet',
                    time: '5 minutes',
                    timer: 300
                },
                {
                    instruction: 'Bake for 9-11 minutes until golden brown',
                    time: '9-11 minutes',
                    timer: 660
                },
                {
                    instruction: 'Let cool on baking sheet for 2 minutes',
                    time: '2 minutes',
                    timer: 120
                }
            ],
            tips: ['Don\'t overmix the dough', 'Let cool on the pan', 'Store in airtight container'],
            totalTime: '30 minutes',
            prepTime: '15 minutes',
            cookTime: '11 minutes',
            coolingTime: '2 minutes'
        },
        {
            id: 6,
            title: 'Simple Salad',
            description: 'A fresh, healthy salad that\'s easy to customize.',
            category: 'lunch',
            time: '15 minutes',
            difficulty: 'Easy',
            ingredients: ['lettuce', 'tomato', 'cucumber', 'olive oil', 'vinegar'],
            steps: [
                {
                    instruction: 'Wash lettuce thoroughly and pat dry',
                    time: '3 minutes',
                    timer: 180
                },
                {
                    instruction: 'Chop lettuce into bite-sized pieces',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Dice tomato into small cubes',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Slice cucumber into thin rounds',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Mix all vegetables in a large bowl',
                    time: '1 minute',
                    timer: 60
                },
                {
                    instruction: 'Make dressing by whisking olive oil and vinegar',
                    time: '2 minutes',
                    timer: 120
                },
                {
                    instruction: 'Toss salad with dressing just before serving',
                    time: '1 minute',
                    timer: 60
                },
                {
                    instruction: 'Serve immediately',
                    time: '30 seconds',
                    timer: 30
                }
            ],
            tips: ['Dry lettuce well', 'Add dressing just before serving', 'Experiment with different vegetables'],
            totalTime: '15 minutes',
            prepTime: '10 minutes',
            cookTime: '0 minutes',
            assemblyTime: '5 minutes'
        }
    ];
}

// Load beginner recipes
function loadBeginnerRecipes() {
    const recipes = getBeginnerRecipes();
    currentRecipes = recipes;
    displayRecipes(recipes.slice(0, 4)); // Show first 4 recipes
}

// Display recipes in grid
function displayRecipes(recipes) {
    const grid = document.getElementById('beginnerRecipeGrid');
    if (!grid) return;
    
    grid.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
            <div class="recipe-image">
                ${getRecipeEmoji(recipe.category)}
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">${recipe.time}</span>
                    <span class="recipe-difficulty">${recipe.difficulty}</span>
                </div>
                <div class="recipe-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); startRecipe(${recipe.id})">
                        <i class="fas fa-play"></i>
                        Start Cooking
                    </button>
                    <button class="btn btn-outline" onclick="event.stopPropagation(); showRecipeDetails(${recipe.id})">
                        <i class="fas fa-info"></i>
                        Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get emoji for recipe category
function getRecipeEmoji(category) {
    const emojis = {
        breakfast: '🌅',
        lunch: '🍽️',
        dinner: '🌙',
        snacks: '🍪'
    };
    return emojis[category] || '🍳';
}

// Show recipe details modal
function showRecipeDetails(recipeId) {
    const recipe = currentRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const modal = document.getElementById('recipeModal');
    const title = document.getElementById('modalRecipeTitle');
    const content = document.getElementById('modalRecipeContent');
    
    title.textContent = recipe.title;
    // Create detailed timing breakdown
    const timingBreakdown = `
        <div class="timing-breakdown">
            <h4>⏱️ Timing Breakdown</h4>
            <div class="timing-grid">
                <div class="timing-item">
                    <span class="timing-label">Total Time:</span>
                    <span class="timing-value">${recipe.totalTime || recipe.time}</span>
                </div>
                ${recipe.prepTime ? `
                <div class="timing-item">
                    <span class="timing-label">Prep Time:</span>
                    <span class="timing-value">${recipe.prepTime}</span>
                </div>
                ` : ''}
                ${recipe.cookTime ? `
                <div class="timing-item">
                    <span class="timing-label">Cook Time:</span>
                    <span class="timing-value">${recipe.cookTime}</span>
                </div>
                ` : ''}
                ${recipe.restTime ? `
                <div class="timing-item">
                    <span class="timing-label">Rest Time:</span>
                    <span class="timing-value">${recipe.restTime}</span>
                </div>
                ` : ''}
                ${recipe.coolingTime ? `
                <div class="timing-item">
                    <span class="timing-label">Cooling Time:</span>
                    <span class="timing-value">${recipe.coolingTime}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    content.innerHTML = `
        <div class="recipe-details">
            <div class="recipe-info">
                <p><strong>Time:</strong> ${recipe.time}</p>
                <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                <p><strong>Category:</strong> ${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</p>
            </div>
            
            ${timingBreakdown}
            
            <h3>📋 Ingredients & Equipment:</h3>
            <div class="ingredients-section">
                <h4>🥄 Ingredients:</h4>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `
                        <li class="ingredient-item">
                            <span class="ingredient-name">${ingredient.name}</span>
                            <span class="ingredient-amount">${ingredient.amount}</span>
                            <span class="ingredient-prep">${ingredient.preparation}</span>
                        </li>
                    `).join('')}
                </ul>
                <h4>🔧 Equipment Needed:</h4>
                <ul class="equipment-list">
                    ${recipe.equipment.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <h3>👨‍🍳 Step-by-Step Instructions:</h3>
            <div class="instructions-detailed">
                ${recipe.steps.map((step, index) => `
                    <div class="instruction-step">
                        <div class="step-header">
                            <span class="step-number">${step.step || index + 1}</span>
                            <span class="step-time">⏱️ ${step.time}</span>
                            <span class="step-temperature">🌡️ ${step.temperature}</span>
                        </div>
                        <p class="step-instruction">${step.instruction}</p>
                        <div class="step-details">
                            <div class="technique-tip">
                                <strong>💡 Technique:</strong> ${step.technique}
                            </div>
                            <div class="visual-cue">
                                <strong>👀 Look for:</strong> ${step.visualCue}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <h3>💡 Pro Tips:</h3>
            <ul class="tips-list">
                ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="startRecipe(${recipe.id}); closeModal('recipeModal')">
                    <i class="fas fa-play"></i>
                    Start Cooking This Recipe
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Start cooking a recipe
function startRecipe(recipeId) {
    const recipe = currentRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    // Update progress
    userProgress.recipesCompleted++;
    if (userProgress.recipesCompleted >= 1 && userProgress.currentStep < 2) {
        userProgress.currentStep = 2;
    }
    if (userProgress.recipesCompleted >= 5 && userProgress.currentStep < 3) {
        userProgress.currentStep = 3;
    }
    
    // Save progress
    localStorage.setItem('tasteverse_beginner_progress', JSON.stringify(userProgress));
    
    // Update UI
    updateProgress();
    updateConfidenceMeter();
    
    // Show success message
    showNotification(`Great job! You've completed ${userProgress.recipesCompleted} recipe${userProgress.recipesCompleted > 1 ? 's' : ''}! 🎉`, 'success');
    
    // Redirect to recipe detail page or show cooking mode
    setTimeout(() => {
        window.location.href = `recipe-detail.html?id=${recipeId}&mode=beginner`;
    }, 1500);
}

// Load more recipes
function loadMoreRecipes() {
    const allRecipes = getBeginnerRecipes();
    const currentCount = document.querySelectorAll('.recipe-card').length;
    const nextRecipes = allRecipes.slice(currentCount, currentCount + 4);
    
    if (nextRecipes.length > 0) {
        const grid = document.getElementById('beginnerRecipeGrid');
        const newCards = nextRecipes.map(recipe => `
            <div class="recipe-card" onclick="showRecipeDetails(${recipe.id})">
                <div class="recipe-image">
                    ${getRecipeEmoji(recipe.category)}
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span class="recipe-time">${recipe.time}</span>
                        <span class="recipe-difficulty">${recipe.difficulty}</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); startRecipe(${recipe.id})">
                            <i class="fas fa-play"></i>
                            Start Cooking
                        </button>
                        <button class="btn btn-outline" onclick="event.stopPropagation(); showRecipeDetails(${recipe.id})">
                            <i class="fas fa-info"></i>
                            Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.insertAdjacentHTML('beforeend', newCards);
        
        if (currentCount + nextRecipes.length >= allRecipes.length) {
            document.querySelector('.load-more').style.display = 'none';
        }
    }
}

// Add ingredient to beginner selection
function addBeginnerIngredient(ingredient) {
    if (!selectedIngredients.includes(ingredient)) {
        selectedIngredients.push(ingredient);
        updateBeginnerIngredientList();
    }
}

// Update beginner ingredient list display
function updateBeginnerIngredientList() {
    const list = document.getElementById('beginnerIngredientList');
    if (!list) return;
    
    if (selectedIngredients.length === 0) {
        list.innerHTML = '<p class="no-ingredients">No ingredients selected yet</p>';
    } else {
        list.innerHTML = selectedIngredients.map(ingredient => `
            <span class="ingredient-tag">
                ${ingredient}
                <button onclick="removeBeginnerIngredient('${ingredient}')">&times;</button>
            </span>
        `).join('');
    }
}

// Remove ingredient from beginner selection
function removeBeginnerIngredient(ingredient) {
    selectedIngredients = selectedIngredients.filter(ing => ing !== ingredient);
    updateBeginnerIngredientList();
}

// Find recipes based on selected ingredients
function findBeginnerRecipes() {
    if (selectedIngredients.length === 0) {
        showNotification('Please select some ingredients first! 🥘', 'warning');
        return;
    }
    
    const allRecipes = getBeginnerRecipes();
    const matchingRecipes = allRecipes.filter(recipe => 
        selectedIngredients.some(ingredient => 
            recipe.ingredients.some(recipeIngredient => 
                recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
            )
        )
    );
    
    if (matchingRecipes.length > 0) {
        displayRecipes(matchingRecipes);
        showNotification(`Found ${matchingRecipes.length} recipe${matchingRecipes.length > 1 ? 's' : ''} with your ingredients! 🎉`, 'success');
    } else {
        showNotification('No recipes found with those ingredients. Try selecting different ones! 🔍', 'info');
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Open chat
function openChat() {
    showNotification('Chat feature coming soon! For now, check out our cooking tips below. 💬', 'info');
}

// Open guide
function openGuide() {
    showCookingBasics();
}

// Open community
function openCommunity() {
    showNotification('Community feature coming soon! Join our newsletter to stay updated. 👥', 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(notificationStyles);

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Toggle beginner mode (for the toggle button)
function toggleBeginnerMode() {
    const body = document.body;
    const toggleSwitch = document.getElementById('toggleSwitch');
    const isCurrentlyActive = body.classList.contains('beginner-mode');

    if (isCurrentlyActive) {
        // Switch to advanced mode
        body.classList.remove('beginner-mode');
        toggleSwitch.classList.remove('active');
        localStorage.setItem('tasteverse_beginner_mode', 'false');
        showNotification('Switched to Advanced Mode! 🚀', 'info');
        
        // Redirect to main index page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        // Already in beginner mode, do nothing
        showNotification('You\'re already in Beginner Mode! 🍳', 'info');
    }
}

// Join challenge function
function joinChallenge() {
    showNotification('Welcome to the Cooking Challenge! 🏆', 'success');
    
    // You can add more challenge functionality here
    // For now, just show a notification
    setTimeout(() => {
        showNotification('Challenge features coming soon! Stay tuned! 🎯', 'info');
    }, 2000);
}
