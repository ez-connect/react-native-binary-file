import { NativeModules } from 'react-native';

const native = NativeModules.RNBinaryFile;

const MAX_BUFFER_SIZE = 10 * 1024 * 1024; // 10 MB

class BinaryFile {
  public open(filename: string): Promise<number> {
    return native.open(filename);
  }

  public close(fd: number): Promise<void> {
    return native.close(fd);
  }

  public seek(fd: number, pos: number): Promise<void> {
    return native.seek(fd, pos);
  }

  public async read(fd: number, len: number): Promise<Uint8Array> {
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

  public async readByte(fd: number): Promise<number> {
    return native.readByte(fd);
  }

  public async readInt32(fd: number): Promise<number> {
    return native.readInt32(fd);
  }

  public async readInt64(fd: number): Promise<number> {
    return native.readInt64(fd);
  }

  public async readFloat32(fd: number): Promise<number> {
    return native.readFloat32(fd);
  }

  public async readFloat64(fd: number): Promise<number> {
    return native.readFloat64(fd);
  }
}

const binaryFileStatic = new BinaryFile();
export {
  binaryFileStatic as BinaryFile,
}
