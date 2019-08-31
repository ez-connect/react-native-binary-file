import { NativeModules } from 'react-native';
const native = NativeModules.RNBinaryFile;
const MAX_BUFFER_SIZE = 10 * 1024 * 1024;
class BinaryFile {
    open(filename) {
        return native.open(filename);
    }
    close(fd) {
        return native.close(fd);
    }
    seek(fd, pos) {
        return native.seek(fd, pos);
    }
    async read(fd, len) {
        try {
            if (len > MAX_BUFFER_SIZE) {
                throw new Error(`Buffer size is too big or invalid file: ${len}`);
            }
            const buffer = await native.read(fd, len);
            return Uint8Array.from(buffer);
        }
        catch (err) {
            throw err;
        }
    }
    async readByte(fd) {
        return native.readByte(fd);
    }
    async readInt32(fd) {
        return native.readInt32(fd);
    }
    async readInt64(fd) {
        return native.readInt64(fd);
    }
    async readFloat32(fd) {
        return native.readFloat32(fd);
    }
    async readFloat64(fd) {
        return native.readFloat64(fd);
    }
}
const binaryFileStatic = new BinaryFile();
export { binaryFileStatic as BinaryFile, };
