# Web tooling benchmark generator

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

CLI tool to generate new benchmarks in the [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) repository.

This tool:

* Checks that the user is in in the [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) repository.
* Checks if the new library already has a benchmark.
* Installs the new library with `npm i --save-exact`.
* Generates the benchmark and benchmark test files with the naming convention.

## Installation

```bash
$ npm i -g web-tooling-benchmark-generator
```

## Use

Inside your [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) clone:

```bash
$ wtb-generate
```
