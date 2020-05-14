# geth-revert-reason-repro

Reproduces difference between geth 1.9.13 and 1.9.14 in data returned by
`eth_call` for methods which revert with a reason string.

## Install
```
npm install
```

## Use

**Requires docker.**

The npm commands below launche a geth `--dev` instance pulled from the docker hub tag and run `.index.js`. 

(Client is automatically shut down at the end of command.)

### 1.9.13

```
npm run geth:1.9.13
```

**Output**

![Screen Shot 2020-05-14 at 11 22 38 AM](https://user-images.githubusercontent.com/7332026/81971340-c7bf5800-95d5-11ea-9121-de7100154a4f.png)


### 1.9.14

```
npm run geth:1.9.14
```

**Output**

![Screen Shot 2020-05-14 at 11 22 21 AM](https://user-images.githubusercontent.com/7332026/81971353-cb52df00-95d5-11ea-911c-17a753e88d31.png)


