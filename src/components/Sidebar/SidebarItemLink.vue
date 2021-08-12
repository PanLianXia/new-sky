<template>
    <router-link :to="to"><slot /></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'SidebarItemLink',
    props: {
        to: String
    },
    setup() {
        
    },
})
</script>
