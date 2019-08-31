declare class BinaryFile {
    open(filename: string): Promise<number>;
    close(fd: number): Promise<void>;
    seek(fd: number, pos: number): Promise<void>;
    read(fd: number, len: number): Promise<Uint8Array>;
    readByte(fd: number): Promise<number>;
    readInt32(fd: number): Promise<number>;
    readInt64(fd: number): Promise<number>;
    readFloat32(fd: number): Promise<number>;
    readFloat64(fd: number): Promise<number>;
}
declare const binaryFileStatic: BinaryFile;
export { binaryFileStatic as BinaryFile, };
