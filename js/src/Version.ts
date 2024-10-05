
/*
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
*/

/**
 * A class that represents a {@link https://semver.org/} versioning.
 */
export class Version {
    private $major: number;
    private $minor: number;
    private $patch?: number;

    public static readonly LESS_THAN: number = -1;
    public static readonly EQUAL: number = 0;
    public static readonly GREATER_THAN: number = 1;

    public constructor(major: number, minor?: number, patch?: number) {
        this.$major = major;
        this.$minor = minor || 0;
        this.$patch = patch || 0;
    }

    /**
     * @remarks
     * Parses a semver-formatted version string and creates a Version object.
     * Does not support pre-release labels, which will be chopped off.
     * If any dot notation segment is missing or is not parseable as an integer,
     * it will default to 0.
     * 
     * @param version - Semver formatted version string
     * @returns A version object
     */
    public static parseVersionString(version: string): Version {
        const parts: string[] = version.split('.');

        let major: number = parseInt(parts[0]);
        let minor: number = parseInt(parts[1]);
        let patch: number = parseInt(parts[2]);

        if (isNaN(major)) {
            major = 0;
        }

        if (isNaN(minor)) {
            minor = 0;
        }

        if (isNaN(patch)) {
            patch = 0;
        }

        return new Version(major, minor, patch);
    }

    /**
     * @sealed
     * @returns The major component of this version
     */
    public getMajor(): number {
        return this.$major;
    }

    /**
     * @sealed
     * @returns The minor component of this version
     */
    public getMinor(): number {
        return this.$minor;
    }

    /**
     * @sealed
     * @returns The patch component of this version
     */
    public getPatch(): number {
        return this.$patch;
    }

    /**
     * @sealed
     * @returns A semver-formatted string
     */
    public toString(): string {
        return `${this.$major}.${this.$minor}.${this.$patch}`;
    }

    /**
     * @sealed
     * @param b - The right side version
     * @remarks
     *  This is the equivilant in using `Version.compare(this, b)`.
     *  See {@link copmare} for more details.
     */
    public compare(b: Version): number {
        return Version.compare(this, b);
    }

    /**
     * @remarks
     * Compares this version with another. If left side is greater than right side,
     * {@link GREATER_THAN} is returned. If they are equal, {@link EQUAL} is returned.
     * Otherwise, {@link LESS_THAN} is returned.
     * 
     * @param lhs - The left side version
     * @param rhs - The right side version
     * @returns 
     */
    public static compare(lhs: Version, rhs: Version): number {
        if (lhs.$major === rhs.$major && lhs.$minor === rhs.$minor && lhs.$patch === rhs.$patch) {
            return Version.EQUAL;
        }

        if (lhs.$major === rhs.$major) {
            if (lhs.$minor === rhs.$minor) {
                if (lhs.$patch === rhs.$patch) {
                    // shouldn't have reached here... as it should have been caught by the simple test above first
                    // but for consistency we will keep it here.
                    return Version.EQUAL
                }
                else {
                    return lhs.$patch > rhs.$patch ? Version.GREATER_THAN : Version.LESS_THAN;
                }
            }
            else {
                return lhs.$minor > rhs.$minor ? Version.GREATER_THAN : Version.LESS_THAN;
            }
        }
        else {
            return lhs.$major > rhs.$major ? Version.GREATER_THAN : Version.LESS_THAN;
        }
    }
}
