/** @param {import("../../../NetscriptDefinitions").NS} ns */
export async function main(ns) {
    
    // Get user input to hack specific target, if no target attack n00dles
    var target = ns.args[0] || "n00dles";
    
    // Script to deploy to remote servers
    var deployScript = "/scripts/basic-hack.js";

    // Get script RAM
    var scriptRam = ns.getScriptRam(deployScript);

    // List of servers to remote attack from
    var serverList = ["n00dles", "max-hardware", "neo-net", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea" , "zer0", "harakiri-sushi", "nectar-net", "silver-helix", "iron-gym", "CSEC", "phantasy", "omega-net", "avmnite-02h", "netlink", "I.I.I.I", "johnson-ortho", "rothman-uni", "syscore", "the-hub", "computek", "zb-institute", "summit-uni", "crush-fitness", "catalyst"];

    // Add owned servers to list of remote servers
    serverList.push(...ns.getPurchasedServers());

    // Try to deploy, catch any errors
    try {
        while(true) {

            // Loop through all of the servers
            for (let i = 0; i < serverList.length; i++) {
                var server = serverList[i];

                // Ensure we have root access
                if(ns.hasRootAccess(server)){
                        // Copy deploy script to remote server
                        ns.scp(deployScript, server, "home");
                        
                        // Kill all scripts present on server
                        ns.killall(server)

                        // Ensure we don't divide by zero and cause errors
                        if(scriptRam > 0) {

                            // Find the maximum threads we can use for this script on server
                            const maxThreads = Math.floor(ns.getServerMaxRam(server)/scriptRam);

                            // Execute script and attack target
                            ns.exec(deployScript, server, maxThreads, target);
                        } else {
                            ns.print(`ERROR: Script RAM is zero or undefined for script ${deployScript}`);
                        }
                } else {
                    // If we don't have root access, attempt to gain it
                    ns.print(`INFO: Attempting to gain root access to ${server}`)
                    await gainRootAccess(ns, server)

                    // Verify if we have access
                    if(ns.hasRootAccess(server) === false) {
                        ns.print(`ERROR: Failed to gain access to ${server}`);
                    } else {
                        ns.print(`SUCCESS: Gained root access to ${server}`);
                    }
                }
                // Sleep to prevent game from crashing
                await ns.sleep(2000);
            }
            break;
        }
    } catch (error) {
        ns.print(`ERROR: ${ns.getScriptName()} encountered a fatal error.`)
        ns.print(`ERROR: ${error}`);
    }
}

/** @param {import("../../../NetscriptDefinitions").NS} ns */
async function gainRootAccess(ns, server) {

    // Disable logs for this script besides critical ones
    ns.disableLog("ALL");

    // Server Info
    let remoteServer = ns.getServer(server);

    /*
    This function is ensuring we gain root access to execute scripts on the remote server.
    Step 1: Check if our hacking level is high enough to hack into it
    Step 2: Get the required ports to open and open them utilizing programs
    Step 3: If all ports are open NUKE.exe it.
    */
    try {
        if(ns.getHackingLevel() >= remoteServer.requiredHackingSkill) {
            if (remoteServer.openPortCount == 0) {
                ns.nuke(server);
            }
            if (remoteServer.sshPortOpen == true) {
                if(!ns.fileExists("BruteSSH.exe")) {
                } else {
                    ns.brutessh(server);
                }
            }
            if (remoteServer.ftpPortOpen == true) {
                if(!ns.fileExists("FTPCrack.exe")) {
                } else {
                    ns.ftpcrack(server);
                }
            }
            if (remoteServer.smtpPortOpen == true) {
                if(!ns.fileExists("relaySMTP.exe")) {
                } else {
                    ns.relaysmtp(server);
                }
            }
            if (remoteServer.httpPortOpen == true) {
                if(!ns.fileExists("HTTPWorm.exe")) {
                } else {
                    ns.httpworm(server);
                }
            }
            if (remoteServer.sqlPortOpen == true) {
                if(!ns.fileExists("SQLInject.exe")) {
                } else {
                    ns.sqlinject(server);
                }
            }
        } else {
            ns.print(`ERROR: Hacking level too low.`);
        }
    } catch (error) {
        ns.print(`ERROR: ${ns.getScriptName()} encountered a fatal error.`);
        ns.print(`ERROR ${error}`);
    }
    
}