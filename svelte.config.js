import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeUnwrapImages from 'rehype-unwrap-images';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
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
			$lib: './src/lib'
		}
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeUnwrapImages],
			smartypants: {
				dashes: 'oldschool'
			}
		})
	]
};

export default config;
