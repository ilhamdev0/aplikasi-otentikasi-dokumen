const NodeRSA = require('node-rsa');

export const keypair_generator = () => {
    const key = new NodeRSA({b: 2048});
    const privatekey = key.exportKey('pkcs8-private');
    const publickey = key.exportKey('pkcs8-public');

    return {priv:  privatekey, pub: publickey}
}
