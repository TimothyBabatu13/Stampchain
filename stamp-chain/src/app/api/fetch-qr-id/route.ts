import { createClient } from "@/config/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
 
    const res =  await req.json() as string;
 
  try {
    const supabase = createClient();
  
    const { data, error } = await supabase
    .from('token_mints')
    .select('id')
    .eq('id', res)
    .single()
    
    if(error){
      return NextResponse.json({
        success: false,
        data: null,
        error: error.message
      })
    }
    return NextResponse.json({ data: data.id, success: true, error: false}) 
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message,
      data: null
    })
  }
}