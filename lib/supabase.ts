// import { createClient } from "@supabase/supabase-js"
// import type { Database } from "./database.types"

// // Check if we have valid Supabase credentials
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// export const isDemoMode =
//   !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project") || supabaseAnonKey.includes("your-anon-key")

// // Create a mock Supabase client for demo mode
// const createMockSupabaseClient = () => {
//   const mockResponse = { data: null, error: null }

//   return {
//     auth: {
//       getSession: async () => ({ data: { session: null }, error: null }),
//       onAuthStateChange: () => ({
//         data: {
//           subscription: {
//             unsubscribe: () => {},
//           },
//         },
//       }),
//       signInWithPassword: async () => ({
//         data: { user: null, session: null },
//         error: { message: "Demo mode - use demo credentials" },
//       }),
//       signUp: async () => ({
//         data: { user: null, session: null },
//         error: { message: "Demo mode - registration simulated" },
//       }),
//       signOut: async () => ({ error: null }),
//     },
//     from: () => ({
//       select: () => ({
//         eq: () => ({
//           single: async () => mockResponse,
//         }),
//       }),
//       update: () => ({
//         eq: () => ({
//           select: () => ({
//             single: async () => mockResponse,
//           }),
//         }),
//       }),
//       insert: async () => mockResponse,
//     }),
//   }
// }

// // Export the appropriate client
// export const supabase = isDemoMode
//   ? createMockSupabaseClient()
//   : createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
//       auth: {
//         persistSession: true,
//         autoRefreshToken: true,
//       },
//     })

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)
