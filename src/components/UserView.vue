<template>
<div class="card">

    <DataTable :value="users" tableStyle="min-width: 50rem" :paginator="true" :rows="rows" :lazy="true" :rowsPerPageOptions="[5,10,20,50]" :totalRecords="totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}" @page="onPageChange">

        <template #header>
            <div class="flex justify-content-end">

                <InputText v-model="globalFilter" placeholder="Keyword Search" @input="onGlobalSearch"/>

            </div>
        </template>

        <Column>
            <template #header>
                <div style="font-weight: bolder;">
                    ID:
                    <div>
                        <InputText v-model="filters.id" @input="onFilterChange" placeholder="Filter by ID" />
                    </div>
                </div>
            </template>
            <template #body="slotProps">
                {{ slotProps.data.id }}
            </template>
        </Column>

        <Column>
            <template #header>
                <div style=" font-weight: bolder;">
                    Full Name:
                    <div>
                        <InputText v-model="filters.fullName" @input="onFilterChange" placeholder="Filter by Full Name" />
                    </div>
                </div>
            </template>
            <template #body="slotProps">
                {{ slotProps.data.fullName }}
            </template>
        </Column>

        <Column>
            <template #header>
                <div style=" font-weight: bolder;">
                    EMAIL:
                    <div>
                        <InputText v-model="filters.email" @input="onFilterChange" placeholder="Filter by email" />
                    </div>
                </div>
            </template>
            <template #body="slotProps">
                {{ slotProps.data.email }}
            </template>
        </Column>

        <Column>
            <template #header>
                <div style=" font-weight: bolder;">
                    ADDRESS:
                    <div>
                        <InputText v-model="filters.address" @input="onFilterChange" placeholder="Filter by address" />
                    </div>
                </div>
            </template>
            <template #body="slotProps">
                {{ slotProps.data.address }}
            </template>
        </Column>

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
const rows = ref(5);
const totalRecords = ref(0);
const first = ref(0);

const filters = ref({
    id: '',
    fullName: '',
    email: '',
    address: ''
});

const globalFilter = ref('');

// fetch all users when mounted

const loadUsers = (page = 0, size = 5) => {
    UserService.getUsers(page, size,filters.value).then(response => {
        users.value = response.data.content;
        totalRecords.value = response.data.totalElements;
    }).catch(error => {
        console.log('Error Fetching data : ', error);
    });
};

const onFilterChange = ()=> {
    loadUsers();
};

const onGlobalSearch = () => {
    filters.value.fullName = globalFilter.value;
    filters.value.email = globalFilter.value;
    filters.value.address = globalFilter.value;
    loadUsers();
};

// Handle page change
const onPageChange = (event) => {
    first.value = event.first;
    rows.value = event.rows;
    const page = event.page;
    loadUsers(page, rows.value);
}

onMounted(() => {
    loadUsers();
});
</script>

<style scoped>
.card {
    font-size: 1.3em;
}
</style>
