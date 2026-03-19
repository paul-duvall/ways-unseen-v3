        <script setup>
import { ref } from 'vue'

const showMenu = ref(false)

const toggleShowMenu = (() => {
    showMenu.value = !showMenu.value
})

const hideBurgerMenu = (() => {
    showMenu.value = false
})
</script>

<template>
    <div class="navbar-container">
        <Transition>    
            <div
              v-if="showMenu"
              class="burger-menu"
            >
                <AppCommissionButton
                    @click="hideBurgerMenu"
                    class="burger-menu-btn"
                />
                <ul class="burger-menu-items">
                    <li class="burger-menu-item">
                        <NuxtLink
                        to="/"
                        @click="hideBurgerMenu"
                        >
                        Home
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        to="/about"
                        @click="hideBurgerMenu"
                        >
                        About
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        to="/creations"
                        @click="hideBurgerMenu"
                        >
                        Creations
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        to="/contact"
                        @click="hideBurgerMenu"
                        >
                        Contact
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </Transition>
        <nav class="nav">
            <div
               class="hamburger"
               :class="{ 'active': showMenu }"
               @click="toggleShowMenu"
            >
                <div class="line" />
                <div class="line" />
                <div class="line" />
            </div>
            <NuxtLink to="/" class="nav-logo">
                <img
                    src="/images/logo-white.png"
                    alt="Ways Unseen Logo"
                    width="70"
                >
            </NuxtLink>

            <div style="display: flex;">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <NuxtLink
                        to="/"
                        class="nav-link"
                        >
                            Home
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink
                        to="/about"
                        class="nav-link"
                        >
                            About
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink
                        to="/creations"
                        class="nav-link"
                        >
                            Creations
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                        to="/contact"
                        class="nav-link"
                        >
                            Contact
                        </NuxtLink>
                    </li>
                    <AppCommissionButton style="margin-left: 1.25rem; "/>
                </ul>
                <div class="socials-container">
                    <AppSocialLinks />
                </div>
            </div>
        </nav>   
    </div>
</template>

<style scoped>
.navbar-container {
    background-color: var(--primary-color);
    max-width: 100vw;
    overflow-x: hidden;
    li {
        font-size: 1.05rem;
        margin-left: 1rem;
    }
}
.nav {
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    max-width: 100vw;
    padding-right: 0.75rem;
}
.nav-logo img {
    width: 70px;
    height: auto;
    max-width: none;
    display: block;
}
@media (max-width: 360px) {
    .nav-logo img {
        width: 56px;
    }
}
.nav-menu {
    visibility: hidden;
    display: flex;
    align-items: center;

    @media (min-width: 1024px) {
        visibility: visible;
    }
}
.socials-container {
    margin-left: 1rem;
    visibility: hidden;

    @media (min-width: 1024px) {
        visibility: visible;
    }
}

.hamburger {
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    top: 0.5rem;
    right: 1rem;
    position: absolute;
    z-index: 1000;

    @media (min-width: 1024px) {
        display: none;
    }
}
.hamburger div:nth-child(1) {
    top: 25%;
}
.hamburger div:nth-child(3) {
    top: 75%;
}
.hamburger.active div:nth-child(1) {
    top: 75%;
    transform: translate(-50%, -50%) rotate(45deg);
}
.hamburger.active div:nth-child(2) {
    top: 50%;
    opacity: 0;
}
.hamburger.active div:nth-child(3) {
    transform: translate(-50%, -50%) rotate(-45deg);
}
.line {
    height: 0.25rem;
    width: 100%;
    background-color: var(--primary-color-lightest);
    border-radius: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: .3s ease;
}
.burger-menu {
    background-color: var(--primary-color);
    height: 100%;
    width: 100%;
    max-width: 400px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
}
.burger-menu-btn {
    margin-left: 1.5rem;
    margin-top: 3.5rem;
}
.burger-menu-items {
    margin-top: 1.5rem;
}
.burger-menu-item {
    list-style: none !important;
    margin-bottom: 1rem;

    a {
        color: var(--primary-color-lightest);
        font-size: 1.25rem;
        text-decoration: none;
    }
    a:hover {
        color: var(--primary-color-lighter);
    }
}

li {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.v-enter-active,
.v-leave-active {
transition: transform 0.35s ease, opacity 0.35s ease;
}

/* entering: start off to the right and invisible */
.v-enter-from {
transform: translateX(100%);
}

.v-enter-to {
transform: translateX(0);
}

/* leaving: reverse of entering */
.v-leave-from {
transform: translateX(0);
}

.v-leave-to {
transform: translateX(100%);
}
</style>