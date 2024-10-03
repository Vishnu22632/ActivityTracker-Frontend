<template>

    <Toast />
    <ConfirmDialog />

<div class="card flex justify-content-end" style="margin: 1.5em;">
    <Button @click="openAddUserDialog" label="ADD PROJECT" />
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

                <Button  icon="pi pi-pencil" class="p-button-primary" @click="editProject(slotProps.data)" />

                <Button icon="pi pi-trash" style="margin: 0 3px;" class="p-button-danger" @click="deleteProject(slotProps.data)" />

                <Button icon="pi pi-eye" class="p-button-info custom-override"  />


            </template>
        </Column>



    </DataTable>
</div>

<Dialog v-model:visible="visible" modal :header="projectHeaderDialog" :style="{ width: '35rem' }">

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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const projects = ref([]);
const visible = ref(false);
const users = ref([]);
const rows = ref(5);
const first = ref(0);
const totalRecords = ref(0);
const selectedProject = ref([]);
const projectHeaderDialog = ref("ADD PROJECT");
const toast = useToast();
const confirm = useConfirm();

const openAddUserDialog = ()=>{
    resetProjectForm();
    projectHeaderDialog.value = "ADD PROJECT";
    visible.value = true;
};


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

        toast.add({
            severity: 'success', summary: 'Success Message', detail: 'Project added sucessfully', life: 3000
        });

        resetProjectForm();
        visible.value = false;
        loadProjects();
    }).catch((error)=>{
        toast.add({
            severity: 'error', summary: 'Error Message' , detail: error, life: 3000
        });
        console.log('Error :', error);
    });
};

const editProject = (selectedProject) =>{
    project.value={
        ...selectedProject,
        status: statuses.value.find(status => status.value === selectedProject.status) 
    }
    projectHeaderDialog.value = "UPDATE PROJECT";
    visible.value = true;
};


const deleteProject = (project) =>{

    confirm.require({
        message: 'Are you sure you want to delete this record?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () =>{
            ProjectService.deleteProject(project.id).then(()=>{
                toast.add(
            {
                severity: 'success', summary: 'deleted', detail: 'Project deleted successfully', life: 3000
            }
        );
                loadProjects();


            }).catch((error)=>{
                toast.add(
            {
                severity: 'success', summary: 'deleted', detail: 'Project deleted successfully', life: 3000
            }
        );
            });
        },
        reject: () =>{
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }

    });

};

</script>
