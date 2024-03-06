import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  try{
    const {error} =  await supabase.auth.signOut()
    if(error){
      return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
  }
  }catch{}
  

  return NextResponse.redirect(`${requestUrl.origin}/auth/login`)
}