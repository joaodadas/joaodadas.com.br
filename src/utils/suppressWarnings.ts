/**
 * Este arquivo suprime avisos de depreciação específicos do Node.js
 * que não podem ser resolvidos diretamente por estarem em dependências.
 */

// Suprimir aviso de depreciação do util._extend
if (typeof process !== "undefined" && process.emitWarning) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const originalEmitWarning = process.emitWarning;
  process.emitWarning = (
    warning:
      | string
      | ((...args: unknown[]) => void)
      | { name?: string; message?: string },
    ...args: unknown[]
  ) => {
    if (
      typeof warning === "string" &&
      warning.includes("The `util._extend` API is deprecated")
    ) {
      return;
    }
    // @ts-expect-error - Tipagem complexa do process.emitWarning
    return originalEmitWarning(warning, ...args);
  };
}
