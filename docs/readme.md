<!--
Copyright 2023 Breautek 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# Contributor Documentation

Fuse documentation and website is powered by mkdocs. For full documentation visit [mkdocs.org](https://www.mkdocs.org).

Python is required to build the website. Mkdocs also provides a server with auto hot reload for development.

## Setting up the development environment

If you don't have already have a virtual env, it would be recommended to create one:

```bash
python3 -m venv venv
```

Activate the environment:

```bash
source venv/bin/activate
```

And install the dependencies:

```bash
pip3 install -r requirements.txt
```

To deactivate/exit the virtual environment, run:

```bash
deactivate
```

## Building the documentation

This section assumes you're already in a python virtual env.

Building can be done by running:

```bash
mkdocs build
```

However, if you want to actually test and see your changes, serving might be better:

```bash
mkdocs serve
```

This will run a local webserver.

## Common Mkdocs Commands

* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.
