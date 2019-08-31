import Foundation

@objc(RNBinaryFile)
class RNBinaryFile: NSObject {
  var _handlers: Dictionary<Int32, FileHandle>

  override init() {
    self._handlers = [:]
    super.init()
  }

  @objc
  func open(_ filename: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = FileHandle(forReadingAtPath: filename)
    if (handler != nil) {
      let fd = handler!.fileDescriptor
      self._handlers.updateValue(handler!, forKey: fd)
      resolve(fd)
    } else {
      reject(nil, "Can't open file", nil)
    }
  }

  @objc
  func close(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      handler!.closeFile()
      self._handlers.removeValue(forKey: fd)
      resolve(nil)
    } else {
      reject(nil, "Can't close file", nil)
    }
  }

  @objc
  func seek(_ fd: Int32, toPosition pos: UInt64, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      handler!.seek(toFileOffset: pos)
      resolve(nil)
    } else {
      reject(nil, "Can't seek file", nil)
    }
  }

  @objc
  func read(_ fd: Int32, ofLength len: UInt64, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil && len > 0) {
      let buffer = handler!.readData(ofLength: Int(len))
      if (buffer.count == len) {
        let bytes = [UInt8](buffer)
        var value = [UInt8](repeating: 0, count: bytes.count)
        for i in 0 ..< bytes.count {
          value[i] = bytes[i].byteSwapped
        }
        resolve(value)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }

  @objc
  func readByte(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
//      let buffer = self._file!.readDataToEndOfFile()
//      resolve(String(data: buffer, encoding: String.Encoding.utf8))
      let buffer = handler!.readData(ofLength: 1)
      if (buffer.count > 0) {
        resolve(buffer.first)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }

  @objc
  func readInt32(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      let buffer = handler!.readData(ofLength: 4)
      if (buffer.count > 0) {
        let bytes = (buffer as NSData).bytes.load(as: UInt32.self)
        let value = UInt32(bigEndian: bytes)
        resolve(value)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }

  @objc
  func readInt64(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      let buffer = handler!.readData(ofLength: 8)
      if (buffer.count > 0) {
        let bytes = (buffer as NSData).bytes.load(as: Int64.self)
        let value = Int64(bigEndian: bytes)
        resolve(value)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }

  @objc
  func readFloat32(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      let buffer = handler!.readData(ofLength: 8)
      if (buffer.count > 0) {
        let bytes = (buffer as NSData).bytes.load(as: Int64.self)
        let value = Float32(bigEndian: bytes)
        resolve(value)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }

  @objc
  func readFloat64(_ fd: Int32, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let handler = self._handlers[fd]
    if (handler != nil) {
      let buffer = handler!.readData(ofLength: 8)
      if (buffer.count > 0) {
        let bytes = (buffer as NSData).bytes.load(as: Int64.self)
        let value = Float64(bigEndian: bytes)
        resolve(value)
        return
      }
    }

    reject(nil, "Can't read file", nil)
  }
}
