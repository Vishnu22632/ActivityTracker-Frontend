<template>
<div class="card">

    <Toast />
    <ConfirmDialog />

    <div class="button-container">
        <Button @click="openAddUserDialog"><span class="pi pi-plus"></span>ADD USER</Button>
    </div>

    <DataTable :value="users" tableStyle="min-width: 50rem" :paginator="true" :rows="rows" :lazy="true" :rowsPerPageOptions="[5,10,20,50]" :totalRecords="totalRecords" paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}" @page="onPageChange">

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

        <Column header="ACTION">
            <template #body="slotProps">

                <Button  icon="pi pi-pencil" class="p-button-primary" @click="editUser(slotProps.data)" />

                <Button icon="pi pi-trash" style="margin: 0 3px;" class="p-button-danger" @click="deleteUser(slotProps.data)" />
                
                <Button icon="pi pi-eye" class="p-button-info custom-override"  />
            </template>
        </Column>

    </DataTable>

    <!-- **********************Add or Edit user*************************** -->
    <Dialog v-model:visible="visible" @keyup.enter="saveUser" modal :header="dialogHeader" :style="{ width: '30rem' }">

        <div class="flex items-center gap-4 mb-4">
            <label for="fullname" class="font-semibold w-24">FullName</label>
            <InputText id="fullname" v-model="userForm.fullName" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-6 mb-4">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" v-model="userForm.email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-5 mb-4">
            <label for="address" class="font-semibold w-24">Address</label>
            <InputText id="address" v-model="userForm.address" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="password" class="font-semibold w-24">Password</label>
            <InputText id="password" v-model="userForm.password" type="password" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-center gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="saveUser"></Button>
        </div>
    </Dialog>

</div>
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';
import UserService from '@/services/UserService';

// import useToast
import {
    useToast
} from 'primevue/usetoast';

// Initialize toast service
const toast = useToast();

// import userConfirm  
import {
    useConfirm
} from "primevue/useconfirm";
const confirm = useConfirm();

const dialogHeader = ref("Add User"); // Reactive variable for dialog header

const users = ref([]);
const rows = ref(5);
const totalRecords = ref(0);
const first = ref(0);
const visible = ref(false);

const filters = ref({
    id: '',
    fullName: '',
    email: '',
    address: ''
});

// Reactive veriable so that the entered values can be saved 
const userForm = ref({
    fullName: '',
    email: '',
    address: '',
    password: ''
});

// open dialog for adding user
const openAddUserDialog = () => {
    resetForm(); // Clear the form
    dialogHeader.value = "Add User"; // Set dialog header for adding user
    visible.value = true; // open the dialog
}

// Method to open the dialog for editing the user
const editUser = (user) => {
    userForm.value = {
        ...user // copy selected user's data into form 
    };
    dialogHeader.value = "Upadate User"; // set dialog header for updating user
    visible.value = true; // open the dialog for editing

}


// Handle adding and editing users
const saveUser = () => {
    const operation = userForm.value.id ? "update" : "add"; // Determine operation type

    confirm.require({
        message: `Are you sure you want to ${operation} this user?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // Proceed with the save or update operation
            if (userForm.value.id) {
                // Update user if id exists
                UserService.updateUser(userForm.value.id, userForm.value).then(() => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User updated successfully!',
                        life: 3000
                    });

                    visible.value = false;
                    resetForm();
                    loadUsers();
                }).catch(error => {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update user.',
                        life: 3000
                    });

                    console.log("Error updating user:", error);
                });
            } else {
                // Create new user
                UserService.saveUser(userForm.value).then(() => {
                    toast.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'User added successfully!',
                        life: 3000
                    });

                    visible.value = false;
                    resetForm();
                    loadUsers();
                }).catch(error => {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to add user.',
                        life: 3000
                    });

                    console.log("Error saving user:", error);
                });
            }
        },
        reject: () => {
            // Optionally handle rejection
            toast.add({
                severity: 'info',
                summary: 'Cancelled',
                detail: `User ${operation} operation cancelled.`,
                life: 3000
            });
        }
    });
};

// Reset form after saving or canceling
const resetForm = () => {
    userForm.value = {
        fullName: '',
        email: '',
        address: '',
        password: '',
        id: null

    };
};

// Delete user method 
const deleteUser = (user) => {

    confirm.require({
        message: 'Are you sure you want to delete this user?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            UserService.deleteUser(user.id).then(() => {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User deleted successfully!',
                    life: 3000
                });

                loadUsers(); // Refresh the list after deletion
            }).catch(error => {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete user.',
                    life: 3000
                });

                console.log("Error deleting user: ", error);
            })
        }

    });

}

// fetch all users when mounted

const loadUsers = (page = 0, size = 5) => {
    UserService.getUsers(page, size, filters.value).then(response => {
        users.value = response.data.content;
        totalRecords.value = response.data.totalElements;
    }).catch(error => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to fetch users.',
            life: 3000
        });

        console.log('Error Fetching data : ', error);
    });
};

const onFilterChange = () => {
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
.button-container {
    margin: 15px 25px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}

.card {
    font-size: 1.3em;
}
</style>
