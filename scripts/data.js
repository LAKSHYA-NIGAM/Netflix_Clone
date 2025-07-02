// Mock data for Netflix content
const mockContent = {
    trending: [
        {
            id: 1,
            title: "Stranger Things",
            description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
            image: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.7,
            year: 2016,
            duration: "4 Seasons",
            genre: "Sci-Fi, Drama, Horror",
            type: "series"
        },
        {
            id: 2,
            title: "The Crown",
            description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
            image: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.6,
            year: 2016,
            duration: "6 Seasons",
            genre: "Drama, History",
            type: "series"
        },
        {
            id: 3,
            title: "Ozark",
            description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
            image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.4,
            year: 2017,
            duration: "4 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 4,
            title: "The Witcher",
            description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
            image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.2,
            year: 2019,
            duration: "3 Seasons",
            genre: "Fantasy, Adventure",
            type: "series"
        },
        {
            id: 5,
            title: "Money Heist",
            description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
            image: "https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/164455/pexels-photo-164455.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.3,
            year: 2017,
            duration: "5 Seasons",
            genre: "Crime, Thriller",
            type: "series"
        },
        {
            id: 6,
            title: "Dark",
            description: "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.",
            image: "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.8,
            year: 2017,
            duration: "3 Seasons",
            genre: "Sci-Fi, Mystery",
            type: "series"
        }
    ],
    popular: [
        {
            id: 7,
            title: "Black Mirror",
            description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
            image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.8,
            year: 2011,
            duration: "6 Seasons",
            genre: "Sci-Fi, Thriller",
            type: "series"
        },
        {
            id: 8,
            title: "The Queen's Gambit",
            description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
            image: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.6,
            year: 2020,
            duration: "1 Season",
            genre: "Drama",
            type: "series"
        },
        {
            id: 9,
            title: "Bridgerton",
            description: "Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
            image: "https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 7.3,
            year: 2020,
            duration: "3 Seasons",
            genre: "Romance, Drama",
            type: "series"
        },
        {
            id: 10,
            title: "Squid Game",
            description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
            image: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.0,
            year: 2021,
            duration: "1 Season",
            genre: "Thriller, Drama",
            type: "series"
        },
        {
            id: 11,
            title: "Wednesday",
            description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
            image: "https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.1,
            year: 2022,
            duration: "1 Season",
            genre: "Comedy, Horror",
            type: "series"
        },
        {
            id: 12,
            title: "The Umbrella Academy",
            description: "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more.",
            image: "https://images.pexels.com/photos/1666776/pexels-photo-1666776.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666776/pexels-photo-1666776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 7.9,
            year: 2019,
            duration: "4 Seasons",
            genre: "Action, Comedy",
            type: "series"
        }
    ],
    drama: [
        {
            id: 13,
            title: "House of Cards",
            description: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
            image: "https://images.pexels.com/photos/1666778/pexels-photo-1666778.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666778/pexels-photo-1666778.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.7,
            year: 2013,
            duration: "6 Seasons",
            genre: "Drama, Thriller",
            type: "series"
        },
        {
            id: 14,
            title: "Orange Is the New Black",
            description: "A privileged New Yorker ends up in a women's prison when a past crime catches up with her in this Emmy-winning series.",
            image: "https://images.pexels.com/photos/1666777/pexels-photo-1666777.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666777/pexels-photo-1666777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.1,
            year: 2013,
            duration: "7 Seasons",
            genre: "Comedy, Drama",
            type: "series"
        },
        {
            id: 15,
            title: "Narcos",
            description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country.",
            image: "https://images.pexels.com/photos/1666775/pexels-photo-1666775.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666775/pexels-photo-1666775.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.8,
            year: 2015,
            duration: "3 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 16,
            title: "Mindhunter",
            description: "In the late 1970s, two FBI agents broaden the realm of criminal science by investigating the psychology behind murder.",
            image: "https://images.pexels.com/photos/1666774/pexels-photo-1666774.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666774/pexels-photo-1666774.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.6,
            year: 2017,
            duration: "2 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 17,
            title: "The Good Place",
            description: "A woman struggles to be a good person when she realizes that everyone in her afterlife neighborhood is supposed to be perfect.",
            image: "https://images.pexels.com/photos/1666773/pexels-photo-1666773.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666773/pexels-photo-1666773.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.2,
            year: 2016,
            duration: "4 Seasons",
            genre: "Comedy, Fantasy",
            type: "series"
        },
        {
            id: 18,
            title: "Peaky Blinders",
            description: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.",
            image: "https://images.pexels.com/photos/1666772/pexels-photo-1666772.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666772/pexels-photo-1666772.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.8,
            year: 2013,
            duration: "6 Seasons",
            genre: "Crime, Drama",
            type: "series"
        }
    ],
    crime: [
        {
            id: 19,
            title: "Breaking Bad",
            description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
            image: "https://images.pexels.com/photos/1666771/pexels-photo-1666771.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666771/pexels-photo-1666771.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 9.5,
            year: 2008,
            duration: "5 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 20,
            title: "Better Call Saul",
            description: "The trials and tribulations of criminal lawyer Jimmy McGill in the time before he established his strip-mall law office in Albuquerque.",
            image: "https://images.pexels.com/photos/1666770/pexels-photo-1666770.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666770/pexels-photo-1666770.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.8,
            year: 2015,
            duration: "6 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 21,
            title: "Fargo",
            description: "Various chronicles of deception, intrigue and murder in and around frozen Minnesota.",
            image: "https://images.pexels.com/photos/1666769/pexels-photo-1666769.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666769/pexels-photo-1666769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 9.0,
            year: 2014,
            duration: "5 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 22,
            title: "True Detective",
            description: "Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved.",
            image: "https://images.pexels.com/photos/1666768/pexels-photo-1666768.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666768/pexels-photo-1666768.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 9.0,
            year: 2014,
            duration: "4 Seasons",
            genre: "Crime, Mystery",
            type: "series"
        },
        {
            id: 23,
            title: "The Sopranos",
            description: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.",
            image: "https://images.pexels.com/photos/1666767/pexels-photo-1666767.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666767/pexels-photo-1666767.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 9.2,
            year: 1999,
            duration: "6 Seasons",
            genre: "Crime, Drama",
            type: "series"
        },
        {
            id: 24,
            title: "The Wire",
            description: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
            image: "https://images.pexels.com/photos/1666766/pexels-photo-1666766.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666766/pexels-photo-1666766.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 9.3,
            year: 2002,
            duration: "5 Seasons",
            genre: "Crime, Drama",
            type: "series"
        }
    ],
    scifi: [
        {
            id: 25,
            title: "Westworld",
            description: "Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged.",
            image: "https://images.pexels.com/photos/1666765/pexels-photo-1666765.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666765/pexels-photo-1666765.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.6,
            year: 2016,
            duration: "4 Seasons",
            genre: "Sci-Fi, Western",
            type: "series"
        },
        {
            id: 26,
            title: "Altered Carbon",
            description: "Set in a future where consciousness is digitized and stored, a prisoner returns to life in a new body and must solve a mind-bending murder.",
            image: "https://images.pexels.com/photos/1666764/pexels-photo-1666764.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666764/pexels-photo-1666764.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.0,
            year: 2018,
            duration: "2 Seasons",
            genre: "Sci-Fi, Thriller",
            type: "series"
        },
        {
            id: 27,
            title: "Lost in Space",
            description: "After crash-landing on an alien planet, the Robinson family fight against all odds to survive and escape, but they're surrounded by hidden dangers.",
            image: "https://images.pexels.com/photos/1666763/pexels-photo-1666763.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666763/pexels-photo-1666763.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 7.3,
            year: 2018,
            duration: "3 Seasons",
            genre: "Sci-Fi, Adventure",
            type: "series"
        },
        {
            id: 28,
            title: "The Expanse",
            description: "A police detective in the asteroid belt, the first officer of an interplanetary ice freighter, and an earth-bound United Nations executive slowly discover a vast conspiracy.",
            image: "https://images.pexels.com/photos/1666762/pexels-photo-1666762.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666762/pexels-photo-1666762.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.5,
            year: 2015,
            duration: "6 Seasons",
            genre: "Sci-Fi, Drama",
            type: "series"
        },
        {
            id: 29,
            title: "Star Trek: Discovery",
            description: "Ten years before Kirk, Spock, and the Enterprise, the USS Discovery discovers new worlds and lifeforms as one Starfleet officer learns to understand all things alien.",
            image: "https://images.pexels.com/photos/1666761/pexels-photo-1666761.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666761/pexels-photo-1666761.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 7.0,
            year: 2017,
            duration: "5 Seasons",
            genre: "Sci-Fi, Adventure",
            type: "series"
        },
        {
            id: 30,
            title: "The Mandalorian",
            description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
            image: "https://images.pexels.com/photos/1666760/pexels-photo-1666760.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop",
            backdrop: "https://images.pexels.com/photos/1666760/pexels-photo-1666760.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
            rating: 8.7,
            year: 2019,
            duration: "3 Seasons",
            genre: "Sci-Fi, Adventure",
            type: "series"
        }
    ]
};

