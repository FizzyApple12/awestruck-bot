import express from 'express';
import cors from 'cors';

import {exec} from 'child_process';
import {LOCAL_API_PORT, TTS_COMMAND} from './config';

const app = express();
app.use(cors());
app.use(express.json());

export const StartAPIServer = async () => {
    app.post('/tts', (req, res) => {
        if (req.body && req.body.text) {
            exec(`echo "${req.body.text}" | ${TTS_COMMAND}`, {
                encoding: null
            }, (err, stdout) => {
                if (err) {
                    console.error(err)

                    res.sendStatus(500);
                } else {
                    res.json(
                        JSON.stringify({
                            audio: stdout.toString('base64')
                        })
                    );
                }
            });
        }
    });

	app.listen(LOCAL_API_PORT, () => {
		console.log(`Local API Server Running on ${LOCAL_API_PORT}`);
	});
};
