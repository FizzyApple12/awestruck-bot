import { Message, RawFile } from "discord.js";

export type VideoFile = {
    data: Buffer;
    extension: string;
};

export type VideoGenerationFunction = (message: Message<boolean>) => VideoFile;

export type Engine = {
    generateVideo: VideoGenerationFunction;
}