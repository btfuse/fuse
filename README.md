
# Fuse

<table>
    <thead>
        <td>Platform</td>
        <td>Status</td>
    </thead>
    <tr>
        <td>Android Runtime</td>
        <td>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-28.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-28.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-29.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-29.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-30.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-30.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-31.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-31.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-32.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-32.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-33.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-33.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse-android/actions/workflows/api-34.yml"><img src="https://github.com/btfuse/fuse-android/actions/workflows/api-34.yml/badge.svg" /></a>
        </td>
    </tr>
    <tr>
        <td>iOS Runtime</td>
        <td>
            <a href="https://github.com/btfuse/fuse/actions/workflows/ios17.yml"><img src="https://github.com/btfuse/fuse/actions/workflows/ios17.yml/badge.svg" /></a>
            <a href="https://github.com/btfuse/fuse/actions/workflows/ios18.yml"><img src="https://github.com/btfuse/fuse/actions/workflows/ios18.yml/badge.svg" /></a>
        </td>
    </tr>
    <tr>
        <td>JS Runtime</td>
        <td>
            <a href="https://github.com/btfuse/fuse/actions/workflows/js-unit-tests.yml"><img src="https://github.com/btfuse/fuse/actions/workflows/js-unit-tests.yml/badge.svg" /></a>
        </td>
    </tr>
</table>

A native-first framework for building hybrid native-web applications.

This framework is entering **alpha** stage, and not intended to be used in production code.

This document is for contributors. For using Fuse, see the [User Documentation](https://fuse.breautek.com)

## Repository Structure

The Fuse project is split up into several modules.

|Name|Path|Description|
|---|---|---|
|Fuse Build Tools|[/build-tools](https://github.com/btfuse/build-tools)|Set of common shell scripts used to manage projects, builds, and releases.
|Fuse Android|[/android](https://github.com/btfuse/fuse/tree/main/android)|The Android Fuse framework
|Fuse iOS|[/ios](https://github.com/btfuse/fuse/tree/main/ios)|The iOS Fuse Framework
|Fuse JS|[/js](https://github.com/btfuse/fuse/tree/main/js)|The webview Fuse library
|Fuse Docs|[/docs](https://github.com/btfuse/fuse/tree/main/docs)|The User Documentation website.

## Committer Requirements

Each component has their own requirements to build the framework.

|Name|Requirements|
|---|---|
|Build Tools|N/A|
|Android|- Android Studio Koala or later<br />- NodeJS 20 or later|
|iOS|- Xcode 16 or later<br />- NodeJS 20 or later|
|JS|- NodeJS 20 or later|
|Docs|- Doxygen 1.12 or later<br />- NodeJS 20 or later

NOTE: At this time, all scripts are written in bash, therefore a unix environment is required for
all modules.
