<template>
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
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">Isometric locations</h3>
            <p>Exterior locations, building and location interiors in an isometric style</p>
        </div>
        <div class="illustration-example">
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">Top-down interiors</h3>
            <p class="illustration-example--text">Top-down style maps of building and location interiors</p>
        </div>
        <div class="illustration-example">
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">Top-down exteriors</h3>
            <p class="illustration-example--text">Top-down style maps of exterior locations including towns and settlements</p>
        </div>
        <div class="illustration-example">
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">Region maps</h3>
            <p class="illustration-example--text">Maps of larger areas including settlements, natural features and points of interest</p>
        </div>
        <div class="illustration-example">
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">Sideview maps</h3>
            <p class="illustration-example--text">Cutaway-style maps showing interior locations in cross-section</p>
        </div>
        <div class="illustration-example">
            <div class="illustration-example--image" />
            <h3 class="illustration-example--title">More!</h3>
            <p class="illustration-example--text">Also able to create hexmaps and maps in other styles - just ask!</p>
        </div>
    </div>
</template>

<style lang="scss">
.illustration-examples {
    display: flex;
    align-items: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
    }
}

.illustration-example {
    max-width: 20rem;
    text-align: center;

    &--image {
      background-image: url("/images/drawing-snippet-isometric.jpg");
      background-size: cover;
      background-position: center;
      border: 5px solid var(--primary-color-light);
      border-radius: 10rem;
      height: 10rem;
      margin: 0 auto;
      width: 10rem;
   }
   &--title {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
   }
   &--text {
      margin-top: 0.1rem;
   }
}
</style>