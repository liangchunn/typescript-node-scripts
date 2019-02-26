declare module 'pstree.remy' {
  export const hasPS: boolean
  export default function main(
    pid: string,
    callback: (error: Error, children: string[]) => void
  ): void
}
