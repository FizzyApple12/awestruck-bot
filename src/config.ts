import 'dotenv/config';

export const CLIENT_ID: string = process.env.CLIENT_ID ?? "";
export const TOKEN: string = process.env.TOKEN ?? "";

import FiberOpticCableCore from "./engines/FiberOpticCableCore";

export const Engines = [
    FiberOpticCableCore
]