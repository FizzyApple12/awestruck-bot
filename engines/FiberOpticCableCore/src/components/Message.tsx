import {useVideoConfig} from 'remotion';
import {Img} from 'remotion';
import {FC} from 'react';
import {Textfit} from 'react-textfit';

export type MessageComponentProps = {
	content: string;
	username: string;
	avatar: string;
};

export const MessageComponent: FC<MessageComponentProps> = ({
	content,
	username,
	avatar,
}) => {
	const {width, height} = useVideoConfig();

	return (
		<div
			style={{
				width,
				height,
			}}
			className="flex flex-row text-5xl font-bold leading-relaxed "
		>
			<div className="absolute top-0 left-0 flex flex-row justify-items-center w-screen h-[20vh]">
				<Img
					src={avatar}
					alt="Avatar Image"
					className="rounded-[50%] aspect-square h-[20vh] mr-4"
				/>
				<Textfit
					mode="single"
					forceSingleModeWidth={false}
                    style={{
                        width: "calc(100vw - (20vh + 16px))"
                    }}
					className="h-[20vh] flex-grow"
				>
					{username}
				</Textfit>
			</div>
			<Textfit
				className="absolute top-[20vh] left-0 w-screen h-[80vh]"
				mode="multi"
			>
				{content}
			</Textfit>
		</div>
	);
};
