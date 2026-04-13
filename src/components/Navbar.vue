<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'

// المسار الصحيح للوصول للملف اللي بره الـ src
import { auth, signInWithGoogle, logout, signInEmail, signUpEmail } from '../firebase-auth.js'

const user = ref(null)
const showModal = ref(false)
const isSignUp = ref(false)
const email = ref('')
const password = ref('')

onMounted(() => {
  onAuthStateChanged(auth, (u) => user.value = u)
})

const loginGoogle = async () => {
  try { await signInWithGoogle(); showModal.value = false; } catch (e) { console.error(e) }
}

const handleAuth = async () => {
  try {
    if (isSignUp.value) await signUpEmail(email.value, password.value);
    else await signInEmail(email.value, password.value);
    showModal.value = false;
  } catch (e) { alert(e.message) }
}
</script>

<template>
  <nav class="navbar-root">
    <div class="nav-container">
      <div class="logo">
        <img src="/logo.png" @error="(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/743/743231.png'" />
        <span class="logo-text">CARN</span>
      </div>

      <div class="auth-zone">
        <template v-if="user">
          <div class="user-pill">
            <img :src="user.photoURL || 'https://ui-avatars.com/api/?name=User'" />
            <button @click="logout()" class="exit-btn">EXIT</button>
          </div>
        </template>
        <template v-else>
          <div class="btn-group">
            <button @click="loginGoogle" class="g-quick-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
            </button>
            <button @click="isSignUp = false; showModal = true" class="login-btn">LOGIN</button>
            <button @click="isSignUp = true; showModal = true" class="signup-btn">JOIN</button>
          </div>
        </template>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <h2 class="text-white font-black mb-4">{{ isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK' }}</h2>
        <form @submit.prevent="handleAuth" class="flex flex-col gap-3">
          <input v-model="email" type="email" placeholder="Email" class="modal-input" required />
          <input v-model="password" type="password" placeholder="Password" class="modal-input" required />
          <button type="submit" class="submit-btn">{{ isSignUp ? 'REGISTER' : 'SIGN IN' }}</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-root { position: fixed; top: 0; width: 100%; z-index: 5000; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255,215,0,0.1); }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 900; font-style: italic; font-size: 22px; }
.logo img { height: 30px; }
.btn-group { display: flex; gap: 10px; }
.g-quick-btn { background: #fff; padding: 8px; border-radius: 8px; border: none; cursor: pointer; display: flex; }
.g-quick-btn img { height: 16px; }
.login-btn { background: #111; color: #fff; border: 1px solid #333; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-size: 10px; font-weight: 900; }
.signup-btn { background: #ffd700; color: #000; padding: 8px 15px; border-radius: 8px; border: none; cursor: pointer; font-size: 10px; font-weight: 900; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 6000; }
.modal-card { background: #0a0a0a; padding: 40px; border-radius: 20px; border: 1px solid #222; width: 340px; text-align: center; }
.modal-input { background: #000; border: 1px solid #222; padding: 12px; border-radius: 10px; color: #fff; text-align: center; }
.submit-btn { background: #ffd700; color: #000; font-weight: 900; padding: 12px; border-radius: 10px; border: none; cursor: pointer; margin-top: 10px; }
.user-pill { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 5px 15px; border-radius: 50px; }
.user-pill img { width: 28px; border-radius: 50%; border: 1px solid #ffd700; }
.exit-btn { color: #ff4d4d; background: none; border: 1px solid #ff4d4d; padding: 2px 8px; border-radius: 4px; font-size: 9px; cursor: pointer; }
</style>