import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';

import router from './router'



const app = createApp(App)



app.use(PrimeVue,{
    theme: {
        preset:Aura
    }
});




app.use(router);



// Add Components
app.component('Menubar',Menubar);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('InputText',InputText);


app.mount('#app');



