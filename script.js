// Advanced Features System
class TasteVerseFeatures {
    constructor() {
        this.userProfile = this.loadUserProfile();
        this.pantry = this.loadPantry();
        this.achievements = this.loadAchievements();
        this.offlineRecipes = this.loadOfflineRecipes();
    }

    // User Profile Management
    loadUserProfile() {
        return JSON.parse(localStorage.getItem('tasteverse_profile') || JSON.stringify({
            name: 'Guest User',
            level: 1,
            points: 0,
            badges: [],
            preferences: {
                allergies: [],
                dietaryRestrictions: [],
                skillLevel: 'beginner',
                culturalPreferences: [],
                sustainabilityMode: false
            },
            stats: {
                recipesCooked: 0,
                recipesShared: 0,
                ingredientsScanned: 0,
                collaborativeSessions: 0
            }
        }));
    }

    saveUserProfile() {
        localStorage.setItem('tasteverse_profile', JSON.stringify(this.userProfile));
    }

    // Pantry Management
    loadPantry() {
        return JSON.parse(localStorage.getItem('tasteverse_pantry') || '[]');
    }

    savePantry() {
        localStorage.setItem('tasteverse_pantry', JSON.stringify(this.pantry));
    }

    addToPantry(ingredient) {
        const existing = this.pantry.find(item => item.id === ingredient.id);
        if (existing) {
            existing.quantity += ingredient.quantity || 1;
            existing.lastUpdated = new Date().toISOString();
        } else {
            this.pantry.push({
                ...ingredient,
                addedDate: new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            });
        }
        this.savePantry();
        this.updatePantryUI();
    }

    // Barcode Scanner Simulation
    async scanBarcode() {
        try {
            const mockBarcodeData = {
                id: 'barcode_' + Date.now(),
                name: 'Organic Tomatoes',
                category: 'Vegetables',
                quantity: 1,
                unit: 'kg',
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                nutritionalInfo: {
                    calories: 18,
                    protein: 0.9,
                    carbs: 3.9,
                    fat: 0.2
                }
            };

            this.addToPantry(mockBarcodeData);
            this.showNotification('Ingredient scanned and added to pantry!', 'success');
            this.awardPoints(10);
            
            return mockBarcodeData;
        } catch (error) {
            this.showNotification('Barcode scanning failed. Please try again.', 'error');
            throw error;
        }
    }

    // Gamification System
    loadAchievements() {
        return JSON.parse(localStorage.getItem('tasteverse_achievements') || '[]');
    }

    awardPoints(points) {
        this.userProfile.points += points;
        this.userProfile.level = Math.floor(this.userProfile.points / 100) + 1;
        this.saveUserProfile();
        this.updateGamificationUI();
        this.checkAchievements();
    }

    checkAchievements() {
        const newAchievements = [];
        
        if (this.userProfile.stats.recipesCooked === 1 && !this.hasAchievement('first_recipe')) {
            newAchievements.push({
                id: 'first_recipe',
                name: 'First Steps',
                description: 'Cooked your first recipe!',
                icon: 'fas fa-baby',
                points: 50
            });
        }

        if (this.userProfile.stats.ingredientsScanned >= 10 && !this.hasAchievement('scanner_master')) {
            newAchievements.push({
                id: 'scanner_master',
                name: 'Scanner Master',
                description: 'Scanned 10 ingredients',
                icon: 'fas fa-barcode',
                points: 100
            });
        }

        newAchievements.forEach(achievement => {
            this.userProfile.badges.push(achievement);
            this.showNotification(`Achievement Unlocked: ${achievement.name}!`, 'success');
        });

        if (newAchievements.length > 0) {
            this.saveUserProfile();
        }
    }

    hasAchievement(achievementId) {
        return this.userProfile.badges.some(badge => badge.id === achievementId);
    }

    // Collaborative Cooking
    startCollaborativeSession() {
        const sessionId = 'session_' + Date.now();
        const session = {
            id: sessionId,
            participants: [this.userProfile.name],
            recipe: null,
            status: 'waiting',
            chat: [],
            videoEnabled: false,
            startTime: new Date().toISOString()
        };

        localStorage.setItem('tasteverse_session_' + sessionId, JSON.stringify(session));
        this.showNotification('Collaborative cooking session started!', 'success');
        return sessionId;
    }

    // Offline Mode
    loadOfflineRecipes() {
        return JSON.parse(localStorage.getItem('tasteverse_offline_recipes') || '[]');
    }

    downloadRecipe(recipe) {
        const offlineRecipe = {
            ...recipe,
            downloadedAt: new Date().toISOString(),
            offline: true
        };

        this.offlineRecipes.push(offlineRecipe);
        localStorage.setItem('tasteverse_offline_recipes', JSON.stringify(this.offlineRecipes));
        this.showNotification('Recipe downloaded for offline use!', 'success');
    }

    // Smart Purchasing Integration
    async orderIngredients(missingIngredients) {
        this.showNotification('Redirecting to Blinkit for ingredient purchase...', 'info');
        
        setTimeout(() => {
            this.showNotification('Order placed successfully!', 'success');
        }, 2000);
    }

    // Allergy & Dietary Management
    checkAllergies(recipe) {
        const userAllergies = this.userProfile.preferences.allergies;
        const warnings = [];

        recipe.ingredients.forEach(ingredient => {
            if (userAllergies.some(allergy => 
                ingredient.name.toLowerCase().includes(allergy.toLowerCase())
            )) {
                warnings.push({
                    ingredient: ingredient.name,
                    allergy: userAllergies.find(a => 
                        ingredient.name.toLowerCase().includes(a.toLowerCase())
                    )
                });
            }
        });

        return warnings;
    }

