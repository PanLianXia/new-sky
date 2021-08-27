<template>
    <div class="text-block" contenteditable="false">
        {{fileName}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        fileName: {
            type: String,
            required: true
        }
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
    .text-block {
        width: 200px;
        border: 1px solid #000;
    }
</style>
