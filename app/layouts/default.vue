<template>
    <div>
        <AppNavBar />
        <main class="container">
            <Transition mode="out-in">
                <slot />
            </Transition>
        </main>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>