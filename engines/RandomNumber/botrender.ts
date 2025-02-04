import { RenderConfig } from '../../src/config'
import { webpackOverride } from './src/webpack-override';

const config: RenderConfig = {
    templateName: "Random Number",
    compositionName: 'MainComposition',
    entryPoint: "./engines/RandomNumber/src/index.ts",
    renderOptions: {
        imageFormat: 'jpeg',
    },
    webpackOverride,
};

export default config;