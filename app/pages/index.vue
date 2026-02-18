<script setup>
import { ref, nextTick, onUnmounted } from 'vue'

const showImageModal = ref(false)
const modalTrigger = ref(null)
let previousActive = null
const currentModalImageObject = ref(null)

const modalObjects = [
    {
        type: 'isometric',
        imageSrc: '/images/drawing-snippet-isometric.jpg',
        title: 'Isometric locations'
    },
    {
        type: 'topdown-interior',
        imageSrc: '/images/drawing-snippet-topdown-interior.jpg',
        title: 'Top-down interiors'
    },
    {
        type: 'topdown-exterior',
        imageSrc: '/images/drawing-snippet-topdown-exterior.jpg',
        title: 'Top-down exteriors'
    },
    {
        type: 'region',
        imageSrc: '/images/drawing-snippet-region.jpg',
        title: 'Region maps'
    },
    {
        type: 'sideview',
        imageSrc: '/images/drawing-snippet-sideview.jpg',
        title: 'Sideview maps'
    },
    {
        type: 'hexmap',
        imageSrc: '/images/drawing-snippet-hexmap.jpg',
        title: 'Hexmaps and more'
    }
]

function openModal(imageType) {
    const found = modalObjects.find(obj => obj.type === imageType)
    if (found) {
        // Safely capture the active element; guard against SSR/nav issues
        previousActive = typeof document !== 'undefined' ? document.activeElement : null
        currentModalImageObject.value = found
        showImageModal.value = true
    }
}

function handleModalClose() {
    showImageModal.value = false
    nextTick(() => {
        if (previousActive && typeof previousActive.focus === 'function') {
            previousActive.focus()
        }
    })
}

onUnmounted(() => {
    // Clear stale DOM references when leaving the page to prevent nav issues
    previousActive = null
    showImageModal.value = false
})
</script>

<template>
    <div class="page-container">
        <img
            src="/images/banner.jpg"
            alt="Ways Unseen Homepage Banner"
            class="hero-image"
        >
        <h1 class="page-title">
            Ways Unseen - hand-drawn fantastical maps of dungeons, strange lands and unexpected places!
        </h1>
        <div class="illustration-examples">
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__isometric"
                    role="button"
                    tabindex="0"
                    aria-label="Open isometric image"
                    @click="openModal('isometric')"
                    @keydown.enter="openModal('isometric')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">Isometric locations</h3>
                <p>Exterior locations, building and location interiors in an isometric style</p>
            </div>
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__topdown-interior"
                    role="button"
                    tabindex="0"
                    aria-label="Open top-down interior image"
                    @click="openModal('topdown-interior')"
                    @keydown.enter="openModal('topdown-interior')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">Top-down interiors</h3>
                <p class="illustration-example--text">Top-down style maps of building and location interiors</p>
            </div>
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__topdown-exterior"
                    role="button"
                    tabindex="0"
                    aria-label="Open top-down exterior image"
                    @click="openModal('topdown-exterior')"
                    @keydown.enter="openModal('topdown-exterior')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">Top-down exteriors</h3>
                <p class="illustration-example--text">Top-down style maps of exterior locations including towns and settlements</p>
            </div>
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__region"
                    role="button"
                    tabindex="0"
                    aria-label="Open region map image"
                    @click="openModal('region')"
                    @keydown.enter="openModal('region')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">Region maps</h3>
                <p class="illustration-example--text">Maps of larger areas including settlements, natural features and points of interest</p>
            </div>
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__sideview"
                    role="button"
                    tabindex="0"
                    aria-label="Open sideview image"
                    @click="openModal('sideview')"
                    @keydown.enter="openModal('sideview')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">Sideview maps</h3>
                <p class="illustration-example--text">Cutaway-style maps showing interior locations in cross-section</p>
            </div>
            <div class="illustration-example">
                <div
                    class="illustration-example--image illustration-example--image__hexmap"
                    role="button"
                    tabindex="0"
                    aria-label="Open hexmap image"
                    @click="openModal('hexmap')"
                    @keydown.enter="openModal('hexmap')"
                    ref="modalTrigger"
                />
                <h3 class="illustration-example--title">More!</h3>
                <p class="illustration-example--text">Also able to create hexmaps and maps in other styles - just ask!</p>
            </div>
        </div>
        <section class="section section--commission">
            <h2>Interested in a commission?</h2>
            <div class="section-image">
                <img src="/images/iso-room-1.png" alt="Isometric room example" />
            </div>
            <p>I love contributing maps to other people's projects and take great pride in the quality of the illustrations I provide. I've drawn maps for roleplaying games, boardgame conventions, virtual tabletop services, adventure gamebooks and more! Give me a shout if you are interested in working together to create a map for your product!</p>
            <NuxtLink to="/commissions" class="section-button">Commission Process</NuxtLink>
        </section>
        <section class="section section--about">
            <h2>About Ways Unseen</h2>
            <div class="section-image">
                <img src="/images/iso-room-2.png" alt="Isometric room example 2" />
            </div>
            <p>I'm a fantasy map illustrator, living in Norfolk in the east of England. I've always enjoyed drawing, though for much of my life, I have shied away from actually putting pencil to paper. Now that's changed and I never want to stop! I gain a great deal of pleasure from realise fantastical places in my illustrations...</p>
            <NuxtLink to="/about" class="section-button">Find out more</NuxtLink>
        </section>
    </div>
    <Transition name="image-modal" appear>
        <AppImageModal
            v-if="showImageModal"
            :image-src="currentModalImageObject ? currentModalImageObject.imageSrc : ''"
            :title="currentModalImageObject ? currentModalImageObject.title : ''"
            @close="handleModalClose"
        />
    </Transition>
