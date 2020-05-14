# geth-revert-reason-repro

Reproduces difference between geth 1.9.13 and 1.9.14 in data returned by
`eth_call`'s to methods which revert with a reason string.

## Install
```
npm install
```

## Use

**Requires docker.**

The npm commands below launche a geth `--dev` instance pulled from docker hub at the relevant
tag and run `.index.js`. 

(Client is automatically shut down at the end of command.)

### 1.9.13

```
npm run geth:1.9.13
```

**Output**




### 1.9.14

```
npm run geth:1.9.14
```

**Output**

