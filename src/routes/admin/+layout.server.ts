import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Since we're using client-side auth with prerendering,
// we need to make the server-side load function as simple as possible
export const load: LayoutServerLoad = async ({ parent }) => {
  const parentData = await parent();
  
  // Just pass through the parent data
  return {
    ...parentData
  };
};