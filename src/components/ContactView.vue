<template>
    This is contact page
</template>

<!-- <script setup></script>


<template>
    <div class="button-container">
        <Button @click="visible = true"><span class="pi pi-plus"></span>ADD PROJECT</Button>
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
            <div class="flex items-center gap-2 mb-4">
                <label for="pname" class="font-semibold w-24">Project Name : </label>
                <InputText id="pname" v-model="project.name" class="flex-auto" autocomplete="off" />
    
            </div>
    
            <div class="flex items-center gap-3 mb-4">
                <label for="pmanager" class="font-semibold w-24">Project Manager : </label>
                <Select v-model:modelValue="project.project_manager" :options="users" optionLabel="fullName" placeholder="Select Project Manager" class="w-full md:w-56" />
            </div>
            <label>{{ project.project_manager }}</label>
    
            <div class="flex items-center gap-5 mb-4">
                <label for="sdate" class="font-semibold w-24">Start Date : </label>
                <InputText id="sdate" type="date" v-model="project.startDate" class="flex-auto" autocomplete="off" />
            </div>
    
            <div class="flex items-center gap-5 mb-4">
                <label for="edate" class="font-semibold w-24">End Date : </label>
                <InputText id="edate" type="date" v-model="project.endDate" class="flex-auto" autocomplete="off" />
            </div>
    
            <div class="flex items-center gap-3 mb-4">
                <label for="pstatus" class="font-semibold w-24">Project Status : </label>
                <Select id="pstatus" v-model="project.status" :options="statusOptions" optionLabel="status" placeholder="Select Status" class="w-full md:w-40" />
            </div>
    
            <div class="flex items-center gap-2 mb-4">
                <label for="pdesc" class="font-semibold w-24">Description : </label>
                <InputText id="pdesc" v-model="project.description" class="flex-auto" autocomplete="off" />
            </div>
    
            <div class="flex justify-content-center gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="submit" label="Save" @click="saveProject"></Button>
            </div>
        </form>
    </Dialog>
    </template>
    
    <script setup>
    import {
        ref,
        onMounted
    } from 'vue';
    import ProjectService from '@/services/ProjectService';
    import FetchAllUsers from '@/services/FetchAllUsers';
    
    const projects = ref();
    const visible = ref(false);
    
    const selectedUsers = ref([]); // for selected project manager
    const users = ref([]); //for list of users
    
    // Dummy options for status selection
    const statusOptions = ref([{
        status: 'Pending'
    }, {
        status: 'Ongoing'
    }, {
        status: 'Completed'
    }]);
    
    // Reactive form object to bind the input fields
    const project = ref({
        name: '',
        project_manager: null,
        startDate: '',
        endDate: '',
        status: '',
        description: ''
    });
    
    onMounted(() => {
        loadProjects();
        loadUsers();
    });
    
    const loadProjects = () => {
        ProjectService.getProjects().then((response) => {
            projects.value = response.data;
        });
    };
    
    const loadUsers = () => {
        FetchAllUsers.getAllUsers().then((response) => {
            users.value = response.data;
        });
    };
    
    const saveProject = () => {
        // Check if project manager is selected
        if (project.value.project_manager) {
    
            project.value.project_manager = {
                id: project.value.project_manager.id
            }; // Send only the ID
        }
    
    
        const jsonValue = JSON.stringify(project.value);
    
        ProjectService.saveProject(jsonValue).then(() => {
            loadProjects(); // Reload the projects to reflect the new data
            visible.value = false;
            resetProject(); // Reset form values
        }).catch((error) => {
            console.log("Error saving project: ", error);
        });
    };
    
    // Function to reset project values after saving
    const resetProject = () => {
        project.value = {
            name: '',
            project_manager: null,
            startDate: '',
            endDate: '',
            status: '',
            description: ''
        };
    };
    </script>
    
    <style scoped>
    .button-container {
        margin: 15px 25px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }
    </style> -->
    