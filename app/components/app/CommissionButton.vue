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
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    line-height: 1.2;
    font-size: 1.05rem;
    transition: background-color 0.2s;
}

.commissions-btn:hover {
    background-color: var(--secondary-color-dark);
}
</style>