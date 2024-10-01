<template>
<div class="card flex justify-content-end">
    <Button @click="visible=true" label="ADD PROJECT" />
</div>

<div class="card">
    <DataTable :value="projects" tableStyle="min-width: 50rem">
        <Column field="id" header="PID"></Column>
        <Column field="name" header="PROJECT NAME"></Column>
        <Column field="project_manager.fullName" header="PROJECT MANAGER"></Column>
        <Column field="startDate" header="START DATE"></Column>
        <Column field="endDate" header="END DATE"></Column>
        <Column field="status" header="STATUS"></Column>
        <Column field="description" header="DESC"></Column>
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
        <label>{{ project.project_manager }}</label>
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

const projects = ref();
const visible = ref(false);
const users = ref();

const project = ref({
    name: '',
    project_manager: null,
    startDate: '',
    endDate: '',
    status: '',
    description: ''
});

const statuses = ref([
    {label: 'PENDING', value: 'PENDING' },
    {label: 'ONGOING', value: 'ONGOING'},
    {label: 'COMPLETED', value: 'COMPLETED'}
]);



onMounted(() => {
    loadProjects();
    loadUsers();
});

const loadProjects = () => {
    ProjectService.getProjects().then((response) => {
        projects.value = response.data;
    });
};

const loadUsers = () =>{
    FetchAllUsers.getAllUsers().then((response)=>{
        users.value = response.data;
    });
};

const saveProject = () => {
    // If the backend only expects an ID for project_manager, extract the ID here
    const projectToSave = { 
        ...project.value, 
        project_manager: project.value.project_manager ? project.value.project_manager.id : null ,
        
        status: project.value.status ? project.value.status.value : null 

    };
    
    ProjectService.saveProject(projectToSave).then(() => {
        visible.value = false;
        loadProjects();
    });
};

</script>
