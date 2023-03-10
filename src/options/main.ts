import { createApp } from 'vue';
import App from './components/app.vue';
import '../assets/style/reset.css';
import '../assets/style/common.scss';
import 'element-plus/lib/components/notification/style/index';
const app = createApp(App);
app.mount('#app');
