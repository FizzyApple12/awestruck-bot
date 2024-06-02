import {AbsoluteFill} from 'remotion';
import {Logo} from './Logo';
import {Subtitle} from './Subtitle';
import {Title} from './Title';
import {z} from 'zod';

export const MainCompositionSchema = z.object({
	message: z.any(),
});

export const MainComposition: React.FC<z.infer<typeof MainCompositionSchema>> = ({
	message,
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<div className="m-10" />
			<Logo logoColor="#0000ff" />
			<div className="m-3" />
			<Title titleText={message.content} titleColor="#0000ff" />
			<Subtitle />
		</AbsoluteFill>
	);
};
