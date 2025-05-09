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
            fallback: 'index.html',
            precompress: false,
            strict: true
        }),
        alias: {
            $lib: './src/lib'
        },
        prerender: {
            handleMissingId: 'ignore',
            handleHttpError: ({ path, referrer, message }) => {
                // Ignore errors during prerendering, especially for the blog pages
                if (path.startsWith('/blog')) {
                    return;
                }
                
                // Ignore 404s from prerendering
                if (message.includes('404')) {
                    return;
                }
                
                // For all other errors, throw as usual
                throw new Error(message);
            }
        },
        paths: {
            base: ''
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
