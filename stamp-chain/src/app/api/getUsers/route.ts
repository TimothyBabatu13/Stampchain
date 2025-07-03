import { createClient } from "@/config/supabase/supabase-server"
import { NextResponse } from "next/server"

export const GET = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    
      return NextResponse.json(data)
}