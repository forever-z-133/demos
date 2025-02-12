// 或者使用 npm i -D @types/downloadjs
declare module 'downloadjs' {
  export default function download(data: string | File | Blob | Uint8Array, fileName?: string, mimeType?: string): XMLHttpRequest | boolean
}
