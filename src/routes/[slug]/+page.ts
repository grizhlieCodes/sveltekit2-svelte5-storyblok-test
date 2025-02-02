import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { storyblokApi } = await parent();
	let slug = params.slug;
	const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
		version: 'draft'
	});

	try {
		const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft'
		});

		if (!dataStory?.data?.story) {
			throw error(404, 'Story not found');
		}

		return {
			story: dataStory.data.story
		};
	} catch (err) {
		throw redirect(307, '/404');
	}
};
