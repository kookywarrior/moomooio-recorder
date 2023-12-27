# MooMoo.io Recorder
Record your gameplay without a recording software!

## Requirements
- Any operating system that can run Node.js
- [Node.js](https://nodejs.org/en/download) installed
- [Tampermonkey](https://www.tampermonkey.net) installed
- Make sure [Custom Store Script](https://greasyfork.org/en/scripts/461745) was installed

## Setup
1. Download and unzip [this](https://github.com/kookywarrior/moomooio-recorder/archive/refs/heads/main.zip).
2. Open terminal in the unzipped folder. [How to open terminal in unzipped folder](https://www.groovypost.com/howto/open-command-window-terminal-window-specific-folder-windows-mac-linux)
3. Run this command: `npm install canvas` [Getting errors when installing? Try this!](https://github.com/Automattic/node-canvas/wiki)
4. Run this command: `npm install`
4. Then follow by this command: `npm run start`

## Record
1. Install [this userscript](https://github.com/kookywarrior/moomooio-recorder/raw/main/userscript.user.js).
2. Visit https://moomoo.io.
3. Start the game.
4. Click the record button to start recording.
5. Right click the record button to mark the time.

## Render
1. Visit http://localhost:5678
2. Select the range you want in the timeline
3. Export video/image.

## Reference
- https://moomoo.io/assets/index-ffd48cb5.js
