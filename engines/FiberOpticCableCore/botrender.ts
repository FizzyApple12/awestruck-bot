import { RenderConfig } from '../../src/config'
import { webpackOverride } from './src/webpack-override';

const config: RenderConfig = {
    templateName: "Fiber Optic Cable Core",
    compositionName: 'MainComposition',
    entryPoint: "./engines/FiberOpticCableCore/src/index.ts",
    renderOptions: {
        imageFormat: 'jpeg',
    },
    webpackOverride,
};

export default config;