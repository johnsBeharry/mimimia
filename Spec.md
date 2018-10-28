# Specifications

### Encrypt Service

- Express Server `POST /api/encrypt`

```javascript
const ecies = require("eth-ecies");
let plaintext = new Buffer(`{foo:"bar",baz:42}`);
let encryptedMsg = ecies.encrypt(ethPubKey, plaintext);
// encrypted message is a 113+ byte buffer
```

### Decrypt Service

- Express Server `POST /api/decrypt`

```javascript
const ecies = require("eth-ecies");
let plaintext = ecies.decrypt(ethPrivKey, encryptedMsg);
```

### Relayer

- Send the transaction to Ethereum
- Web3py

### User Interface

- https://medium.com/@avsa/universal-logins-first-demo-1dc8b17a8de7
- Connect to relayer
- Use private keys to decrypt data

