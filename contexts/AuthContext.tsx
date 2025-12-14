// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"
// import type { User } from "@supabase/supabase-js"
// import { supabase} from "@/lib/supabase"
// import type { Database } from "@/lib/database.types"

// type Profile = Database["public"]["Tables"]["profiles"]["Row"]

// interface AuthContextType {
//   user: (User & { role?: string; full_name?: string }) | null
//   profile: Profile | null
//   loading: boolean
//   signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string; success?: boolean }>
//   signIn: (email: string, password: string) => Promise<{ error?: string; success?: boolean }>
//   logout: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Demo users for when Supabase is not configured
// const DEMO_USERS = [
//   { email: "user@example.com", password: "password123", role: "user", full_name: "Demo User" },
//   { email: "emmanueladewunmi15@gmail.com", password: "Adenuel123450##", role: "admin", full_name: "Emmanuel Adewunmi" },
// ]

// // Helper functions for demo mode user storage
// const getDemoUsers = () => {
//   try {
//     const stored = localStorage.getItem("demo_registered_users")
//     return stored ? JSON.parse(stored) : []
//   } catch {
//     return []
//   }
// }

// const saveDemoUser = (user: any) => {
//   try {
//     const existingUsers = getDemoUsers()
//     const updatedUsers = [...existingUsers, user]
//     localStorage.setItem("demo_registered_users", JSON.stringify(updatedUsers))
//   } catch (error) {
//     console.error("Error saving demo user:", error)
//   }
// }

// const findDemoUser = (email: string, password: string) => {
//   // Check predefined demo users first
//   const predefinedUser = DEMO_USERS.find((u) => u.email === email && u.password === password)
//   if (predefinedUser) return predefinedUser

//   // Check registered demo users
//   const registeredUsers = getDemoUsers()
//   return registeredUsers.find((u: any) => u.email === email && u.password === password)
// }

// const demoUserExists = (email: string) => {
//   // Check predefined demo users
//   if (DEMO_USERS.some((u) => u.email === email)) return true

//   // Check registered demo users
//   const registeredUsers = getDemoUsers()
//   return registeredUsers.some((u: any) => u.email === email)
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<(User & { role?: string; full_name?: string }) | null>(null)
//   const [profile, setProfile] = useState<Profile | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (isDemoMode) {
//       // Demo mode - check localStorage for demo user
//       const demoUser = localStorage.getItem("demo_current_user")
//       if (demoUser) {
//         try {
//           const userData = JSON.parse(demoUser)
//           setUser(userData)
//           setProfile(userData)
//         } catch (error) {
//           console.error("Error parsing demo user data:", error)
//           localStorage.removeItem("demo_current_user")
//         }
//       }
//       setLoading(false)
//       return
//     }

