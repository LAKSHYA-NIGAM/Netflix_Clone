// Content management and display
class ContentManager {
    constructor() {
        this.sliders = {
            trending: document.getElementById('trendingSlider'),
            popular: document.getElementById('popularSlider'),
            drama: document.getElementById('dramaSlider'),
            crime: document.getElementById('crimeSlider'),
            scifi: document.getElementById('scifiSlider')
        };
        
        this.searchResults = [];
        this.init();
    }

    init() {
        this.loadContent();
        this.setupScrollNavigation();
        this.setupLazyLoading();
    }

    loadContent() {
        // Load content for each category
        Object.keys(this.sliders).forEach(category => {
            const slider = this.sliders[category];
            const content = window.mockContent[category];
            
            if (slider && content) {
                this.renderContentRow(slider, content);
            }
        });
    }

    renderContentRow(container, content) {
        container.innerHTML = '';
        
        content.forEach(item => {
            const card = this.createContentCard(item);
            container.appendChild(card);
        });
    }

    createContentCard(content) {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.setAttribute('data-content-id', content.id);
        
        const isInMyList = window.userData.isInMyList(content.id);
        
        card.innerHTML = `
            <img src="${content.image}" alt="${content.title}" class="content-card__image" loading="lazy">
            <div class="content-card__overlay">
                <h3 class="content-card__title">${content.title}</h3>
                <div class="content-card__info">
                    <span class="content-card__rating">★ ${content.rating}</span>
                    <span class="content-card__year">${content.year}</span>
                    <span class="content-card__duration">${content.duration}</span>
                </div>
                <p class="content-card__description">${content.description}</p>
                <div class="content-card__actions">
                    <button class="content-card__action content-card__action--play" onclick="contentManager.playContent(${content.id})" title="Play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                    </button>
                    <button class="content-card__action" onclick="contentManager.toggleMyList(${content.id})" title="${isInMyList ? 'Remove from My List' : 'Add to My List'}">
                        ${isInMyList ? 
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                        }
                    </button>
                    <button class="content-card__action" onclick="contentManager.likeContent(${content.id})" title="Like">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9L7 12V21H17L21 12V9H14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="content-card__action" onclick="modalManager.showDetailModal(${content.id})" title="More Info">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Add click handler for the card itself
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on action buttons
            if (!e.target.closest('.content-card__action')) {
                window.modalManager.showDetailModal(content.id);
            }
        });

        return card;
    }

    setupScrollNavigation() {
        // Setup navigation buttons for each content row
        document.querySelectorAll('.content-row').forEach(row => {
            const slider = row.querySelector('.content-row__slider');
            const leftBtn = row.querySelector('.content-row__nav--left');
            const rightBtn = row.querySelector('.content-row__nav--right');
            
            if (slider && leftBtn && rightBtn) {
                leftBtn.addEventListener('click', () => this.scrollSlider(slider, 'left'));
                rightBtn.addEventListener('click', () => this.scrollSlider(slider, 'right'));
                
                // Update button visibility on scroll
                slider.addEventListener('scroll', () => this.updateScrollButtons(slider, leftBtn, rightBtn));
                
                // Initial button state
                this.updateScrollButtons(slider, leftBtn, rightBtn);
            }
        });
    }

    scrollSlider(slider, direction) {
        const scrollAmount = slider.clientWidth * 0.8;
        const currentScroll = slider.scrollLeft;
        const targetScroll = direction === 'left' 
            ? currentScroll - scrollAmount 
            : currentScroll + scrollAmount;
        
        slider.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    updateScrollButtons(slider, leftBtn, rightBtn) {
        const { scrollLeft, scrollWidth, clientWidth } = slider;
        
        // Show/hide left button
        leftBtn.style.opacity = scrollLeft > 0 ? '1' : '0';
        
        // Show/hide right button
        rightBtn.style.opacity = scrollLeft < scrollWidth - clientWidth - 1 ? '1' : '0';
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    playContent(contentId) {
        window.modalManager.playContent(contentId);
    }

    toggleMyList(contentId) {
        window.modalManager.toggleMyList(contentId);
        
        // Update all cards for this content
        this.updateContentCards(contentId);
    }

    likeContent(contentId) {
        // Simulate like functionality
        window.modalManager.showNotification('Thanks for your feedback!');
    }

    updateContentCards(contentId) {
        // Update all cards that show this content
        const cards = document.querySelectorAll(`[data-content-id="${contentId}"]`);
        const isInMyList = window.userData.isInMyList(contentId);
        
        cards.forEach(card => {
            const myListBtn = card.querySelector('.content-card__action:nth-child(2)');
            if (myListBtn) {
                myListBtn.title = isInMyList ? 'Remove from My List' : 'Add to My List';
                myListBtn.innerHTML = isInMyList ? 
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            }
        });
    }

    search(query) {
        if (!query.trim()) {
            this.clearSearch();
            return;
        }

        this.searchResults = window.userData.searchContent(query);
        this.displaySearchResults();
    }

    displaySearchResults() {
        // Hide regular content rows
        document.querySelectorAll('.content-row').forEach(row => {
            row.style.display = 'none';
        });

        // Create or update search results section
        let searchSection = document.getElementById('searchResults');
        if (!searchSection) {
            searchSection = document.createElement('section');
            searchSection.id = 'searchResults';
            searchSection.className = 'content-row';
            document.querySelector('.content').insertBefore(searchSection, document.querySelector('.content-row'));
        }

        if (this.searchResults.length > 0) {
            searchSection.innerHTML = `
                <h2 class="content-row__title">Search Results</h2>
                <div class="content-row__container">
                    <div class="content-row__slider" id="searchSlider"></div>
                </div>
            `;
            
            const searchSlider = document.getElementById('searchSlider');
            this.renderContentRow(searchSlider, this.searchResults);
        } else {
            searchSection.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <h2 style="color: white; font-size: 24px; margin-bottom: 16px;">No results found</h2>
                    <p style="color: #757575; font-size: 16px;">Try searching for a different title, genre, or keyword.</p>
                </div>
            `;
        }

        searchSection.style.display = 'block';
    }

    clearSearch() {
        // Show regular content rows
        document.querySelectorAll('.content-row').forEach(row => {
            if (row.id !== 'searchResults') {
                row.style.display = 'block';
            }
        });

        // Hide search results
        const searchSection = document.getElementByI('searchResults');
        if (searchSection) {
            searchSection.style.display = 'none';
        }

        this.searchResults = [];
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
});