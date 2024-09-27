<template>
    <div class="card" style="font-size: 1.3em;">
        <Menubar :model="items" />
    </div>
</template>

<script setup>
import { ref } from "vue";

// To use the router Programmatically
import { useRouter } from "vue-router";

// Using the router to navigate programmatically
const router = useRouter();

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/')

    },{
        label: 'Users',
        icon: 'pi pi-users',
        command: () => router.push('/users')
    },
    {
        label: 'Projects',
        icon: 'pi pi-star',
        command: () => router.push('/projects')
    },
    {
        label: 'Tasks',
        icon: 'pi pi-search',
        command: () => router.push('/tasks')
        
    }
]);
</script>