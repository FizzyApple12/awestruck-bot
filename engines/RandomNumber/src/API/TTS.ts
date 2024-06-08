import { LOCAL_API_PORT, TTS_RETURN_TYPE } from "../config";

const getDuration = (src: string): Promise<number> => {
    return new Promise((resolve) => {
        const audio = new Audio();

        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        }

        audio.src = src;
    });
}

export const RetrieveTTS = async (
	text: string
): Promise<{file: string; length: number}> => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text,
		}),
	};

	const response = await fetch(
		`http://localhost:${LOCAL_API_PORT}/tts`,
		options
	);

	const {audio} = JSON.parse(await response.json());

    console.log(audio)

    const audioFile = `data:${TTS_RETURN_TYPE};base64,${audio}`;

	return {
		file: audioFile,
		length: await getDuration(audioFile),
	};
};