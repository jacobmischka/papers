Create yourself a LICENSE.

## Installation

```shell
npm install -g @jacobmischka/papers
```

## Usage

```shell
$ papers -h

  Usage: papers [license name or id] [author name] [year]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

If license or author not given, attempts to read them from `package.json` in current directory.
If author still not found, attempts to read it from local git config, then global git config.
Year defaults to current year.



If you want to specify an argument without specifying a previous argument, you can just enter an empty string for arguments you want to be read from package.json or your git config.

```shell
$ papers ISC '' 2016
```

Inspired by [captainsafia's][captainsafia] great idea in [captainsafia/legit][legit].

[captainsafia]: https://github.com/captainsafia
[legit]: https://github.com/captainsafia/legit
