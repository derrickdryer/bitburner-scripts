# Bitburner Scripts

This utilizes Shyguy1412's bb-external-script editor for the file watcher & monitoring each script file's RAM usage. I highly recommend using it for Bitburner script development, check out their [repo](https://github.com/shyguy1412/bb-external-editor)!

## Script database

### [Basic Deploy](https://github.com/derrickdryer/bitburner-scripts/servers/home/basic-deploy.js)

- **Required RAM:** 7.7GB
- *Recommended Alias Command:* `alias get-money="run /path/to/script/basic-deploy.js"`
- *Usage:* `get-money [optional: target (default: n00dles)]`

This script is a very basic deploy script. Within the script you specify the servers to deploy to, as well at the script you wish to deploy. Then simply run the script with the optional target argument, otherwise it will just fall back to attacking poor `n00dles`.

### [Basic Hack](https://github.com/derrickdryer/bitburner-scripts/servers/home/basic-hack.js)

- **Required RAM:** 2.45GB
- *Recommended Alias Command:* `alias attack="run /path/to/script/basic-hack.js"`
- *Usage:* `hack [optional: target (default: n00dles)]`

This is a very basic hacking script that you can also obtain during the beginner tutorial. This however has some small adjustments such as adding to the security level and lowering the Max Money target. Last it has a default target of `n00dles`, if one is not specified in the arguments. This works very well in conjunction with the basic deploy script.

### [Buy Servers](https://github.com/derrickdryer/bitburner-scripts/servers/home/buy-servers.js)

- **Required RAM:** 4.25GB
- *Recommended Alias Command:* `alias buy-servers="run /path/to/script/buy-servers.js"`
- *Usage:* `buy-servers`

A simple mass server purchase script with some prompts. It will prompt for the wanted RAM, how much money you wish to have in reserve and will auto-buy as money comes available. All servers will be named `pserv-#`.

### [Max Execute]((https://github.com/derrickdryer/bitburner-scripts/servers/home/maxExec.js))

- **Required RAM:** 1.75GB
- *Recommended Alias Command:* `alias maxExec="run /path/to/script/maxExec.js"`
- *Usage:* `maxExec [req: /path/to/script/Script.js]`

A simple script to tell you maximum threads your home system can use on a specific script.