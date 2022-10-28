import { createApp } from 'vue'
import App from './App.vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import router from './routers/index'


createApp(App).use(router).use( CKEditor ).mount('#app')
