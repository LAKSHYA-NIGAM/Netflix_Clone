// Modal functionality
class ModalManager {
    constructor() {
        this.modals = {
            auth: document.getElementById('authModal'),
            detail: document.getElementById('detailModal'),
            video: document.getElementById('videoModal')
        };
        
        this.init();
    }

    init() {
        // Close modal when clicking overlay
        Object.values(this.modals).forEach(modal => {
            if (modal) {
                const overlay = modal.querySelector('.modal__overlay');
                const closeBtn = modal.querySelector('.modal__close');
                
                if (overlay) {
                    overlay.addEventListener('click', () => this.closeModal(modal));
                }
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => this.closeModal(modal));
                }
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (typeof modal === 'string') {
            modal = this.modals[modal];
        }
        
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Stop video if closing video modal
            if (modal.id === 'videoModal') {
                const video = modal.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        }
    }

    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            if (modal && modal.classList.contains('active')) {
                this.closeModal(modal);
            }
        });
    }

    showDetailModal(contentId) {
        const content = window.userData.getContentById(contentId);
        if (!content) return;

        const detailContent = document.getElementById('detailContent');
        const isInMyList = window.userData.isInMyList(contentId);
        
        detailContent.innerHTML = `
            <div class="detail-modal__hero">
                <img src="${content.backdrop}" alt="${content.title}" class="detail-modal__hero-img">
                <div class="detail-modal__hero-gradient"></div>
            </div>
            <div class="detail-modal__content">
                <h1 class="detail-modal__title">${content.title}</h1>
                <div class="detail-modal__info">
                    <span class="detail-modal__rating">★ ${content.rating}</span>
                    <span class="detail-modal__year">${content.year}</span>
                    <span class="detail-modal__duration">${content.duration}</span>
                    <span class="detail-modal__genre">${content.genre}</span>
                </div>
                <p class="detail-modal__description">${content.description}</p>
                <div class="detail-modal__actions">
                    <button class="btn btn--primary" onclick="modalManager.playContent(${content.id})">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                        Play
                    </button>
                    <button class="btn btn--icon" onclick="modalManager.toggleMyList(${content.id})" title="${isInMyList ? 'Remove from My List' : 'Add to My List'}">
                        ${isInMyList ? 
                            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
                            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                        }
                    </button>
                    <button class="btn btn--icon" title="Like">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9L7 12V21H17L21 12V9H14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        this.openModal('detail');
    }

    playContent(contentId) {
        // Add to continue watching
        window.userData.addToContinueWatching(contentId, 0);
        
        // Close detail modal if open
        this.closeModal('detail');
        
        // Open video modal
        this.openModal('video');
        
        // Start video
        const video = document.getElementById('videoElement');
        if (video) {
            video.play();
        }
    }

    toggleMyList(contentId) {
        const user = window.userData.getCurrentUser();
        if (!user) {
            window.authManager.showModal();
            return;
        }

        if (window.userData.isInMyList(contentId)) {
            window.userData.removeFromMyList(contentId);
            this.showNotification('Removed from My List');
        } else {
            window.userData.addToMyList(contentId);
            this.showNotification('Added to My List');
        }

        // Update the modal if it's open
        const detailModal = this.modals.detail;
        if (detailModal && detailModal.classList.contains('active')) {
            this.showDetailModal(contentId);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 3000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border: 1px solid #333;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize modal manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});