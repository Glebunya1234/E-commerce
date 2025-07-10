//
// Minimal browser-only stub for `isomorphic-ws`.
//
// Supabase’s realtime client conditionally imports `isomorphic-ws` so that it
// can use WebSockets in Node.  In the browser we already have `WebSocket` on
// the global scope, so we simply export it.
//
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore – The constructor signature is fine for Supabase.
const WS: typeof WebSocket =
  typeof WebSocket !== "undefined"
    ? WebSocket
    : // In (very) old browsers `WebSocket` might be missing.
      // Throwing makes the failure explicit instead of leaving things hanging.
      ((() => {
        throw new Error("WebSocket is not available in this environment.")
      })() as never)

export default WS
export { WS as WebSocket }
