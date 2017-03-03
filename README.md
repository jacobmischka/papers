Create yourself a LICENSE.

## Installation

```shell
npm install -g @jacobmischka/papers
```

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

Inspired by [captainsafia's][captainsafia] great idea in [captainsafia/legit][legit].

[captainsafia]: https://github.com/captainsafia
[legit]: https://github.com/captainsafia/legit
