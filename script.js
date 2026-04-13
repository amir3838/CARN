/**
 * AutoFinance Pro - Interactive Features
 * Premium glassmorphism website foundation
 */

/**
 * AutoFinance Pro - Interactive Features + News/Markets Integration
 */

// Load API modules
let NewsAPI, MarketsAPI;
if (typeof fetchNews !== 'undefined') NewsAPI = { fetchNews };
if (typeof fetchMarkets !== 'undefined' && typeof startAutoRefresh !== 'undefined') {
  MarketsAPI = { fetchMarkets, startAutoRefresh };
}

document.addEventListener('DOMContentLoaded', async function() {
    // ===== MARQUEE TICKER INTERACTION =====
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });
        
        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // ===== NAVIGATION WITH SMOOTH SCROLL & ACTIVE STATES =====
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Close mobile menu & update active
            if (navList.classList.contains('active')) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ===== NEWS & MARKETS DATA LOADING =====
    await loadAutomotiveNews();
    loadMarketsBulletin();

    // ===== LANGUAGE TOGGLE =====
    const langToggle = document.querySelector('#langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const isArabic = html.lang === 'ar';
            
            if (isArabic) {
                html.lang = 'en';
                html.dir = 'ltr';
                langToggle.innerHTML = 'EN <span class="arrow">▼</span>';
            } else {
                html.lang = 'ar';
                html.dir = 'rtl';
                langToggle.innerHTML = 'عربي <span class="arrow">▼</span>';
            }
        });
    }

    // ===== GLASSMORPHISM HOVER EFFECTS =====
    const glassElements = document.querySelectorAll('.glass-nav, .nav-link');
    glassElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--glass-glow), var(--glass-bg))`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.background = '';
        });
    });

    // ===== PERFORMANCE: INTERSECTION OBSERVER =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.section').forEach(section => observer.observe(section));
        const hero = document.querySelector('.hero');
        if (hero) observer.observe(hero);
    }
});

// ===== AUTOMOTIVE NEWS FUNCTION =====
async function loadAutomotiveNews() {
    if (!NewsAPI?.fetchNews) {
        console.warn('NewsAPI not available');
        return;
    }

    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = '<div class="loading">Loading automotive news...</div>';

    try {
        const articles = await NewsAPI.fetchNews();
        
        if (articles.length === 0) {
            newsGrid.innerHTML = '<div class="loading">No news available</div>';
            return;
        }

        newsGrid.innerHTML = articles.map(article => `
            <article class="news-card" tabindex="0">
                ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title || 'News image'}" loading="lazy">` : ''}
                <div class="news-card-content">
                    <div class="news-source">${article.source?.name || 'News'}</div>
                    <h3 class="news-title">${article.title || 'No title'}</h3>
                    <div class="news-time">${new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}</div>
                    <a href="${article.url}" class="news-readmore" target="_blank" rel="noopener">Read More →</a>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('News load error:', error);
        newsGrid.innerHTML = '<div class="loading">Failed to load news. Check console.</div>';
    }
}

// ===== MARKETS BULLETIN FUNCTION =====
function loadMarketsBulletin() {
    if (!MarketsAPI) {
        console.warn('MarketsAPI not available');
        return;
    }

    const marketsList = document.querySelector('.markets-list');
    if (!marketsList) return;

    // Start auto-refresh
    MarketsAPI.startAutoRefresh(async () => {
        marketsList.innerHTML = '<div class="loading">Loading market updates...</div>';

        try {
            const articles = await MarketsAPI.fetchMarkets();
            
            if (articles.length === 0) {
                marketsList.innerHTML = '<div class="loading">No market updates</div>';
                return;
            }

            marketsList.innerHTML = articles.map(article => `
                <article class="market-item" tabindex="0">
                    <div class="market-icon">📈</div>
                    <div class="market-content">
                        <h3>${article.title || 'No title'}</h3>
                        <div class="market-source-time">
                            <span>${article.source?.name || 'Market'}</span>
                            <span>${new Date(article.publishedAt).toLocaleString('en-US', { 
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}</span>
                        </div>
                        <a href="${article.url}" class="market-readmore" target="_blank" rel="noopener">Read Full Report</a>
                    </div>
                </article>
            `).join('');

            // Add refresh timestamp
            const lastUpdate = document.querySelector('.markets-bulletin .section-header p');
            if (lastUpdate) {
                lastUpdate.textContent += ` (Last update: ${new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', minute: '2-digit' 
                })} )`;
            }
        } catch (error) {
            console.error('Markets load error:', error);
            marketsList.innerHTML = '<div class="loading">Failed to load markets. Check console.</div>';
        }
    });
}
