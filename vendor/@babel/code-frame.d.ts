declare module '@babel/code-frame' {
  interface BabelCodeFrameOptions {
    /** Syntax highlight the code as JavaScript for terminals. default: false */
    highlightCode?: boolean
    /**  The number of lines to show above the error. default: 2 */
    linesBelow?: number
    /**  The number of lines to show below the error. default: 3 */
    linesAbove?: number
    /**
     * Forcibly syntax highlight the code as JavaScript (for non-terminals);
     * overrides highlightCode.
     * default: false
     */
    forceColor?: boolean
  }

  interface BabelCodeFrameLineConfiguration {
    start?: {
      column?: number
      line?: number
    }
    end?: {
      column?: number
      line?: number
    }
  }

  /**
   * Generate errors that contain a code frame that point to source locations.
   *
   * @param rawLines Raw lines to frame
   * @param lineNumber Line number (1 indexed)
   * @param colNumber Column number
   * @param options Additional options
   *
   * @returns Framed code
   */
  export function codeFrameColumns(
    rawLines: string,
    loc: BabelCodeFrameLineConfiguration,
    options?: BabelCodeFrameOptions
  ): string
}
