# Critical Repair TODO (CARN)

- [x] Verify and refine `src/App.vue` base video/background behavior
- [x] Repair Vite startup issue via `vite.config.js`
- [x] Rewrite `src/components/GoldMetalsDashboard.vue` to premium English/LTR style

- [x] Restore News in Vue flow:
  - [x] Create `src/components/NewsCards.vue`
  - [x] Render NewsCards alongside GoldMetalsDashboard in `src/App.vue`

- [x] Fix stretched layout:
  - [x] Ensure dashboard is wrapped in `container mx-auto px-4`
  - [x] Use compact grid `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - [x] Keep each metal as standalone compact glass card

- [x] Polish hierarchy and visuals:
  - [x] Lighten global overlay in `src/App.vue`
  - [x] Keep trend pills small, top-right, glowing neon
  - [x] Ensure strict English + LTR across restored layout

- [x] Final compile verification with running dev server (HMR output)
