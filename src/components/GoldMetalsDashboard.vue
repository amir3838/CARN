<template>
  <section class="metals-section" dir="ltr">
    <div class="section-header">
      <h2 class="title italic font-black text-white text-3xl">Precious Metals Markets</h2>
      <p class="text-gray-600 text-sm mt-2">Live spot prices with real-time volatility tracking.</p>
    </div>
    
    <div class="metals-grid">
      <article v-for="metal in metals" :key="metal.name" class="metal-card">
        <div :class="['trend-badge', metal.change >= 0 ? 'up' : 'down']">
          {{ metal.change >= 0 ? '▲' : '▼' }} {{ Math.abs(metal.change) }}%
        </div>

        <div class="meta-content">
          <span class="tag">SPOT METAL</span>
          <h3 class="name">{{ metal.name }}</h3>
        </div>

        <div class="price-box">
          <div class="price-wrap">
            <span class="val">{{ metal.price }}</span>
            <span class="unit">USD</span>
          </div>
          <div class="neon-bar" :class="metal.change >= 0 ? 'bar-up' : 'bar-down'"></div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const metals = ref([
  { name: 'Gold 24k', price: '2,345.50', change: 1.25 },
  { name: 'Gold 21k', price: '2,052.30', change: -0.45 },
  { name: 'Silver', price: '28.15', change: 2.1 },
  { name: 'Platinum', price: '985.00', change: -1.15 },
  { name: 'Palladium', price: '1,042.30', change: 0.62 },
  { name: 'Rhodium', price: '4,355.00', change: -0.88 }
])
</script>

<style scoped>
.metals-section { max-width: 1200px; margin: 100px auto; padding: 0 20px; }
.metals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-top: 50px; }
@media (max-width: 1024px) { .metals-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .metals-grid { grid-template-columns: 1fr; } }

.metal-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 35px;
  padding: 40px 30px;
  position: relative;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.metal-card:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.08); }

.trend-badge { position: absolute; top: 30px; right: 30px; padding: 6px 15px; border-radius: 12px; font-size: 11px; font-weight: 900; }
.trend-badge.up { color: #00ff00; background: rgba(0,255,0,0.1); box-shadow: 0 0 15px rgba(0,255,0,0.2); }
.trend-badge.down { color: #ff4d4d; background: rgba(255,77,77,0.1); box-shadow: 0 0 15px rgba(255,77,77,0.2); }

.tag { color: #444; font-size: 10px; font-weight: 900; letter-spacing: 2px; }
.name { color: #fff; font-size: 26px; font-weight: 800; margin-top: 5px; }

.val { color: #fff; font-size: 48px; font-weight: 900; letter-spacing: -2px; }
.unit { color: #333; font-size: 14px; font-weight: 700; margin-left: 10px; }

.neon-bar { height: 4px; width: 100%; border-radius: 10px; margin-top: 15px; }
.bar-up { background: #00ff00; box-shadow: 0 0 15px #00ff00; }
.bar-down { background: #ff4d4d; box-shadow: 0 0 15px #ff4d4d; }
</style>