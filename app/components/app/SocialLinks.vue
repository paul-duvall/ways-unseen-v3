<script setup lang="ts">
interface Props {
  light?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  light: false
})
</script>

<template>
    <div class="social-links" :class="{ 'social-links--light': light }">
        <a
            href="https://bsky.app/profile/ways-unseen.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Bluesky profile"
            title="Open Bluesky profile"
        >
            <img src="/images/icon-bluesky.svg" alt="Bluesky" width="28" height="28" />
        </a>
        <a
            href="https://www.instagram.com/ways.unseen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram profile"
            title="Open Instagram profile"
        >
            <img src="/images/icon-instagram.svg" alt="Instagram" width="28" height="28" />
        </a>
        <a
            href="https://cara.app/waysunseen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Cara profile"
            title="Open Cara profile"
        >
            <img src="/images/icon-cara.svg" alt="Cara" width="28" height="28" />
        </a>
        <a
            href="https://ways-unseen.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Itch profile"
            title="Open Itch profile"
        >
            <img src="/images/icon-itch.svg" alt="Itch" width="35" height="35" />
        </a>
    </div>
</template>

<style scoped>
.social-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.social-links a {
    display: inline-flex;
    align-items: center;
    transition: opacity 0.2s, transform 0.2s;
}

.social-links a:hover {
    opacity: 0.6;
    transform: scale(1.1);
}

.social-links img {
    display: block;
}

.social-links--light img {
    filter: invert(1);
}

.social-links--light a:hover img {
    filter: invert(1) opacity(0.6);
}
</style>
