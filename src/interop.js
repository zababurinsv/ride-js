const verify = require('curve25519-js').verify;
const crypto = require('@waves/ts-lib-crypto');

global.base58Encode = function (bytes) {
    return crypto.base58Encode(new Uint8Array(bytes))
};
global.base58Decode = function (data) {
    return crypto.base58Decode(data).buffer
};
global.base64Encode = function (bytes) {
    return crypto.base64Encode(new Uint8Array(bytes))
};
global.base64Decode = function (data) {
    return crypto.base64Decode(data)
};
global.keccak256 = function (bytes) {
    return Uint8Array.from(crypto.keccak(new Uint8Array(bytes))).buffer
};
global.sha256 = function (bytes) {
    return Buffer.from((crypto.sha256(new Uint8Array(bytes))), 'hex');
};
global.blake2b256 = function (bytes) {
    return crypto.blake2b(new Uint8Array(bytes)).buffer
};
global.curve25519verify = function (bytes1, bytes2, bytes3) {
    return verify(new Uint8Array(bytes1), new Uint8Array(bytes2), new Uint8Array(bytes3))
};
global.merkleVerify = function (rootHash, merkleProof, leafData) {//fixme
    throw new Error('merkleVerify not implemented')
};
global.rsaVerify = function (digest, msg, sig, key) {
    let alg = digest.toString();
    switch (digest.toString()) {
        case   'SHA3224':
            alg = "SHA3-224";
            break;
        case   'SHA3256':
            alg = "SHA3-256";
            break;
        case   'SHA3384':
            alg = "SHA3-384";
            break;
        case   'SHA3512':
            alg = "SHA3-512";
            break;
        case   "NONE":
            alg = undefined;
            break;
    }//fixme
    return crypto.rsaVerify(new Uint8Array(key), new Uint8Array(msg), new Uint8Array(sig), alg)
};
