import { NativeModules } from 'react-native';

const native = NativeModules.RNBinaryFile;

const MAX_BUFFER_SIZE = 10 * 1024 * 1024; // 10 MB

export default class BinaryFile {
  public static open(filename: string): Promise<number> {
    return native.open(filename);
  }

  public static close(fd: number): Promise<void> {
    return native.close(fd);
  }

  public static seek(fd: number, pos: number): Promise<void> {
    return native.seek(fd, pos);
  }

  public static async read(fd: number, len: number): Promise<Uint8Array> {
    try {
      if (len > MAX_BUFFER_SIZE) {
        throw new Error(`Buffer size is too big or invalid file: ${len}`);
      }

      const buffer = await native.read(fd, len);
      return Uint8Array.from(buffer);
    } catch (err) {
      throw err;
    }
  }

  public static async readByte(fd: number): Promise<number> {
    return native.readByte(fd);
  }

  public static async readInt(fd: number): Promise<number> {
    return native.readInt(fd);
  }
}
