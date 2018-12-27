const secrets = require('docker-secrets-nodejs')

let streams = []
for (let stream of ['instrument', 'orderBookL2', 'quote', 'trade',
                    'execution', 'margin', 'order', 'position']) {
    console.log(stream.toUpperCase(), process.env[stream.toUpperCase()])
    if (process.env[stream.toUpperCase()]) {
        streams.push(stream)
    }
}

// TODO: allow parameterization from docker-compose environment-variables
module.exports = {
    port: process.env.DELTA_SERVER_PORT,

    // If false, will connect to live exchange.
    // Testnet is https://testnet.bitmex.com
    testnet: process.env.TESTNET,
    // testnet: false,

    // Symbols to watch. Add any/all symbols you are going to poll here.
    symbols: ['XBTUSD'],

    // Available streams:
    // Public:
    // ["instrument","orderBookL2","quote","trade"]
    // Private:
    // ["execution","margin","order","position"]
    streams: streams,

    // If you want to use any of the above "private" streams, you must
    // authenticate with an API Key.
    apiKeyID: secrets.get('bitmex_api_key'),
    apiKeySecret: secrets.get('bitmex_api_secret'),

    // This prevents memory usage from getting out of control. Tweak
    // to your needs.
    maxTableLen: 10000,
};
