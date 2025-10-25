<script setup>
import { Translated } from '@/store/translate';
import logo from '@/assets/img/logo-152.png';
import githubLogo from '@/assets/img/github-mark.svg';
import twitterLogo from '@/assets/img/twitter-blue.svg';

const links = [
    {
        label: 'GitHub',
        logoSrc: githubLogo,
        to: 'https://github.com/ocelot2024/Draface',
    },
    {
        label: '@rigel_makao',
        logoSrc: twitterLogo,
        to: 'https://twitter.com/rigel_makao',
    },
];
</script>

<template>
    <div class="about-content">
        <img class="logo" :src="logo" :alt="`Logo of ${Translated.data.brand.normal}`" />
        <h1>{{ Translated.data.brand.normal }}</h1>
        <p class="description">{{ Translated.data.hq.about.describe }}</p>

        <div class="links">
            <div v-for="link in links" :key="link.label" class="link-item">
                <a :href="link.to" target="_blank" rel="noopener noreferrer">
                    <img :src="link.logoSrc" :alt="link.label" class="link-logo" />
                    <p>{{ link.label }}</p>
                </a>
            </div>
        </div>
        <p class="license">
            このリポジトリは
            <a href="https://www.gnu.org/licenses/agpl-3.0.txt" target="_blank" rel="noopener noreferrer">
                GNU AGPLv3
            </a>
            のもと配布されています。
        </p>
        <p class="license">
            詳しくはリポジトリの
            <a href="https://github.com/ocelot2024/Draface/blob/efb0694a8f48d2d0d86ab7783a9bc39fa7c016be/LICENCE.md"
                target="_blank" rel="noopener noreferrer">
                LICENCE.md
            </a>
            ファイルをご確認ください。
        </p>
    </div>
</template>

<style scoped>
.about-content {
    text-align: center;
    padding: var(--spacing-8);
}

.logo {
    width: 152px;
    height: auto;
    margin-bottom: var(--spacing-4);
}

.description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-8);
}

.links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-8);
    margin-bottom: var(--spacing-8);
}

.link-item {
    text-align: center;
}

.link-logo {
    width: 48px;
    height: 48px;
    margin-bottom: var(--spacing-2);
}

.license {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: var(--spacing-2);
}
</style>
