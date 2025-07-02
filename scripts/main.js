// Main application functionality
class NetflixApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.searchContainer = document.getElementById('searchContainer');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchInput');
        this.profileDropdown = document.getElementById('profileDropdown');
        this.profileMenu = document.getElementById('profileMenu');
        this.signInBtn = document.getElementById('signInBtn');
        this.signOutBtn = document.getElementById('signOutBtn');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        this.heroPlayBtn = document.getElementById('heroPlayBtn');
        this.heroInfoBtn = document.getElementById('heroInfoBtn');
        this.heroListBtn = document.getElementById('heroListBtn');
        
        this.searchTimeout = null;
        this.isSearchActive = false;
        
        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupSearch();
        this.setupHero();
        this.setupEventListeners();
        this.showLoadingSpinner();
        
        // Hide loading spinner after content loads
        setTimeout(() => {
            this.hideLoadingSpinner();
        }, 1500);
    }

    setupNavbar() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Profile dropdown
        if (this.profileDropdown) {
            this.profileDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleProfileMenu();
            });
        }

        // Close profile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.profileDropdown.contains(e.target)) {
                this.closeProfileMenu();
            }
        });

        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    setupSearch() {
        // Search button click
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
                this.toggleSearch();
            });
        }

        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });

            this.searchInput.addEventListener('blur', () => {
                if (!this.searchInput.value.trim()) {
                    this.closeSearch();
                }
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }
    }

    setupHero() {
        // Hero play button
        if (this.heroPlayBtn) {
            this.heroPlayBtn.addEventListener('click', () => {
                window.modalManager.playContent(1); // Stranger Things
            });
        }

        // Hero info button
        if (this.heroInfoBtn) {
            this.heroInfoBtn.addEventListener('click', () => {
                window.modalManager.showDetailModal(1); // Stranger Things
            });
        }

        // Hero list button
        if (this.heroListBtn) {
            this.heroListBtn.addEventListener('click', () => {
                const user = window.userData.getCurrentUser();
                if (!user) {
                    window.authManager.showModal();
                    return;
                }

                const isInList = window.userData.isInMyList(1);
                if (isInList) {
                    window.userData.removeFromMyList(1);
                    this.updateHeroListButton(false);
                    window.modalManager.showNotification('Removed from My List');
                } else {
                    window.userData.addToMyList(1);
                    this.updateHeroListButton(true);
                    window.modalManager.showNotification('Added to My List');
                }
            });
        }

        // Update hero list button state
        this.updateHeroListButton();
    }

    setupEventListeners() {
        // Sign in button
        if (this.signInBtn) {
            this.signInBtn.addEventListener('click', () => {
                window.authManager.showModal();
            });
        }

        // Sign out button
        if (this.signOutBtn) {
            this.signOutBtn.addEventListener('click', () => {
                window.authManager.logout();
                this.closeProfileMenu();
                this.updateHeroListButton();
            });
        }

        // Modal close buttons
        document.getElementById('authModalClose')?.addEventListener('click', () => {
            window.authManager.closeModal();
        });

        document.getElementById('authModalOverlay')?.addEventListener('click', () => {
            window.authManager.closeModal();
        });

        document.getElementById('detailModalClose')?.addEventListener('click', () => {
            window.modalManager.closeModal('detail');
        });

        document.getElementById('detailModalOverlay')?.addEventListener('click', () => {
            window.modalManager.closeModal('detail');
        });

        document.getElementById('videoModalClose')?.addEventListener('click', () => {
            window.modalManager.closeModal('video');
        });

        document.getElementById('videoModalOverlay')?.addEventListener('click', () => {
            window.modalManager.closeModal('video');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Space bar to play/pause video
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                const videoModal = document.getElementById('videoModal');
                if (videoModal && videoModal.classList.contains('active')) {
                    e.preventDefault();
                    const video = document.getElementById('videoElement');
                    if (video) {
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    }
                }
            }

            // F key for fullscreen
            if (e.key === 'f' || e.key === 'F') {
                const videoModal = document.getElementById('videoModal');
                if (videoModal && videoModal.classList.contains('active')) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
            }
        });
    }

    toggleSearch() {
        if (this.isSearchActive) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    }

    openSearch() {
        this.isSearchActive = true;
        this.searchInput.classList.add('active');
        this.searchInput.focus();
    }

    closeSearch() {
        this.isSearchActive = false;
        this.searchInput.classList.remove('active');
        this.searchInput.value = '';
        window.contentManager.clearSearch();
    }

    handleSearchInput(query) {
        // Clear previous timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
            window.contentManager.search(query);
        }, 300);
    }

    toggleProfileMenu() {
        const isActive = this.profileMenu.classList.contains('active');
        if (isActive) {
            this.closeProfileMenu();
        } else {
            this.openProfileMenu();
        }
    }

    openProfileMenu() {
        this.profileDropdown.classList.add('active');
        this.profileMenu.classList.add('active');
    }

    closeProfileMenu() {
        this.profileDropdown.classList.remove('active');
        this.profileMenu.classList.remove('active');
    }

    toggleMobileMenu() {
        // Mobile menu functionality would go here
        console.log('Mobile menu toggle');
    }

    updateHeroListButton(isInList = null) {
        if (!this.heroListBtn) return;

        if (isInList === null) {
            isInList = window.userData.isInMyList(1);
        }

        const icon = this.heroListBtn.querySelector('svg');
        if (isInList) {
            this.heroListBtn.title = 'Remove from My List';
            icon.innerHTML = '<path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        } else {
            this.heroListBtn.title = 'Add to My List';
            icon.innerHTML = '<path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    showLoadingSpinner() {
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.add('active');
        }
    }

    hideLoadingSpinner() {
        if (this.loadingSpinner) {
            this.loadingSpinner.classList.remove('active');
        }
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e50914' : 'rgba(0, 0, 0, 0.9)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.netflixApp = new NetflixApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any playing videos when tab becomes hidden
        const video = document.getElementById('videoElement');
        if (video && !video.paused) {
            video.pause();
        }
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    window.netflixApp?.showNotification('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    window.netflixApp?.showNotification('No internet connection', 'error');
});