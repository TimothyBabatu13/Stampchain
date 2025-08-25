import { createClient } from "@/config/supabase/supabase-server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const session = await getServerSession();
    if(!session) return NextResponse.json({res: 'Unauthorized'});
    const { id } = await req.json();
    
    try {

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("qr_codes")
      .select("claimed_at, used")
      .eq("campaign_id", id)
      .gte("claimed_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()); // last 30 days

    if (error) throw error;

    
    const counts: Record<string, number> = {};
    data?.forEach((row) => {
      if (row.used && row.claimed_at) {
        const day = new Date(row.claimed_at).toISOString().split("T")[0]; // yyyy-mm-dd
        counts[day] = (counts[day] || 0) + 1;
      }
    });

     
    const today = new Date();
    const formatted: { day: string; claims: number }[] = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const key = d.toISOString().split("T")[0]; // yyyy-mm-dd

      formatted.push({
        day: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        claims: counts[key] || 0,
      });
    }
    
    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Error fetching activity:", err);
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
  }
}
