/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Tipos auxiliares para a Runtime API do Module Federation.
 * O host usa @module-federation/enhanced/runtime (loadRemote),
 * portanto não há imports estáticos de 'widgetMfe/*' — esses
 * módulos são resolvidos em runtime, não em build time.
 *
 * Se futuramente você migrar para imports estáticos via webpack plugin,
 * adicione as declarações aqui:
 *
 * declare module 'widgetMfe/SimpleText' {
 *   const SimpleText: React.ComponentType;
 *   export default SimpleText;
 * }
 */