//     // Real Supabase mode - only run if not in demo mode
//     supabase.auth
//       .getSession()
//       .then(({ data: { session } }) => {
//         if (session?.user) {
//           setUser(session.user)
//           fetchProfile(session.user.id)
//         } else {
//           setLoading(false)
//         }
//       })
//       .catch((error) => {
//         console.error("Session error:", error)
//         setLoading(false)
//       })

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (session?.user) {
//         setUser(session.user)
//         await fetchProfile(session.user.id)
//       } else {
//         setUser(null)
//         setProfile(null)
//         setLoading(false)
//       }
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   const fetchProfile = async (userId: string) => {
//     if (isDemoMode) return

//     try {
//       const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

//       if (error) {
//         console.error("Error fetching profile:", error)
//       } else if (data) {
//         setProfile(data)
//         setUser((prev) => (prev ? { ...prev, role: data.role, full_name: data.full_name } : null))
//       }
//     } catch (error) {
//       console.error("Profile fetch error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getUserFriendlyError = (error: any): string => {
//     if (!error) return "An unexpected error occurred"

//     const message = error.message || error.toString()

//     // Network errors
//     if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
//       return "Unable to connect to the server. Please check your internet connection and try again."
//     }

//     // Supabase specific errors
//     if (message.includes("Invalid login credentials")) {
//       return "The email or password you entered is incorrect. Please try again."
//     }

//     if (message.includes("Email not confirmed")) {
//       return "Please check your email and click the confirmation link before signing in."
//     }

//     if (message.includes("User already registered")) {
//       return "An account with this email already exists. Please sign in instead."
//     }

//     if (message.includes("Password should be at least")) {
//       return "Password must be at least 6 characters long."
//     }

//     if (message.includes("Unable to validate email address")) {
//       return "Please enter a valid email address."
//     }

//     if (message.includes("signup is disabled")) {
//       return "New account registration is currently disabled. Please contact support."
//     }

//     // Generic fallbacks
//     if (message.includes("email")) {
//       return "There was an issue with the email address. Please check and try again."
//     }

//     if (message.includes("password")) {
//       return "There was an issue with the password. Please check and try again."
//     }

//     // Return original message if it's already user-friendly
//     if (message.length < 100 && !message.includes("Error:")) {
//       return message
//     }

//     return "Something went wrong. Please try again or contact support if the problem persists."
//   }

//   const signUp = async (email: string, password: string, fullName?: string) => {
//     try {
//       // Demo mode - simulate registration
//       if (isDemoMode) {
//         // Check if user already exists
//         if (demoUserExists(email)) {
//           return { error: "An account with this email already exists. Please sign in instead." }
//         }

//         // Simulate network delay
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         // Create new demo user
//         const newUser = {
//           email,
//           password,
//           role: "user",
//           full_name: fullName || "Demo User",
//           id: "demo-" + Date.now(),
//           created_at: new Date().toISOString(),
//         }

//         // Save to localStorage
//         saveDemoUser(newUser)

//         return { success: true }
//       }

//       // Real Supabase registration - this should never be reached in demo mode
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//           },
//         },
//       })

//       if (error) {
//         return { error: getUserFriendlyError(error) }
//       }

//       // Create profile via API route if user was created
//       if (data.user) {
//         try {
//           const response = await fetch("/api/profile", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: data.user.id,
//               email: data.user.email,
//               fullName: fullName,
//             }),
//           })

//           if (!response.ok) {
//             console.error("Profile creation failed")
//           }
//         } catch (profileError) {
//           console.error("Profile creation request failed:", profileError)
//         }
//       }

//       return { success: true }
//     } catch (error) {
//       return { error: getUserFriendlyError(error) }
//     }
//   }

//   const signIn = async (email: string, password: string) => {
//     try {
//       // Demo mode
//       if (isDemoMode) {
//         const demoUser = findDemoUser(email, password)
//         if (!demoUser) {
//           return { error: "The email or password you entered is incorrect. Please try again." }
//         }

//         // Simulate login delay
//         await new Promise((resolve) => setTimeout(resolve, 1000))

//         const userData = {
//           id: demoUser.id || "demo-" + Date.now(),
//           email: demoUser.email,
//           role: demoUser.role,
//           full_name: demoUser.full_name,
//         }

//         localStorage.setItem("demo_current_user", JSON.stringify(userData))
//         setUser(userData as any)
//         setProfile(userData as any)

//         return { success: true }
//       }

//       // Real Supabase login - this should never be reached in demo mode
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       })

//       if (error) {
//         return { error: getUserFriendlyError(error) }
//       }

//       return { success: true }
//     } catch (error) {
//       return { error: getUserFriendlyError(error) }
//     }
//   }

//   const logout = async () => {
//     try {
//       if (isDemoMode) {
//         localStorage.removeItem("demo_current_user")
//         setUser(null)
//         setProfile(null)
//       } else {
//         await supabase.auth.signOut()
//       }
//     } catch (error) {
//       console.error("Logout error:", error)
//     }
//   }

//   const value = {
//     user,
//     profile,
//     loading,
//     signUp,
//     signIn,
//     logout,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error?: string; success?: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error?: string; success?: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Подписка на изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const getUserFriendlyError = (error: any): string => {
    if (!error) return "An unexpected error occurred";
    const message = error.message || error.toString();
    if (message.includes("Invalid login credentials"))
      return "Invalid email or password";
    if (message.includes("Email not confirmed"))
      return "Please confirm your email before signing in";
    return message;
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) return { error: getUserFriendlyError(error) };
      return { success: true };
    } catch (error) {
      return { error: getUserFriendlyError(error) };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: getUserFriendlyError(error) };
      return { success: true };
    } catch (error) {
      return { error: getUserFriendlyError(error) };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
