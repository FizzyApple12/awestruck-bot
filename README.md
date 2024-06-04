# Awestruck Bot

A Discord bot for [Purdue Hackers](https://purduehackers.com) that uses [Remotion](https://remotion.dev) to programmatically generate videos from messages

## Configuring

I recommending first renaming the ``.env.example`` file to ``.env`` and going from there.

1. [Discord Application](https://discord.com/developers/applications):
    Put the Client ID and the Bot Token in the ``.env`` file's ``CLIENT_ID`` and ``TOKEN`` variables
2. [Pexels API Key](https://www.pexels.com/api/):
    Put the Pexels API Key in the ``.env`` file's ``PEXELS_API_KEY`` variable
3. Local executable of Piper to synthesize speech
    Put the command to generate the audio and send it to ``STDOUT`` in the ``.env`` file's ``TTS_COMMAND`` variable
    Tip: You will likely need to pass the arguments: ``--output_file - --quiet``

Further configuration can be done inside the ``config.ts`` files in each project, however that goes beyond basic configuration and will require programming knowledge

## Usage

**Warning for Windows Users:** Windows doesn't properly handle raw standard IO transmissions which will corrupt the TTS audio. If you have any fixes, please tell me, otherwise, proceed at your own (mental) risk.

This project is build and executed with the yarn package manager

Run ``yarn`` inside:

* The project root
* ``engines/FiberOpticCableCore``

to install all the necessary libraries for the bot

Then, you can run ``yarn start`` inside the project root to start everything
