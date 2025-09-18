import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("[v0] OAuth callback route called")
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  console.log("[v0] OAuth callback params:", { code: !!code, next, origin })

  if (code) {
    console.log("[v0] Processing OAuth code exchange...")
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {},
          remove(name: string, options: any) {},
        },
      },
    )

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log("[v0] Code exchange result:", { success: !!data.user, error: error?.message })

    if (!error && data.user) {
      console.log("[v0] Creating/updating user profile...")
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
        avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("[v0] Profile creation error:", profileError)
      } else {
        console.log("[v0] Profile created/updated successfully")
      }

      const redirectUrl = `${origin}${next}`
      console.log("[v0] Redirecting to:", redirectUrl)

      const response = NextResponse.redirect(redirectUrl)

      const cookiesToSet = await supabase.auth.getSession()
      if (cookiesToSet.data.session) {
        response.cookies.set("sb-access-token", cookiesToSet.data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        response.cookies.set("sb-refresh-token", cookiesToSet.data.session.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })
      }

      return response
    } else {
      console.error("[v0] OAuth code exchange failed:", error?.message)
    }
  } else {
    console.log("[v0] No OAuth code found in callback")
  }

  // Return the user to an error page with instructions
  console.log("[v0] Redirecting to error page")
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
