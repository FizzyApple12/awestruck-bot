import {Img} from 'remotion';
import { FC } from 'react';

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
	return (
		<div
			className="flex flex-row text-5xl font-bold leading-relaxed"
		>
            <Img src={avatar} alt="Avatar Image" className='rounded-[50%]' />
			<div className="flex flex-col">
				<p>{username}</p>
				<p>{content}</p>
			</div>
		</div>
	);
};
