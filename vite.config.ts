import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		host: true
	},
	resolve: {
		alias: {
			$content: '/src/content'
		}
	},
	assetsInclude: ['**/*.md'],
	optimizeDeps: {
		include: ['mdsvex']
	}
});
