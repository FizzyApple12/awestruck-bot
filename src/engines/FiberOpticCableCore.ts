import { Message, RawFile } from "discord.js";
import { Engine, VideoFile, VideoGenerationFunction } from "../engine"


const generateVideo: VideoGenerationFunction = (message: Message<boolean>): VideoFile => {
    // TODO: Actually generate the video lmfao

    return {
        data: new Buffer([]),
        extension: "mp4"
    }
};

const FiberOpticCableCore: Engine = {
    generateVideo
}

export default FiberOpticCableCore;