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
                <ul class="burger-menu-items">
                    <li class="burger-menu-item">
                        <NuxtLink
                        :to="{ name: 'index' }"
                        @click="hideBurgerMenu"
                        >
                        Home
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        :to="{ name: 'About' }"
                        @click="hideBurgerMenu"
                        >
                        About
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        :to="{ name: 'Commissions' }"
                        @click="hideBurgerMenu"
                        >
                        Commissions
                        </NuxtLink>
                    </li>
                    <li class="burger-menu-item">
                        <NuxtLink
                        :to="{ name: 'Contact' }"
                        @click="hideBurgerMenu"
                        >
                        Contact
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </Transition>
        <nav class="container nav">
            <div
               class="hamburger"
               :class="{ 'active': showMenu }"
               @click="toggleShowMenu"
            >
                <div class="line" />
                <div class="line" />
                <div class="line" />
            </div>
            <NuxtLink :to="{ name: 'index' }" class="nav-logo">
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
                        :to="{ name: 'index' }"
                        class="nav-logo"
                        >
                            Home
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink
                        :to="{ name: 'About' }"
                        class="nav-link"
                        >
                        About
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                        :to="{ name: 'Contact' }"
                        class="nav-link"
                        >
                        Contact
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                        :to="{ name: 'Commissions' }"
                        class="nav-link"
                        >
                            <Button class="commissions-btn">
                            Commissions
                            </Button>
                        </NuxtLink>
                    </li>
                </ul>
                <div class="socials-container">
                    <div>
<a
                        href="https://bsky.app/profile/ways-unseen.bsky.social"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Bluesky profile"
                        title="Open Bluesky profile"
                    >
                        <img src="/images/icon-bluesky.svg" alt="Bluesky" width="28" height="28" />
                    </a>
                    </div>
                    <div>
                <a
                        href="https://www.instagram.com/ways.unseen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Instagram profile"
                        title="Open Instagram profile"
                    >
                        <img src="/images/icon-instagram.svg" alt="Instagram" width="28" height="28" />
                    </a>
                    </div>
                    <div>
                <a
                        href="https://cara.app/waysunseen"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Cara profile"
                        title="Open Cara profile"
                    >
                        <img src="/images/icon-cara.svg" alt="Cara" width="28" height="28" />
                    </a>
                </div>
                </div>
                
            </div>
        </nav>   
    </div>
</template>

<style scoped>
.nav {
    padding: 0.25rem;
    display: flex;
    position: relative;
}
.nav-menu {
    visibility: hidden;

    @media (min-width: 768px) {
        visibility: visible;
    }
}
.socials-container {
    visibility: hidden;
    padding-left: 2rem;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
        visibility: visible;
    }
}
.socials-container a {
    margin-left: 0.75rem;
}

.hamburger {
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    top: 0.5rem;
    right: 1rem;
    position: absolute;
    z-index: 1000;

    @media (min-width: 768px) {
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
    background-color: var(--primary-color-light);
    height: 100%;
    width: 100%;
    max-width: 400px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
}
.burger-menu-items {
    margin-left: 0.25rem;
    margin-top: 2.5rem;
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
.navbar-container {
    background-color: var(--primary-color);
    li {
        font-size: 1.05rem;
    }
}
.commissions-btn {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    margin-left: 1rem;
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