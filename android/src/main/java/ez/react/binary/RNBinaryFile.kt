package ez.react.binary

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

import java.io.RandomAccessFile

class RNBinaryFile(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var _handlers: HashMap<Int, RandomAccessFile>

    init {
        this._handlers = HashMap()
    }

    override fun getName(): String {
        return "RNBinaryFile"
    }

    @ReactMethod
    fun open(filename: String, promise: Promise) {
        try {
            val handler = RandomAccessFile(filename, "r")
            val fd = handler.hashCode()
            this._handlers.put(fd, RandomAccessFile(filename, "r"))
            promise.resolve(fd)
        } catch (err: Exception) {
            promise.reject(err)
        }
    }

    @ReactMethod
    fun close(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                handler.close()
                this._handlers.remove(fd)
                promise.resolve(true)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't close file"))
        }
    }

    @ReactMethod
    fun seek(fd: Int, pos: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                handler.seek(pos.toLong())
                promise.resolve(true)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't seek file"))
        }
    }

    @ReactMethod
    fun read(fd: Int, len: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val buffer: ByteArray = ByteArray(len)
                handler.read(buffer, 0, len)

                val arr: WritableArray = WritableNativeArray()
                for (value in buffer) {
                    arr.pushInt(value.toInt())
                }
                promise.resolve(arr)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }

    @ReactMethod
    fun readByte(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val value = handler.readByte()
                promise.resolve(value.toInt())
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }

    @ReactMethod
    fun readInt32(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val value = handler.readInt()
                promise.resolve(value)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }

    @ReactMethod
    fun readInt64(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val value = handler.readLong()
                promise.resolve(value)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }

    @ReactMethod
    fun readFloat32(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val value = handler.readFloat()
                promise.resolve(value)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }

    @ReactMethod
    fun readFloat64(fd: Int, promise: Promise) {
        val handler = this._handlers.get(fd)
        if (handler != null) {
            try {
                val value = handler.readDouble()
                promise.resolve(value)
            } catch (err: Exception) {
                promise.reject(err)
            }
        } else {
            promise.reject(Error("Can't read file"))
        }
    }
}