// User data management
class UserData {
    constructor() {
        this.currentUser = null;
        this.myList = this.getMyList();
        this.continueWatching = this.getContinueWatching();
    }

    // Authentication methods
    login(email, password) {
        // Simulate authentication
        if (email && password) {
            this.currentUser = {
                id: Date.now(),
                email: email,
                name: email.split('@')[0],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            };
            localStorage.setItem('netflix_user', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }

    signup(name, email, password) {
        // Simulate signup
        if (name && email && password) {
            this.currentUser = {
                id: Date.now(),
                email: email,
                name: name,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            };
            localStorage.setItem('netflix_user', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('netflix_user');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const stored = localStorage.getItem('netflix_user');
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
        return this.currentUser;
    }

    // My List methods
    getMyList() {
        const stored = localStorage.getItem('netflix_mylist');
        return stored ? JSON.parse(stored) : [];
    }

    addToMyList(contentId) {
        if (!this.myList.includes(contentId)) {
            this.myList.push(contentId);
            localStorage.setItem('netflix_mylist', JSON.stringify(this.myList));
        }
    }

    removeFromMyList(contentId) {
        this.myList = this.myList.filter(id => id !== contentId);
        localStorage.setItem('netflix_mylist', JSON.stringify(this.myList));
    }

    isInMyList(contentId) {
        return this.myList.includes(contentId);
    }

    // Continue watching methods
    getContinueWatching() {
        const stored = localStorage.getItem('netflix_continue_watching');
        return stored ? JSON.parse(stored) : [];
    }

    addToContinueWatching(contentId, progress = 0) {
        const existing = this.continueWatching.find(item => item.id === contentId);
        if (existing) {
            existing.progress = progress;
            existing.lastWatched = new Date().toISOString();
        } else {
            this.continueWatching.push({
                id: contentId,
                progress: progress,
                lastWatched: new Date().toISOString()
            });
        }
        localStorage.setItem('netflix_continue_watching', JSON.stringify(this.continueWatching));
    }

    // Search functionality
    searchContent(query) {
        if (!query.trim()) return [];
        
        const allContent = [
            ...mockContent.trending,
            ...mockContent.popular,
            ...mockContent.drama,
            ...mockContent.crime,
            ...mockContent.scifi
        ];

        const lowerQuery = query.toLowerCase();
        return allContent.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.genre.toLowerCase().includes(lowerQuery)
        );
    }

    // Get content by ID
    getContentById(id) {
        const allContent = [
            ...mockContent.trending,
            ...mockContent.popular,
            ...mockContent.drama,
            ...mockContent.crime,
            ...mockContent.scifi
        ];
        return allContent.find(item => item.id === parseInt(id));
    }
}

// Create global instance
window.userData = new UserData();
window.mockContent = mockContent;