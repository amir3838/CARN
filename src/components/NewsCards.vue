<template>
  <section id="news" class="news-section">
    <div class="section-header">
      <h2 class="title uppercase italic font-black">Global Asset Insights</h2>
      <p class="subtitle text-gray-400">Live feed via GNews API • Automotive & Metals Hub</p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loader-text animate-pulse text-yellow-500 font-bold tracking-[5px]">
        FETCHING LIVE DATA...
      </div>
    </div>

    <div v-else>
      <div class="news-grid">
        <div v-for="(item, index) in newsList" :key="index" class="news-card glass-card">
          <div class="card-image">
            <img :src="item.image" @error="(e) => e.target.src = '/logo.png'">
            <span class="category-tag">{{ item.category }}</span>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-footer">
              <a :href="item.url" target="_blank" class="btn-read">
                View Source
                <svg viewBox="0 0 24 24" class="icon-arrow"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></svg>
              </a>
              <span class="time-stamp">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-container">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="page-btn"
        >
          PREVIOUS
        </button>
        
        <div class="page-info">
          PAGE <span class="text-yellow-500">{{ currentPage }}</span>
        </div>

        <button 
          @click="changePage(currentPage + 1)" 
          class="page-btn"
        >
          NEXT / OLDER
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const newsList = ref([])
const loading = ref(true)
const currentPage = ref(1)

const fetchLiveNews = async (page = 1) => {
  const API_KEY = '8e7930c9d2f5838ae01f79c5b443e3a5';
  loading.value = true;
  
  const getSubList = async (query, category) => {
    try {
      // الـ API بيدعم باراميتر الـ page للأخبار الأقدم
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=9&page=${page}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      return (data.articles || []).map(a => ({
        category: category,
        title: a.title,
        desc: a.description,
        image: a.image || (category === 'AUTO NEWS' ? 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500' : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500'),
        source: a.source.name,
        time: new Date(a.publishedAt).toLocaleDateString(),
        url: a.url
      }));
    } catch { return []; }
  };

  try {
    // جلب 9 أخبار عربيات و 9 أخبار معادن عشان المجموع يبقى 18 (مقسمة على 3 صفوف بالملي)
    const [cars, metals] = await Promise.all([
      getSubList('"luxury cars" OR supercar OR "concept car"', 'AUTO NEWS'),
      getSubList('gold OR "precious metals" OR silver', 'METALS')
    ]);

    // دمج وعمل Shuffle خفيف
    newsList.value = [...cars, ...metals].sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error("News Error:", error);
  } finally {
    loading.value = false;
    // سكرول لفوق عشان المستخدم يشوف بداية الصفحة الجديدة
    window.scrollTo({ top: document.getElementById('news').offsetTop - 100, behavior: 'smooth' });
  }
}

const changePage = (newPage) => {
  if (newPage < 1) return;
  currentPage.value = newPage;
  fetchLiveNews(newPage);
}

onMounted(() => {
  fetchLiveNews(1);
})
</script>

<style scoped>
/* التنسيق الأساسي والشبكة */
.news-section { width: 100%; max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
.news-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 30px; }
@media (min-width: 768px) { .news-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .news-grid { grid-template-columns: repeat(3, 1fr); } }

/* الكروت الزجاجية */
.news-card {
  display: flex; flex-direction: column; background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden;
  transition: all 0.4s ease; height: 100%;
}
.news-card:hover { transform: translateY(-10px); border-color: #ffd700; background: rgba(255, 255, 255, 0.08); }
.card-image { position: relative; height: 200px; background: #000; }
.card-image img { width: 100%; height: 100%; object-fit: cover; }
.category-tag { position: absolute; top: 12px; left: 12px; background: #ffd700; color: #000; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 900; text-transform: uppercase; }
.card-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.card-title { color: #fff; font-size: 16px; font-weight: 800; margin-bottom: 10px; line-height: 1.2; text-transform: uppercase; }
.card-desc { color: #aaa; font-size: 12px; margin-bottom: 20px; line-height: 1.5; flex: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); }
.btn-read { background: #ffd700; color: #000; padding: 8px 15px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 8px; }
.icon-arrow { width: 14px !important; height: 14px !important; fill: currentColor; }
.time-stamp { color: #666; font-size: 10px; font-weight: bold; }

/* هيدر القسم */
.section-header { text-align: left; margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
.title { color: #fff; font-size: 32px; letter-spacing: -1px; }
.subtitle { color: #888; font-size: 14px; }

/* نظام الصفحات "عطري" */
.pagination-container {
  display: flex; justify-content: center; align-items: center;
  gap: 30px; margin-top: 60px; padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.page-btn {
  background: rgba(255,255,255,0.05); color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 12px 25px; border-radius: 12px;
  font-size: 11px; font-weight: 900; cursor: pointer;
  transition: 0.3s; letter-spacing: 2px;
}
.page-btn:hover:not(:disabled) { background: #ffd700; color: #000; border-color: #ffd700; }
.page-btn:disabled { opacity: 0.2; cursor: not-allowed; }
.page-info { color: #fff; font-size: 12px; font-weight: 900; letter-spacing: 2px; }

.loading-state { padding: 100px 0; text-align: center; }
</style>