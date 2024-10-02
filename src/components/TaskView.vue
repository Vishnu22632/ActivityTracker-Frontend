<template>
<div class="card flex justify-content-end" style="margin: 1.5em;">
    <Button @click="visible=true" label="ADD TASK" />
</div>



<div class="card" style="font-size: 1.2em;">
    <DataTable :value="tasks" tableStyle="min-width: 50rem">
        <Column field="id" header="TID"></Column>
        
        <Column field="name" header="TASK"></Column>
        <Column field="startDate" header="WORKED BY"></Column>
        <Column field="endDate" header="PROJECT START DATE"></Column>
        <Column field="status" header="PROJECT END DATE"></Column>
        <Column field="description" header="TASK STATUS"></Column>
    </DataTable>
</div>


</template>

<script setup>

import {ref, onMounted} from 'vue';
import TaskService from '@/services/TaskService';


const tasks = ref();

onMounted(()=>{
    loadTasks();
})

const loadTasks = ()=>{
    TaskService.getTasks().then((response)=>{
        tasks.value = response.data;
    })
}



</script>
