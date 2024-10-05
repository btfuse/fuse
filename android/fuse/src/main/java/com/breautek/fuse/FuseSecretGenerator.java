

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

package com.breautek.fuse;

import java.security.SecureRandom;

public class FuseSecretGenerator {
    public static String generate() {
        SecureRandom secureRandom = new SecureRandom();

        // Generate a random byte array of the desired length
        int secretLength = 32; // Length in bytes
        byte[] secretBytes = new byte[secretLength];
        secureRandom.nextBytes(secretBytes);

        // Convert the byte array to a hexadecimal string
        StringBuilder stringBuilder = new StringBuilder();
        for (byte b : secretBytes) {
            stringBuilder.append(String.format("%02x", b));
        }

        return stringBuilder.toString();
    }
}
