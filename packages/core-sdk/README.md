  <a href="https://unifiprotocol.com/" target="_blank" align="center">
    <img src="https://unifiprotocol.com/assets/img/logo.png" width="100">
  </a>
  <br />

# Unifi Protocol JS SDK Core

## Usage

```
import coreSdk from '@unifiprotocol/core-sdk';
```

## Concepts

# Connector
It´s a piece of software responsible of providing an adapter to read and write(in case of WalletConnectors) info from the blockchain and provide an event emitter to listen to events such as Address & Network change.

Multichain connectors will go inside Connectors root folder. Blockchain's specific connectors will go to its corresponding folder at Blockchains root folder.

# Adapter
It´s a service that will homogenize the contract read and executions.