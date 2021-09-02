export declare enum FileSystemUploadType {
    BINARY_CONTENT = 0,
    MULTIPART = 1
}
export declare type FileSystemAcceptedUploadHttpMethod = 'POST' | 'PUT' | 'PATCH';
export declare type compressionMethod = 'auto' | 'manual';
declare type videoCompresssionType = {
    bitrate?: number;
    compressionMethod?: compressionMethod;
};
export declare enum FileSystemSessionType {
    BACKGROUND = 0,
    FOREGROUND = 1
}
export declare type HTTPResponse = {
    status: number;
    headers: Record<string, string>;
    body: string;
};
export declare type FileSystemUploadOptions = ({
    uploadType?: FileSystemUploadType.BINARY_CONTENT;
} | {
    uploadType: FileSystemUploadType.MULTIPART;
    fieldName?: string;
    mimeType?: string;
    parameters?: Record<string, string>;
}) & {
    headers?: Record<string, string>;
    httpMethod?: FileSystemAcceptedUploadHttpMethod;
    sessionType?: FileSystemSessionType;
};
export declare type VideoCompressorType = {
    compress(fileUrl: string, options?: videoCompresssionType, onProgress?: (progress: number) => void): Promise<string>;
    backgroundUpload(url: string, fileUrl: string, options: FileSystemUploadOptions, onProgress?: (writtem: number, total: number) => void): Promise<any>;
    activateBackgroundTask(onExpired?: (data: any) => void): Promise<any>;
    deactivateBackgroundTask(): Promise<any>;
};
declare const Video: VideoCompressorType;
export default Video;
