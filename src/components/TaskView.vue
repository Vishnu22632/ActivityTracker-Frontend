<template>
<div class="card" style="font-size: 1.2em;">

    <Toast />
    <ConfirmDialog />

    <div class="card flex justify-content-end" style="margin: 1.5em;">
        <Button @click="openTaskDailog" label="ADD TASK" />
    </div>

    <div class="card" style="font-size: 1.2em;">
        <DataTable :value="tasks" tableStyle="min-width: 50rem">
            <Column field="id" header="TID"></Column>
            <Column field="project.name" header="PROJECT NAME"></Column>
            <Column field="name" header="TASK"></Column>
            <Column field="assignedUser.fullName" header="WORKED BY"></Column>

            <Column field="project.startDate" header="PROJECT START DATE"></Column>
            <Column field="project.endDate" header="PROJECT END DATE"></Column>
            <Column field="status" header="TASK STATUS"></Column>
            <Column field="description" header="TASK DESC"></Column>

            <Column header="ACTION">

                <template #body="slotProps">

                    <Button icon="pi pi-pencil" class="p-button-primary" @click="editTask(slotProps.data)" />

                    <Button icon="pi pi-trash" style="margin: 0 3px;" class="p-button-danger" @click="deleteTask(slotProps.data)" />

                </template>
            </Column>

        </DataTable>
    </div>

    <Dialog v-model:visible="visible" modal :header="taskHeader" :style="{ width: '35rem' }">

        <form @submit.prevent="saveTask">

            <div class="flex items-center gap-8 mb-4">
                <label for="projecname" class="font-semibold w-24">PROJECT :</label>
                <Select v-model="taskForm.project" :options="projects" optionLabel="name" placeholder="Select Project" class="w-full md:w-56" />
            </div>
            
            <div class="flex items-center gap-6 mb-4">
                <label for="tname" class="font-semibold w-24">TASK NAME : </label>
                <InputText v-model="taskForm.name" id="tname" class="flex-auto" autocomplete="off" />
            </div>

            <div class="flex items-center gap-8 mb-4">
                <label for="projecname" class="font-semibold w-24">WORKED By</label>
                <Select v-model="taskForm.assignedUser" :options="users" optionLabel="fullName" placeholder="Select Employee" class="w-full md:w-56" />
            </div>
            

            <div class="flex items-center gap-7 mb-4">
                <label for="tstatus" class="font-semibold w-24">TASK STATUS : </label>
                <Select v-model="taskForm.status" :options="statuses" optionLabel="label" placeholder="Select Task Status" class="w-full md:w-56" />
            </div>
            <div class="flex items-center gap-6 mb-4">
                <label for="tdesc" class="font-semibold w-24">TASK DESC : </label>
                <InputText v-model="taskForm.description" id="tdesc" class="flex-auto" autocomplete="off" />
            </div>

            <div class="flex justify-content-center gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="submit" label="Save"></Button>
            </div>
        </form>
    </Dialog>

</div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';
import TaskService from '@/services/TaskService';
import FetchAllUsers from '@/services/FetchAllUsers';
import FetchAllProjects from '@/services/FetchAllProjects';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirm = useConfirm();
const tasks = ref([]);
const visible = ref(false);
const projects = ref([]);
const users = ref([]);
const selectedTask = ref([]);
let taskHeader = ref("ADD TASK");

let openTaskDailog = () =>{
    taskHeader = "ADD TASK",
    visible.value = true
};


const statuses = ref([{
        label: 'PENDING',
        value: 'PENDING'
    },
    {
        label: 'ONGOING',
        value: 'ONGOING'
    },
    {
        label: 'COMPLETED',
        value: 'COMPLETED'
    }
]);

const taskForm = ref({
    name: '',
    status: '',
    description: '',
    project: '',
    assignedUser: ''
});

const resetTaskForm = () => {
    taskForm.value = {
        name: '',
        status: '',
        description: '',
        project: '',
        assignedUser: ''
    }
};




onMounted(() => {
    loadTasks();
    loadUsers();
    loadProjects();
})

const loadTasks = () => {
    TaskService.getTasks().then((response) => {
        tasks.value = response.data;
        console.log(tasks.value);
    })
}

const loadUsers = () => {
    FetchAllUsers.getAllUsers().then((response) => {
        users.value = response.data;
    })
};

const loadProjects = () => {
    FetchAllProjects.getAllProjects().then((response) => {
        projects.value = response.data;
    })
};

const editTask = (selectedTask) =>{

    taskForm.value ={
        ...selectedTask,
        project: projects.value.find(project => project.id === selectedTask.project.id), // Find the corresponding project

        status: statuses.value.find(status => status.value === selectedTask.status)
    }
    taskHeader = "UPDATE TASK",
    visible.value = true

}

const saveTask = () => {

    const taskToSave = {
        ...taskForm.value,

        // status: project.value.status ? project.value.status.value : null 

        status: taskForm.value.status ? taskForm.value.status.value : null

    };

    TaskService.saveTask(taskToSave).then(() => {
        toast.add({
            severity: 'success', summary: 'Success', detail: 'Task added successfully', life: 3000 
        });
        resetTaskForm();
        visible.value = false;
        loadTasks();
    }).catch((error) => {
        console.log('Error Saving Task : ', error);
    });
};

const deleteTask = (task) =>{

    confirm.require({
        message: 'Are you sure you want to delete this task?',
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
        accept: () => {
            TaskService.deleteTask(task.id).then(()=>{
        toast.add({
            severity: 'success', summary: 'Success', detail: 'Task deleted successfully', life: 3000 
        });
        loadTasks();
    }).catch((error)=>{
        console.log('Error deleting task : ',error);
    });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};


</script>






















