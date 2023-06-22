# pegasys-v3-staker

This is the canonical staking contract designed for [Pegasys V3](https://github.com/pegasys-fi/v3-core).

## Deployments

| Network          | Explorer                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Rollux          | https://rollux.tanenbaum.io/address/0x4DFc340487bbec780bA8458e614b732d7226AE8f                  |


## Links:

- [Contract Design](docs/Design.md)

## Development and Testing

```sh
$ yarn
$ yarn test
```

## Gas Snapshots

```sh
# if gas snapshots need to be updated
$ UPDATE_SNAPSHOT=1 yarn test
```

## Contract Sizing

```sh
$ yarn size-contracts
```

## TODO:
fix tests