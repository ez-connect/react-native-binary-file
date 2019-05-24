import { NativeModules } from 'react-native';
const native = NativeModules.RNBinaryFile;
const MAX_BUFFER_SIZE = 10 * 1024 * 1024;
export default class BinaryFile {
    static open(filename) {
        return native.open(filename);
    }
    static close(fd) {
        return native.close(fd);
    }
    static seek(fd, pos) {
        return native.seek(fd, pos);
    }
    static async read(fd, len) {
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
    static async readByte(fd) {
        return native.readByte(fd);
    }
    static async readInt(fd) {
        return native.readInt(fd);
    }
}
