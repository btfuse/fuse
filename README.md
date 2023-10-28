
# Fuse

|Android|![Android Build](https://github.com/btfuse/fuse-android/actions/workflows/android.yml/badge.svg)

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

If you plan to build from source or contribute to Fuse, it will be recommended to clone the Fuse Project Repo rather than the individual components.

The Fuse Project Repo (this repository) contains git submodules to each of the components. Therefore when cloning,
use the `--recurse-submodules` argument:

```bash
git clone --recurse-submodules 
```

If you already have a cloned repository, it can be synced by doing:

```bash
git pull
git submodule update --recursive
```

:warning:<sup>1</sup> The project structure is planned to be changed to better support forks and PRs, rather than using a Main project report.

See individual project readmes for further information how to build and test the project from source.
