<template>
  <div class="app-container">
    <Navbar />

    <video id="bg-video" autoplay muted loop playsinline>
      <source src="/bg.mp4" type="video/mp4" />
    </video>
    
    <div class="overlay"></div>

    <main class="main-content">
      <div class="content-limit">
        
        <section id="news" class="section-spacer">
          <NewsCards />
        </section>

        <section id="markets" class="section-spacer">
          <GoldMetalsDashboard />
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import NewsCards from './components/NewsCards.vue'
import GoldMetalsDashboard from './components/GoldMetalsDashboard.vue'
</script>

<style>
/* إعدادات عامة لضمان نظافة التصميم */
* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
  background: #000; 
  color: #fff; 
  font-family: 'Inter', sans-serif;
  overflow-y: auto !important; /* السماح بالسكرول للأخبار الكتيرة */
}

/* فيديو الخلفية: ثابت ومغطي الشاشة كلها */
#bg-video { 
  position: fixed; 
  inset: 0; 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  z-index: -2; 
}

/* الأوفرلاي: عشان يدي غموض وفخامة ويخلي النص يتقرأ */
.overlay { 
  position: fixed; 
  inset: 0; 
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)); 
  z-index: -1; 
}

/* المحتوى الرئيسي: يبدأ بعد النيفبار بمسافة كافية */
.main-content {
  position: relative;
  z-index: 10;
  padding-top: 100px; /* المسافة اللي بتحمي "هوية الموقع" من البار */
  padding-bottom: 60px;
}

.content-limit {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-spacer {
  margin-bottom: 80px; /* مسافة بين قسم الأخبار وقسم المعادن */
}

/* تحسين السكرول بار عشان يبقى شيك */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #ffd700; border-radius: 10px; }
</style>