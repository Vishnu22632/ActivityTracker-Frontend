import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import router from './router'
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';
import Select from 'primevue/select';


// For confim Dialog Box 
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';


const app = createApp(App)



app.use(PrimeVue,{
    theme: {
        preset:Aura
    }
});




app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

// Add Components
app.component('Menubar',Menubar);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('InputText',InputText);
app.component('Button',Button);
app.component('Dialog',Dialog);
app.component('Toast',Toast);
app.component('ConfirmDialog',ConfirmDialog);
app.component('Textarea',Textarea);
app.component('AutoComplete',AutoComplete);
app.component('Select', Select);

app.mount('#app');