</template>

<style lang="scss">
.page-container {
    background-color: var(--primary-color-dark);
}

.page-title {
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.25rem;
    max-width: 50rem;
    margin: 2rem auto 2rem;
}

@media (max-width: 1024px) {
    .page-title {
        font-size: 1.75rem;
    }
}

@media (max-width: 480px) {
    .page-title {
        font-size: 1.25rem;
    }
}

.illustration-examples {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    padding-bottom: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
}

.illustration-example {
    max-width: 20rem;
    text-align: center;

    @media (min-width: 769px) and (max-width: 1023px) {
        flex: 0 0 calc(50% - 1rem);
    }
    
    @media (min-width: 1024px) {
        flex: 0 0 calc(33.333% - 1.35rem);
    }

    &--image {
      background-size: cover;
      background-position: center;
      border: 5px solid var(--primary-color-light);
      border-radius: 10rem;
      cursor: pointer;
      height: 10rem;
      margin: 0 auto;
      width: 10rem;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
        &:hover, &:focus {
            transform: scale(1.04);
            box-shadow: 0 6px 18px rgba(0,0,0,0.18);
            outline: none;
        }
      &__isometric {
        background-image: url("/images/drawing-snippet-isometric.jpg");
      }
      &__topdown-interior {
        background-image: url("/images/drawing-snippet-topdown-interior.jpg");
      }
      &__topdown-exterior {
        background-image: url("/images/drawing-snippet-topdown-exterior.jpg");
      }
      &__region {
        background-image: url("/images/drawing-snippet-region.jpg");
      }
      &__sideview {
        background-image: url("/images/drawing-snippet-sideview.jpg");
      }
      &__hexmap {
        background-image: url("/images/drawing-snippet-hexmap.jpg");
      }
   }
   &--title {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
   }
   &--text {
      margin-top: 0.1rem;
   }
}

.section {
    text-align: center;
    padding: 1rem 1rem 2.5rem 1rem;
    margin: 0;

    p {
        max-width: 45rem;
        margin: 0 auto 2rem;
    }

    .section-image {
        margin: 0 auto 1rem;
        max-width: 15rem;
        img {
            width: 100%;
            height: auto;
        }
    }
}

.section--about {
    background-color: var(--primary-color-dark);
}
.section--commission {
    background-color: var(--primary-color-darker);
}

.section-button {
    border-radius: 0.2rem;
    background-color: var(--primary-color);
    color: var(--primary-color-lightest);
    padding: 0.75rem 1rem;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--primary-color-dark);
        color: var(--primary-color-lighter);
    }
}
</style>