/** @param {import("../../../NetscriptDefinitions").NS} ns */
export async function main(ns) {

    // Get user input for target and fetch target optimal thresholds.
    var target = ns.args[0] || "n00dles";
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    // Ensure hack works, catch errors.
    try {
        
        // Begin basic hack loop
        while(true) {

            // If target's current security level is above the optimal threshold, weaken it.
            if (ns.getServerSecurityLevel(target) > securityThresh) {
                await ns.weaken(target);

            // Else if the target's money is below optimal threshold, grow it.
            } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
                await ns.grow(target);

            // Else if both are in optimal range, hack the target and get money.
            } else {
                await ns.hack(target);
            }
        }
    } catch (error) {
        ns.print(`ERROR: ${ns.getScriptName()} faced an error running on ${ns.getHostname()}.`);
        ns.print(`ERROR ${error}`);
    }
}