/** @param {import("../../../NetscriptDefinitions").NS} ns */
export async function main(ns) {
    var execScript = ns.args[0];
    var scriptRam = ns.getScriptRam(execScript);
    var maxThreads = Math.floor((ns.getServerMaxRam("home")) / scriptRam);
    ns.tprint(`Max threads: ${maxThreads} | Script RAM: ${scriptRam}`);
}