    // UI Updates
    updatePantryUI() {
        const pantryCount = document.getElementById('pantryCount');
        if (pantryCount) {
            pantryCount.textContent = this.pantry.length;
        }
    }

    updateGamificationUI() {
        const levelDisplay = document.getElementById('userLevel');
        const pointsDisplay = document.getElementById('userPoints');
        
        if (levelDisplay) levelDisplay.textContent = this.userProfile.level;
        if (pointsDisplay) pointsDisplay.textContent = this.userProfile.points;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize features system
const tasteVerseFeatures = new TasteVerseFeatures();

// Mock Data - Simple Recipe Collection
const mockRecipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        description: "A traditional Italian pasta dish with eggs, cheese, and pancetta.",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: "Medium",
        rating: 4.8,
        reviewCount: 124,
        author: {
            name: "Marco Rossi",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Italian", "Pasta", "Quick"],
        category: "italian"
    },
    {
        id: 2,
        title: "Chicken Teriyaki Bowl",
        description: "Delicious Japanese-inspired chicken with homemade teriyaki sauce.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 20,
        cookTime: 25,
        servings: 2,
        difficulty: "Easy",
        rating: 4.6,
        reviewCount: 89,
        author: {
            name: "Yuki Tanaka",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Asian", "Chicken", "Healthy"],
        category: "asian"
    },
    {
        id: 3,
        title: "Chocolate Lava Cake",
        description: "Decadent molten chocolate cake with a gooey center.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 30,
        cookTime: 15,
        servings: 4,
        difficulty: "Hard",
        rating: 4.9,
        reviewCount: 156,
        author: {
            name: "Sophie Martin",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Dessert", "Chocolate", "Baking"],
        category: "desserts"
    },
    {
        id: 4,
        title: "Fish Tacos with Mango Salsa",
        description: "Fresh fish tacos topped with homemade mango salsa and cabbage slaw.",
        image: "https://images.unsplash.com/photo-1565299585323-38174c4aab9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 25,
        cookTime: 15,
        servings: 4,
        difficulty: "Medium",
        rating: 4.7,
        reviewCount: 92,
        author: {
            name: "Carlos Mendez",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Mexican", "Seafood", "Fresh"],
        category: "mexican"
    },
    {
        id: 5,
        title: "Quinoa Buddha Bowl",
        description: "Nutritious bowl packed with quinoa, roasted vegetables, and tahini dressing.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 20,
        cookTime: 30,
        servings: 2,
        difficulty: "Easy",
        rating: 4.5,
        reviewCount: 67,
        author: {
            name: "Emma Green",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Healthy", "Vegan", "Quinoa"],
        category: "healthy"
    },
    {
        id: 6,
        title: "15-Minute Pasta Aglio e Olio",
        description: "Simple yet flavorful pasta with garlic, olive oil, and red pepper flakes.",
        image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        difficulty: "Easy",
        rating: 4.4,
        reviewCount: 78,
        author: {
            name: "Antonio Silva",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
        },
        tags: ["Italian", "Quick", "Simple"],
        category: "quick"
    }
];

// Global State
let currentUser = null;
let filteredRecipes = [...mockRecipes];

// DOM Elements
const searchInput = document.getElementById('searchInput');

// Initialize App
function initializeApp() {
    setupEventListeners();
    loadRecipes();
}

// Event Listeners
function setupEventListeners() {
    // Search functionality - only for pages with recipeGrid
    if (searchInput && document.getElementById('recipeGrid')) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Search button - only for pages with recipeGrid
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn && document.getElementById('recipeGrid')) {
        searchBtn.addEventListener('click', handleSearch);
    }
}

// Search Handler
function handleSearch(e) {
    const searchBtn = document.querySelector('.search-btn');
    const query = e.target.value.toLowerCase();
    
    // Add loading state
    if (searchBtn) {
        searchBtn.classList.add('loading');
        searchBtn.innerHTML = '<i class="fas fa-spinner"></i> Searching...';
    }
    
    // Simulate search delay for better UX
    setTimeout(() => {
        filteredRecipes = mockRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.author.name.toLowerCase().includes(query)
        );
        loadRecipes();
        
        // Remove loading state
        if (searchBtn) {
            searchBtn.classList.remove('loading');
            searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
        }
    }, 300);
}

// Load Recipes
function loadRecipes() {
    const recipeGrid = document.getElementById('recipeGrid');
    if (!recipeGrid) return;

    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No recipes found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    recipeGrid.innerHTML = filteredRecipes.map(recipe => `
        <div class="recipe-card" data-id="${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime + recipe.cookTime} min</span>
                    <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                    <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-footer">
                    <div class="recipe-rating">
                        <div class="stars">
                            ${generateStars(recipe.rating)}
                        </div>
                        <span>${recipe.rating}</span>
                    </div>
                    <div class="recipe-author">
                        <img src="${recipe.author.avatar}" alt="${recipe.author.name}" class="author-avatar">
                        <span>${recipe.author.name}</span>
                    </div>
                    <button class="action-btn" onclick="toggleFavorite(${recipe.id})">
                        <i class="far fa-heart"></i>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate Stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Toggle Favorite
function toggleFavorite(recipeId) {
    const recipe = mockRecipes.find(r => r.id === recipeId);
    if (recipe) {
        console.log('Toggled favorite for:', recipe.title);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for use in other pages
window.mockRecipes = mockRecipes;
window.loadRecipes = loadRecipes;
window.toggleFavorite = toggleFavorite;
