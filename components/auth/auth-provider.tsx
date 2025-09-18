"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { toast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGitHub: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let supabase
    try {
      supabase = createClient()
    } catch (error) {
      console.error("[v0] Failed to create Supabase client:", error)
      setLoading(false)
      return
    }

    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("[v0] Failed to get session:", error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const supabase = createClient()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })
      // Redirect to homepage after successful login
      window.location.href = "/"
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const supabase = createClient()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/profile`,
          data: {
            full_name: name,
          },
        },
      })
      if (error) throw error
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      })
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    const supabase = createClient()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/api/auth/callback?next=/`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })
      if (error) throw error
      toast({
        title: "Signing in with Google...",
        description: "Redirecting you to Google for authentication.",
      })
    } finally {
      setLoading(false)
    }
  }

  const signInWithGitHub = async () => {
    const supabase = createClient()
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/api/auth/callback?next=/`,
          scopes: "user:email",
        },
      })
      if (error) throw error
      toast({
        title: "Signing in with GitHub...",
        description: "Redirecting you to GitHub for authentication.",
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    const supabase = createClient()
    try {
      console.log("[v0] Starting logout process...")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("[v0] Supabase signOut error:", error)
        throw error
      }

      console.log("[v0] Supabase signOut successful, clearing user state...")
      // Clear user state immediately
      setUser(null)

      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      })

      console.log("[v0] Redirecting to homepage...")
      // Redirect to homepage after logout
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Sign out error:", error)
      // Even if there's an error, clear the local state
      setUser(null)
      toast({
        title: "Logout failed",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      })
      // Still redirect even if there was an error
      window.location.href = "/"
    }
  }

  const resetPassword = async (email: string) => {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/reset-password`,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithGitHub,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
