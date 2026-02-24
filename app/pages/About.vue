<template>
    <div class="container">
        <section>
            <h2>About</h2>
            <p>
                I'm a fantasy map illustrator of sorts, living in the east of England in a county called Norfolk. I've always enjoyed drawing, though for much of my life, I have shied away from actually putting pencil to paper. Now that I've started in earnest, I never want to stop!
            </p>
            <figure class="about-figure about-figure-left">
                <img src="/images/about-1.jpg" alt="A typical North Norfolk scene" class="about-image" />
                <figcaption class="about-caption">A typical North Norfolk scene - it's a beautiful county.</figcaption>
            </figure>
            <p>
                I started out drawing top-down maps when I discovered solo tabletop gaming (games like Four Against Darkness and Notequest) that require simple dungeon maps to be drawn as you play that game. Instead of sketching out purely functional outlines, I found myself compelled to take my time and make my maps beautiful.
            </p>
            <p>
                In the years since, I've been creating and sharing maps in an increasingly broad range of styles. After starting with traditional top-down style maps, I progressed onto more challenging isometric locations. These proved quite popular and my social media following grew quickly.
            </p>
            <figure class="about-figure about-figure-right">
                <img src="/images/about-2.jpg" alt="A work-in-progress shot of a side-view map" class="about-image" />
                <figcaption class="about-caption">A work-in-progress shot of a side-view map.</figcaption>
            </figure>
            <p>
                This increased exposure led to commission requests and I've now worked with a number of clients to produce high-quality hand-drawn maps to help them realise their creations. I really value these opportunities to create illustrations for a range of publications, not only because it is lovely to see my maps in print and being enjoyed by people, but also as working on commissions challenges me to draw subjects I might otherwise not attempt. The creativity and imagination of my clients encourages me to broaden my range and produce illustrations of the highest possible quality.
            </p>
            <p>
                As time has gone on, I've broadened the range of map styles, including region and town maps, hex-maps and cut away maps, each enabling me to represent locations in different ways.
            </p>
            <p>
                Thanks for your interest in my work. You can find out more about my commission process <NuxtLink to="/Commissions">here</NuxtLink>.
            </p>
        </section>
    </div>
</template>

<style scoped>
.container {
    background-color: var(--primary-color-dark);
    padding: 2rem;
}
h2 {
    text-align: center;
}
section {
    margin: 0 auto 2rem;
    max-width: 45rem;
}
.about-figure {
    margin: 0 0 1rem 0;
}
.about-image {
    width: 100%;
    border-radius: 0.5rem;
    display: block;
}
.about-caption {
    font-size: 0.85rem;
    font-style: italic;
    margin-top: 0.25rem;
    text-align: center;
}
@media (min-width: 768px) {
    .about-figure {
        max-width: 40%;
    }
    .about-figure-left {
        float: left;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
    }
    .about-figure-right {
        float: right;
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
}
</style>