import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		host: true,
		fs: {
			allow: ['..']
		}
	},
	resolve: {
		alias: {
			$content: '/src/content'
		}
	},
	assetsInclude: ['**/*.md'],
	optimizeDeps: {
		include: ['mdsvex']
	},
	build: {
		target: 'esnext',
		// Optimize asset caching by hashing assets and setting them to be immutable
		assetsInlineLimit: 4096, // Only inline assets smaller than 4kb
		rollupOptions: {
			output: {
				// Use content hashing for better caching
				assetFileNames: 'assets/[name].[hash].[ext]',
			}
		}
	}
});
