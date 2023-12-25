
# Fuse

![Fuse Android](https://github.com/btfuse/fuse-android/actions/workflows/instrumented.yml/badge.svg)
![Fuse JS](https://github.com/btfuse/fuse-js/actions/workflows/unit-tests.yml/badge.svg)

A native-first framework for building hybdrid native-web applications.

This framework is entering **alpha** stage, and not intended to be used in production code.

This document is for contributors. For using Fuse, see the [User Documentation](https://fuse.breautek.com)

## Repository Structure

The Fuse project is split up into several repositories

|Name|Repository|Description|
|---|---|---|
|Fuse Project Repo<sup>1</sup>|[Link](https://github.com/btfuse/fuse)|The core repository that holds the project development environment.
|Fuse Build Tools|[Link](https://github.com/btfuse/build-tools)|Set of common shell scripts used to manage projects, builds, and releases.
|Fuse Android|[Link](https://github.com/btfuse/fuse-android)|The Android Fuse framework
|Fuse iOS|[Link](https://github.com/btfuse/fuse-ios)|The iOS Fuse Framework
|Fuse JS|[Link](https://github.com/btfuse/fuse-js)|The webview Fuse library
|Fuse Docs|[Link](https://github.com/btfuse/fuse-docs)|The User Documentation website.

If you plan to build from source or contribute to Fuse, it will be recommended to clone the Fuse Project Repo rather than the individual components as they may cross-reference each other.

Fuse should be cloned into a directory where all the fuse repos can exists as siblings. This repo contains a `bootstrap.sh` script that will clone each repo.

NOTE: Currently Fuse build scripts only supports unix/bash environments.

```bash
git clone git@github.com:btfuse/fuse.git
cd fuse
./bootstrap.sh
```

The bootstrap script only clones missing repositories. Once cloned, you can add git remotes, or pull them appropriately.

If you have forked each of the repositories, then you can supply your user/organization id as the first parameter to have the script clone from your own fork instead.

```bash
./bootstrap.sh myaccount
```

See individual project readmes for further information how to build and test the project from source.
