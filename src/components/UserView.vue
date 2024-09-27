<template>
<div class="card" >

    <DataTable :value="users" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5,10,20,50]" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}"
    >


        <template #header>
                <div class="flex justify-content-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText  placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>


        <Column field="fullName" header="FULLNAME"></Column>
        <Column field="email" header="EMAIL"></Column>
        <Column field="address" header="ADDRESS"></Column>
        <Column field="password" header="PASSWORD"></Column>
    </DataTable>
</div>
</template>

<script setup>

import {
    ref,
    onMounted
} from 'vue';
import UserService from '@/services/UserService';


const users = ref([]);

// fetch all users when mounted
const loadUsers = UserService.getUsers()
    .then(response => {
        users.value = response.data;
    }).catch(error => {
        console.log('Error Fetching data ', error);
    })

onMounted(() => {
    loadUsers;
})
</script>

<style scoped>
.card{
    font-size: 1.3em;
}
</style>