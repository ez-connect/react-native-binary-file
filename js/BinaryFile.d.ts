export default class BinaryFile {
    static open(filename: string): Promise<number>;
    static close(fd: number): Promise<void>;
    static seek(fd: number, pos: number): Promise<void>;
    static read(fd: number, len: number): Promise<Uint8Array>;
    static readByte(fd: number): Promise<number>;
    static readInt(fd: number): Promise<number>;
}
