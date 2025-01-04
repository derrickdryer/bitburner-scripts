/** @param {import("../../../NetscriptDefinitions").NS} ns */
export async function main(ns) {
    const availableRam = [8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576];
    var moneyReserve = parseInt(await ns.prompt("How much money do you want to keep in reserve?", {type: "text"}));
    await ns.sleep(1000);
    var serverRam = parseInt(await ns.prompt("Select the amount of RAM you want to buy for your servers.", {type: "select", choices: availableRam}));
    var serverCost = ns.getPurchasedServerCost(serverRam);
    await ns.sleep(1000);
    ns.tprint(`Each server will cost $${ns.formatNumber(serverCost)} to purchase. For a total of $${ns.formatNumber(serverCost * ns.getPurchasedServerLimit())}.`);
    await ns.sleep(1000);
    ns.tprint(`You will need a total of $${ns.formatNumber((moneyReserve + (serverCost * ns.getPurchasedServerLimit())))} to buy the servers.`);
    await ns.sleep(1000);

    var continuePurchase = await ns.prompt(`Do you wish to continue purchase?`, {type: "boolean"});

    if (continuePurchase === true) {
        var i = 0;
    
        while(i < ns.getPurchasedServerLimit()) {
            if (ns.getServerMoneyAvailable("home") > moneyReserve + serverCost) {
                ns.purchaseServer(`pserv-${i}`, serverRam);
                i++;
            } else {
                await ns.sleep(1000000);
                var moneyNeeded = moneyReserve + serverCost - ns.getServerMoneyAvailable("home");
                ns.toast(`ERROR - Not enough money to buy servers - Need $${ns.formatNumber(moneyNeeded)} more to buy servers.`);
            }
        }
    } else {
        ns.tprint("Exiting script. No servers purchased.");
    }
}