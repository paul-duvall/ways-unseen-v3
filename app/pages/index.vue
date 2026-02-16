<template>
    <div>
        <img
            src="/images/banner.jpg"
            alt="Ways Unseen Homepage Banner"
            style="width: 100vw"
        >
        <h1 style="margin-top: 1rem; text-align: center;">
            Ways Unseen - creator of hand-drawn fantastical maps,<br> dungeons and unexpected places!
        </h1>
        <div class="illustration-examples">
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__isometric" />
                <h3 class="illustration-example--title">Isometric locations</h3>
                <p>Exterior locations, building and location interiors in an isometric style</p>
            </div>
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__topdown-interior" />
                <h3 class="illustration-example--title">Top-down interiors</h3>
                <p class="illustration-example--text">Top-down style maps of building and location interiors</p>
            </div>
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__topdown-exterior" />
                <h3 class="illustration-example--title">Top-down exteriors</h3>
                <p class="illustration-example--text">Top-down style maps of exterior locations including towns and settlements</p>
            </div>
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__region" />
                <h3 class="illustration-example--title">Region maps</h3>
                <p class="illustration-example--text">Maps of larger areas including settlements, natural features and points of interest</p>
            </div>
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__sideview" />
                <h3 class="illustration-example--title">Sideview maps</h3>
                <p class="illustration-example--text">Cutaway-style maps showing interior locations in cross-section</p>
            </div>
            <div class="illustration-example">
                <div class="illustration-example--image illustration-example--image__more" />
                <h3 class="illustration-example--title">More!</h3>
                <p class="illustration-example--text">Also able to create hexmaps and maps in other styles - just ask!</p>
            </div>
        </div>
        <section class="section section--commission">
            <h2>Interested in a commission?</h2>
            <p>I love contributing maps to other people's projects. I've drawn maps for roleplaying games, boardgame conventions, virtual tabletop services and more! Give me a shout if you are interested in commissioning me to create a map for you!</p>
            <NuxtLink to="/Commissions" class="section-button">Commission Process</NuxtLink>
        </section>
        <section class="section section--about">
            <h2>About me!</h2>
            <p>I'm a fantasy map illustrator of sorts, living in the east of England in a county called Norfolk. I've always enjoyed drawing, though for much of my life, I have shied away from actually putting pencil to paper. Now that I've started in earnest, I never want to stop!</p>
            <NuxtLink to="/About" class="section-button">Find out more</NuxtLink>
        </section>
    </div>
</template>

<style lang="scss">
.illustration-examples {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    
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
      height: 10rem;
      margin: 0 auto;
      width: 10rem;
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
      &__more {
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
    margin: 0;
    padding: 1rem 0;
    text-align: center;

    h2 {
        margin-bottom: 1rem;
        color: var(--secondary-color);
    }

    p {
        max-width: 600px;
        margin: 0 auto 2rem;
    }
}

.section--about {
    background-color: var(--primary-color-dark);
}
.section--commission {
    background-color: var(--primary-color-light);
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