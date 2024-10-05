
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

import {
    Platform,
    PlatformResolver
} from '../src/api';

describe('PlatformResolver', () => {
    let resolver: PlatformResolver = null;

    beforeAll(() => {
        resolver = new PlatformResolver();
    });

    describe('resolve()', () => {
        it('should be IOS', () => {
            jest.spyOn(resolver, 'isIOSEnvironment').mockReturnValue(true);
            jest.spyOn(resolver, 'isAndroidEnvironment').mockReturnValue(false);
    
            expect(resolver.resolve()).toBe(Platform.IOS);
        });

        it('should be ANDROID', () => {
            jest.spyOn(resolver, 'isIOSEnvironment').mockReturnValue(false);
            jest.spyOn(resolver, 'isAndroidEnvironment').mockReturnValue(true);
    
            expect(resolver.resolve()).toBe(Platform.ANDROID);
        });
    });
});
