const dns = require('dns');

const hostname = 'cluster0.sres5dz.mongodb.net';

console.log(`Resolving ${hostname}...`);

dns.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
    if (err) {
        console.error('SRV Resolution Failed:', err);
    } else {
        console.log('SRV Records:', addresses);
        if (addresses && addresses.length > 0) {
            const target = addresses[0].name;
            console.log(`Resolving target: ${target}...`);
            dns.lookup(target, (err, address, family) => {
                if (err) {
                    console.error('Target Resolution Failed:', err);
                } else {
                    console.log(`Target IP: ${address} (Family: ${family})`);
                }
            });
        }
    }
});
