import { createApp } from 'vue';
import App from './components/app.vue';
import '../assets/style/reset.css';
import '../assets/style/common.scss';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
VMdPreview.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);
app.use(VMdPreview).mount('#app');
