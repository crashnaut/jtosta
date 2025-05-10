import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { browser } from '$app/environment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to preload images ahead of time for better performance
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!browser) return resolve(new Image()); // Skip in SSR
    
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Cache for already preloaded images to avoid redundant preloading
 */
const preloadedImages = new Set<string>();

/**
 * Preload multiple images at once
 */
export const preloadImages = (srcs: string[]): void => {
  if (!browser) return;
  
  srcs.forEach(src => {
    if (preloadedImages.has(src)) return;
    
    preloadedImages.add(src);
    preloadImage(src).catch(() => {
      // If preloading fails, remove from cache so we can try again later
      preloadedImages.delete(src);
    });
  });
};

/**
 * Action to preload images when hovering over links
 */
export function preloadOnHover(node: HTMLElement, urls: string[] | (() => string[])): { destroy: () => void } {
  if (!browser) return { destroy: () => {} };
  
  const handleMouseEnter = () => {
    const imagesToPreload = typeof urls === 'function' ? urls() : urls;
    preloadImages(imagesToPreload);
  };
  
  node.addEventListener('mouseenter', handleMouseEnter);
  
  return {
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
    }
  };
}
