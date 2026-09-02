<script setup>
import { defineProps } from 'vue';
defineProps({
    bg: {
        type: String,
        required: false,
        default: 'bg-gray-100',
    },
})

</script>
<template>
    <div :class="`${bg} p-6 m-6 rounded-lg shadow-md`">
        <slot>
            
        </slot>
    </div>
</template>