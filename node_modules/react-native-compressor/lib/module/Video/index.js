import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
const VideoCompressEventEmitter = new NativeEventEmitter(NativeModules.VideoCompressor);
const NativeVideoCompressor = NativeModules.VideoCompressor;
const Video = {
  compress: async (fileUrl, options, onProgress) => {
    const uuid = uuidv4();
    let subscription = null;

    try {
      if (onProgress) {
        subscription = VideoCompressEventEmitter.addListener('videoCompressProgress', event => {
          if (event.uuid === uuid) {
            onProgress(event.data.progress);
          }
        });
      }

      const modifiedOptions = {
        uuid
      };
      if (options !== null && options !== void 0 && options.bitrate) modifiedOptions.bitrate = options === null || options === void 0 ? void 0 : options.bitrate;

      if (options !== null && options !== void 0 && options.compressionMethod) {
        modifiedOptions.compressionMethod = options === null || options === void 0 ? void 0 : options.compressionMethod;
      } else {
        modifiedOptions.compressionMethod = 'manual';
      }

      if (options !== null && options !== void 0 && options.maxSize) {
        modifiedOptions.maxSize = options === null || options === void 0 ? void 0 : options.maxSize;
      } else {
        modifiedOptions.maxSize = 640;
      }

      const result = await NativeVideoCompressor.compress(fileUrl, modifiedOptions);
      return result;
    } finally {
      if (subscription) {
        VideoCompressEventEmitter.removeSubscription(subscription);
      }
    }
  },
  backgroundUpload: async (url, fileUrl, options, onProgress) => {
    const uuid = uuidv4();
    let subscription = null;

    try {
      if (onProgress) {
        subscription = VideoCompressEventEmitter.addListener('VideoCompressorProgress', event => {
          if (event.uuid === uuid) {
            onProgress(event.data.written, event.data.total);
          }
        });
      }

      if (Platform.OS === 'android' && fileUrl.includes('file://')) {
        fileUrl = fileUrl.replace('file://', '');
      }

      const result = await NativeVideoCompressor.upload(fileUrl, {
        uuid,
        method: options.httpMethod,
        headers: options.headers,
        url
      });
      return result;
    } finally {
      if (subscription) {
        VideoCompressEventEmitter.removeSubscription(subscription);
      }
    }
  },

  activateBackgroundTask(onExpired) {
    if (onExpired) {
      const subscription = VideoCompressEventEmitter.addListener('backgroundTaskExpired', event => {
        onExpired(event);
        VideoCompressEventEmitter.removeSubscription(subscription);
      });
    }

    return NativeVideoCompressor.activateBackgroundTask({});
  },

  deactivateBackgroundTask() {
    VideoCompressEventEmitter.removeAllListeners('backgroundTaskExpired');
    return NativeVideoCompressor.deactivateBackgroundTask({});
  }

};
export default Video;
//# sourceMappingURL=index.js.map