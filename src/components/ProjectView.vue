<template>
<div class="card" style="font-size: 1.3em;">

    <div class="button-container">
        <Button @click="visible = true"><span class="pi pi-plus"></span>ADD PROJECT</Button>
    </div>

    <DataTable :value="projects" paginator :rows="10" :rowsPerPageOptions="[10, 20, 30]" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" tableStyle="min-width: 50rem">

        <Column field="id" header="PID"></Column>
        <Column field="name" header="PROJECT NAME"></Column>
        <Column field="project_manager.fullName" header="PROJECT MANAGER"></Column>
        <Column field="startDate" header="START DATE"></Column>
        <Column field="endDate" header="END DATE"></Column>
        <Column field="status" header="STATUS"></Column>
        <Column field="description" header="DESC"></Column>

    </DataTable>

    <!-- Add or edit Dialog box -->

    <Dialog v-model:visible="visible" modal header="Add Project" :style="{ width: '40rem' }">

        <div class="flex items-center gap-6 mb-4">
            <label for="pname" class="font-semibold w-24">Project Name :</label>
            <InputText id="pname" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="pmanager" class="font-semibold w-24">Project Manager :</label>

            <AutoComplete id="pmanager" dropdown v-model="selectedUser" :suggestions="users" field="fullName" placeholder="Select Project Manager"  />
        </div>

        <div class="flex items-center gap-7 mb-4">
            <label for="sdate" class="font-semibold w-24">Start Date :</label>
            <InputText id="sdate" type="date" class="flex-auto" />
        </div>

        <div class="flex items-center gap-7 mb-4">
            <label for="edate" class="font-semibold w-24">End Date :</label>
            <InputText id="edate" type="date" class="flex-auto" />
        </div>

        <div class="flex items-center gap-5 mb-4">
            <label for="pstatus" class="font-semibold w-24">Project Status :</label>
            <InputText id="pstatus" type="text" class="flex-auto" autocomplete="off" />

        </div>

        <div class="flex items-center gap-6 mb-4">
            <label for="pdesc" class="font-semibold w-24">Project Desc:</label>
            <Textarea id="pdesc" v-model="value" rows="3" cols="50" />

            </div>

        <div class="flex justify-content-center gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>

    </Dialog>

</div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';

import ProjectService from '@/services/ProjectService';

const projects = ref([]);
const visible = ref(false);

onMounted(() => {
    ProjectService.getProjects().then((response) => {
        projects.value = response.data;
    });
});


</script>

<style scoped>
.button-container {
    margin: 15px 25px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}
</style>









