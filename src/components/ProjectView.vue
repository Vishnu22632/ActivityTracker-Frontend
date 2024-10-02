<template>
<div class="card flex justify-content-end" style="margin: 1.5em;">
    <Button @click="visible=true" label="ADD PROJECT" />
</div>

<div class="card" style="font-size: 1.2em;">
    <DataTable :value="projects" 
    tableStyle="min-width: 50rem" 
    :paginator="true" 
    :rows="rows" 
    :lazy="true" 
    :rowsPerPageOptions="[5,10,20,50]" 
    :totalRecords="totalRecords" 
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}" @page="onLazyLoad">

        <Column field="id" header="PID"></Column>
        <Column field="name" header="PROJECT NAME"></Column>
        <Column field="project_manager.fullName" header="PROJECT MANAGER"></Column>
        <Column field="startDate" header="START DATE"></Column>
        <Column field="endDate" header="END DATE"></Column>
        <Column field="status" header="STATUS"></Column>
        <Column field="description" header="DESC"></Column>
        <Column header="ACTION">
            <template #body="slotProps">

                <Button style="margin-right: 3px;" icon="pi pi-pencil" class="p-button-primary" @click="editProject(slotProps.data)" />

                <Button icon="pi pi-trash" class="p-button-danger" @click="deleteProject(slotProps.data)" />

            </template>
        </Column>



    </DataTable>
</div>

<Dialog v-model:visible="visible" modal header="ADD PROJECT" :style="{ width: '35rem' }">

    <form @submit.prevent="saveProject">
        
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">PROJECT NAME :</label>
            <InputText v-model="project.name" id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">PROJECT MANAGER :</label>
            <Select v-model="project.project_manager" :options="users" optionLabel="fullName" placeholder="Select Project Manager" class="w-full md:w-56" />
        </div>
        
        <div class="flex items-center gap-6 mb-4">
            <label for="sdate" class="font-semibold w-24">START DATE :</label>
            <InputText v-model="project.startDate" type="date" id="sdate" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-8 mb-4">
            <label for="edate" class="font-semibold w-24">END DATE :</label>
            <InputText v-model="project.endDate" type="date" id="edate" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-4">
            <label for="pstatus" class="font-semibold w-24">PROJECT STATUS : </label>
            <Select v-model="project.status" :options="statuses" optionLabel="label" placeholder="Select Project Status" class="w-full md:w-56" />        
        </div>

        <div class="flex items-center gap-5 mb-8">
            <label for="pdesc" class="font-semibold w-24">DESCRIPTION</label>
            <InputText v-model="project.description" id="pdesc" class="flex-auto" autocomplete="off" />
        </div>


        <div class="flex justify-content-center gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="submit" label="Save" ></Button>
        </div>
    </form>
</Dialog>
</template>

<script setup>
// All import here

import {
    ref,
    onMounted
} from 'vue';
import ProjectService from '@/services/ProjectService';
import FetchAllUsers from '@/services/FetchAllUsers';

const projects = ref([]);
const visible = ref(false);
const users = ref([]);
const rows = ref(5);
const first = ref(0);
const totalRecords = ref(0);
const project = ref({
    name: '',
    project_manager: null,
    startDate: '',
    endDate: '',
    status: '',
    description: ''
});

const resetProjectForm = () =>{
    project.value = {
        name: '',
        project_manager: null,
        startDate: '',
        endDate: '',
        status: '',
        description: ''

    };

};

const statuses = ref([
    {label: 'PENDING', value: 'PENDING' },
    {label: 'ONGOING', value: 'ONGOING'},
    {label: 'COMPLETED', value: 'COMPLETED'}
]);


const loadProjects = (page = 0, size = 5) => {
    ProjectService.getProjects(page, size).then(response => {
        projects.value = response.data.content;
        totalRecords.value = response.data.totalElements;
        first.value = page * size;
    });
};

const onLazyLoad = (event) => {
    const { first, rows } = event;
    const page = first / rows;
    loadProjects(page, rows);
};

const loadUsers = () =>{
    FetchAllUsers.getAllUsers().then((response)=>{
        users.value = response.data;
    });
};


onMounted(() => {
    loadProjects();
    loadUsers();
});


const saveProject = () => {
    // If the backend only expects an ID for project_manager, extract the ID here
    const projectToSave = { 
        ...project.value, 
       
        status: project.value.status ? project.value.status.value : null 

    };
    
    ProjectService.saveProject(projectToSave).then(() => {
        resetProjectForm();
        visible.value = false;
        loadProjects();
    });
};


const deleteProject = (project) =>{

    ProjectService.deleteProject(project.id).then(()=>{
        loadProjects();
    }).catch((error)=>{
        console.log('Error deleting project : ',error);
    });
};

</script>
