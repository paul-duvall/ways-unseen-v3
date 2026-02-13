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
    </div>
</template>

<style>
.illustration-examples {
    display: flex;
    justify-content: center;
}
.illustration-example {
    max-width: 20rem;
    text-align: center;
}
.illustration-example--image {
    background-image: url("/images/drawing-snippet-isometric.jpg");
    background-size: cover;
    background-position: center;
    border: 5px solid var(--primary-color-light);
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
    margin: 0 auto;
}
.illustration-example--title {
    margin-top: 0.8rem;
}
</style>