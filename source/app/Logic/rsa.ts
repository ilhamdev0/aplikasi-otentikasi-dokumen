const NodeRSA = require('node-rsa');

export const keypair_generator = () => {
    const key = new NodeRSA({b: 2048});
    const priv = key.exportKey('pkcs8-private');
    // const pub = key.exportKey('pkcs8-public');

    return priv
    // return {privatekey:  priv, publickey: pub}
}

export const encrypt = (data, privatekey) => {
    const key = new NodeRSA(privatekey)
    const encrypted = key.encrypt(data, 'base64');
    return encrypted
}

export const decrypt = (data, privatekey) => {
    const key = new NodeRSA(privatekey)
    const decrypted = key.decrypt(data, 'utf8');
    return decrypted
}
