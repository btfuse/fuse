
/*
Copyright 2025 Breautek

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

package com.breautek.fuse.sqlite;

import android.content.Context;
import androidx.test.platform.app.InstrumentationRegistry;
import androidx.test.ext.junit.runners.AndroidJUnit4;

import com.breautek.fuse.FuseError;

import org.junit.*;

import org.junit.runner.RunWith;

import static org.junit.Assert.*;

@RunWith(AndroidJUnit4.class)
public class SQLiteLibTest {

    private static long db;

    @BeforeClass
    public static void setUpClass() throws FuseError {
        Context appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        String tempDir = appContext.getCacheDir().getAbsolutePath();
        SQLite.setTempDir(tempDir);
        db = SQLite.open(":memory:", SQLite.READ_WRITE | SQLite.CREATE | SQLite.FULL_MUTEX);
    }

    @AfterClass
    public static void tearDownClass() {
        SQLite.close(db);
    }

    @Test
    public void testOpenMemoryDb() throws FuseError {
        long testDb = SQLite.open(":memory:", SQLite.READ_WRITE | SQLite.CREATE);
        assertTrue(testDb != 0);
        SQLite.close(testDb);
    }

    @Test
    public void testPrepareAndFinalize() throws FuseError {
        long stmt = SQLite.prepare(db, "SELECT 1;");
        assertTrue(stmt != 0);
        int finalizeResult = SQLite.finalize(stmt);
        assertEquals(0, finalizeResult);
    }

    @Test
    public void testBindAndRetrieveValues() throws FuseError {
        long stmt = SQLite.prepare(db, "SELECT ?1, ?2, ?3, ?4, ?5;");
        SQLite.bindDoubleWithIndex(stmt, 1, 3.14);
        SQLite.bindStringWithIndex(stmt, 2, "Hello");
        SQLite.bindIntWithIndex(stmt, 3, 42);
        SQLite.bindBlobWithIndex(stmt, 4, new byte[]{0x01, 0x02});
        SQLite.bindNullWithIndex(stmt, 5);

        assertEquals(100, SQLite.step(stmt)); // SQLITE_ROW

        assertEquals(3.14, SQLite.getDouble(stmt, 0), 0.001);
        assertEquals("Hello", SQLite.getString(stmt, 1));
        assertEquals(42L, SQLite.getInt(stmt, 2));
        assertArrayEquals(new byte[]{0x01, 0x02}, SQLite.getBlob(stmt, 3));
        assertNull(SQLite.getString(stmt, 4));

        SQLite.finalize(stmt);
    }

    @Test
    public void testColumnMetadata() throws FuseError {
        long stmt = SQLite.prepare(db, "SELECT 1 AS col;");
        assertEquals(1, SQLite.columnCount(stmt));
        assertEquals("col", SQLite.columnName(stmt, 0));
        assertEquals(100, SQLite.step(stmt)); // SQLITE_ROW
        assertEquals(1, SQLite.columnType(stmt, 0)); // SQLITE_INTEGER
        SQLite.finalize(stmt);
    }

    @Test
    public void testResetAndReuseStatement() throws FuseError {
        long stmt = SQLite.prepare(db, "SELECT ?1;");
        SQLite.bindIntWithIndex(stmt, 1, 123);
        SQLite.step(stmt);
        SQLite.reset(stmt);
        SQLite.bindIntWithIndex(stmt, 1, 456);
        SQLite.step(stmt);
        assertEquals(456L, SQLite.getInt(stmt, 0));
        SQLite.finalize(stmt);
    }

    @Test
    public void testCloseDatabase() throws FuseError {
        long testDb = SQLite.open(":memory:", SQLite.READ_WRITE | SQLite.CREATE);
        int result = SQLite.close(testDb);
        assertEquals(0, result);
    }

    @Test
    public void testGetLibVersion() {
        String version = SQLite.getLibVersion();
        assertNotNull(version);
        assertTrue(version.matches("\\d+\\.\\d+\\.\\d+.*")); // rough semantic version format
        assertEquals("3.49.1", version);
    }

    @Test
    public void testSetBusyTimeout() {
        int result = SQLite.setBusyTimeout(db, 5000);
        assertEquals(0, result);
    }
}
