import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		prerender: {
			handleMissingId: 'ignore'
		},
		alias: {
			'@': './src',
			'$components': './src/components',
			'$lib': './src/lib'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
