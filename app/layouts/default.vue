<template>
    <div class="layout-wrapper">
        <AppNavBar />
        <main class="container">
            <Transition mode="out-in">
                <slot />
            </Transition>
        </main>
        <AppFooter />
    </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1; 
  padding: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>