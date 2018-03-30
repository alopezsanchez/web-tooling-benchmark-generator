# Web tooling benchmark generator

[![Build Status](https://travis-ci.org/alopezsanchez/web-tooling-benchmark-generator.svg?branch=master)](https://travis-ci.org/alopezsanchez/web-tooling-benchmark-generator)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

CLI tool to generate new benchmarks in the [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) repository.

This tool:

* Checks that the user is in in the [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) repository.
* Checks if the new library already has a benchmark.
* Installs the new library with `npm i --save-exact`.
* Generates the benchmark and benchmark test files with the naming convention.
* Creates a new section in the documentation file.
* Updates the target list (list of runnable benchmarks).

## Demo

<p align="center">
  <img src="http://g.recordit.co/6YVNp7iA4t.gif" alt="Demo"
       width="800">
</p>

## Installation

```bash
$ npm i -g web-tooling-benchmark-generator
```

## Usage

Inside your [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark) clone:

```bash
$ wtb-generate
```

## Contributing

Any contribution is welcomed. Please, submit a Pull Request!

## License

MIT. See [License](LICENSE).
