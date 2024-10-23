
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

import { TSerializable } from "@btfuse/core";
import { FuseDirectory } from "./FuseDirectory";
import { FuseFileObject } from "./FuseFileObject";
import { FuseFileType } from "./FuseFileType";

export interface IFuseFileObject<TReadType> {
    
    /**
     * Returns the path to the filesystem object
     */
    getPath(): string;

    /**
     * Gets a new FuseFile at the path relative to this FuseFile
     */
    get(path: string): FuseFileObject;

    /**
     * Gets a new FuseDirectory at the path relative to this FuseFile
     */
    getDirectory(path: string): FuseDirectory;

    /**
     * Gets the parent FuseDirectory, or null if this File Object is
     * the root directory
     */
    getParent(): FuseDirectory | null;

    /**
     * Gets the file type that this FuseFile represents
     * See FuseFileType for possible file types.
     */
    getType(): Promise<FuseFileType>;

    /**
     * Returns true if this FuseFile is a directory.
     */    
    isDirectory(): Promise<boolean>;

    /**
     * Returns true if this FuseFile is a File
     */
    isFile(): Promise<boolean>;

    /**
     * Returns the size of the FuseFile object.
     * 
     * For Directories, this will be an estimated count of directories and files
     * contained.
     * 
     * For Files, this will be the estimated file size in bytes.
     * 
     * May return -1 if the file size is not determinable.
     */
    getSize(): Promise<number>;

    /**
     * Creates a directory at this file object path.
     * If the path already exists, an error will occur.
     * 
     * If recursive argument is true, then all directories leading
     * up to this file object is created as directories. If the target directory
     * already exists as a directory, then no error will be thrown.
     * 
     * If the target path exists and is not a directory, or if any of the directories
     * leading up to this target path could not be created, an error will be thrown.
     * 
     * Note that this method may leave a partial state, should an error
     * have occurred while creating the directory tree.
     */
    mkdir(recursive?: boolean): Promise<boolean>;

    /**
     * Removes the file or directory.
     * 
     * If the target path is a file, then the recursive flag does nothing.
     * 
     * For directory target paths, it will remove a directory if it's empty,
     * otherwise an error is thrown. If the recursive flag is enabled, then
     * it will attempt to remove the directory target path and any sub directory
     * or files contained. This may leave a directory structure in a partial state
     * if there was a failure in removing a file and/or subdirectory.
     */
    remove(recursive?: boolean): Promise<void>;

    /**
     * Returns true if the file path exists. This does not check
     * if the path is a directory, file, or any other filesystem object.
     * 
     * It's usually better to attempt to do an action and handle errors
     * if they occur as the response of this API does not indicate if a file
     * operation is safe. E.g. calling a read API after checking if a file
     * exists may still fail if something else was deleting that file at the same time.
     */
    exists(): Promise<boolean>;

    /**
     * Returns the entire object. This should only be used if
     * you know the dataset will be fairly small.
     * 
     * Otherwise it might be smarter use readChunk to operate on smaller
     * bits of data instead.
     */
    read(): Promise<TReadType>;

    /**
     * Reads length amount of data starting at offset.
     * 
     * If offset is not given, it defaults to 0.
     * 
     * The length is advisory and the returned data may be less.
     */
    readChunk(length: number, offset?: number): Promise<TReadType>;

    /**
     * Truncates the data file and then writes data, replacing any
     * contents it may have.
     * 
     * If this file object is a directory, an error will be thrown.
     */
    truncate(data?: TSerializable): Promise<number>;

    /**
     * Appends data at the end of the file.
     * Returns the number of bytes written.
     * 
     * If this file obejct is a directory, an error will be thrown.
     */
    append(data: TSerializable): Promise<number>;

    /**
     * Writes data at the given offset. If offset is not given,
     * then a default of 0 is used. Existing Data at the offset,
     * up to the length of the given dataset will be replaced.
     * 
     * If this file object is a directory, an error will be thrown.
     */
    write(data: TSerializable, offset?: number): Promise<number>;
}
