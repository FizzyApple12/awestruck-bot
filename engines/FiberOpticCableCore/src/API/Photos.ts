import {PEXELS_API_KEY, PEXELS_RESULTS_PER_PAGE} from '../config';

export const RetrievePhoto = async (query: string): Promise<string> => {
	const response = await fetch(
		`https://api.pexels.com/v1/search?query=${query}&per_page=${PEXELS_RESULTS_PER_PAGE}`,
		{headers: {Authorization: PEXELS_API_KEY}}
	);

	const {photos} = await response.json();

	// eslint-disable-next-line @remotion/deterministic-randomness
	const targetPhoto = photos[Math.floor(Math.random() * (photos.length - 1))];

    if (targetPhoto) {
        return targetPhoto.src.original;
    }

    return "https://agreatdream.com/wp-content/uploads/2012/04/question-mark.jpg";
};
