<script setup>
const router = useRouter()

const goToCommissions = () => {
    router.push('/commissions')
}
</script>

<template>
    <button class="commissions-btn" @click="goToCommissions">
        Commission a map
    </button>    
</template>

<style scoped>
.commissions-btn {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    line-height: 0.8;
}
</style>