import os from "os";

const hosts = [];

for (const interfaces of Object.values(os.networkInterfaces())) {
  for (const iface of interfaces ?? []) {
    if (iface.family === "IPv4" && !iface.internal) {
      hosts.push({ address: iface.address, name: iface.name });
    }
  }
}

console.log("\nMB Jewellers dev server — open on this network:\n");

if (hosts.length === 0) {
  console.log("  No LAN IPv4 address found. Check Wi-Fi connection.\n");
} else {
  for (const host of hosts) {
    console.log(`  http://${host.address}:3000  (${host.name})`);
  }
  console.log("\nIf your phone cannot connect, run scripts/allow-dev-firewall.ps1 as Administrator.\n");
}
