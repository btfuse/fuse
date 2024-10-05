
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

import {Version} from '../src/Version';

describe('Version', () => {
    const lhs: Version = new Version(1, 2, 3);

    it('should be equal (static)', () => {
        const rhs: Version = new Version(1, 2, 3);
        expect(Version.compare(lhs, rhs)).toEqual(Version.EQUAL);
    });

    it('instance compare should call on static compare', () => {
        const rhs: Version = new Version(1, 2, 3);
        jest.spyOn(Version, 'compare');
        lhs.compare(rhs);
        expect(Version.compare).toHaveBeenCalledWith(lhs, rhs);
    });

    it('Can create from string', () => {
        const v: Version = Version.parseVersionString('12.3.45');
        expect(v.getMajor()).toBe(12);
        expect(v.getMinor()).toBe(3);
        expect(v.getPatch()).toBe(45);
    });

    it('can create version from string with no patch', () => {
        const v: Version = Version.parseVersionString('12.3');
        expect(v.getMajor()).toBe(12);
        expect(v.getMinor()).toBe(3);
        expect(v.getPatch()).toBe(0);
    });

    it('can create version from string with no minor', () => {
        const v: Version = Version.parseVersionString('12');
        expect(v.getMajor()).toBe(12);
        expect(v.getMinor()).toBe(0);
        expect(v.getPatch()).toBe(0);
    });

    it('toString produces x.y.z', () => {
        expect(lhs.toString()).toBe('1.2.3');
    });

    const vtests: Record<string, number> = {
        '0.9.9': Version.GREATER_THAN,
        '1.0.0': Version.GREATER_THAN,
        '1.1.0': Version.GREATER_THAN,
        '1.1.2': Version.GREATER_THAN,
        '1.2.2': Version.GREATER_THAN,
        '1.2.4': Version.LESS_THAN,
        '1.1.5': Version.GREATER_THAN,
        '2.0.0': Version.LESS_THAN
    };

    for (const i in vtests) {
        const v: Version = Version.parseVersionString(i);
        let label: string;
        switch (vtests[i]) {
            case Version.LESS_THAN:
                label = 'less than';
                break;
            case Version.GREATER_THAN:
                label = 'greater than';
                break;
            default:
                label = 'unknown?';
                break;
        }

        it(`${i} should be ${label}`, () => {
            expect(lhs.compare(v)).toBe(vtests[i]);
        });
    }

    it('should return major', () => {
        expect(lhs.getMajor()).toBe(1);
    });

    it('should return minor', () => {
        expect(lhs.getMinor()).toBe(2);
    });

    it('should return patch', () => {
        expect(lhs.getPatch()).toBe(3);
    });
});
