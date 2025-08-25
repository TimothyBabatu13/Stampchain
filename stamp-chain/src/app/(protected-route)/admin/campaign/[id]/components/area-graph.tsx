import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartConfig = {
    claims: { label: "Claims", color: "hsl(var(--chart-1))" },
    users: { label: "Users", color: "hsl(var(--chart-2))" },
    activity: { label: "Activity", color: "hsl(var(--chart-3))" },
  }

const AreaGraph = ({ id } : {
    id: string
}) => {

    const [data, setData] = useState<null | { day: string; claims: number }[]>(null)

    useEffect(() =>{
        const fetchData = async () => {
        const api = await fetch('/api/overview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        const data = await api.json()
        setData(data)
    }
    fetchData();
    }, [id])
  return (
    <>
        {
            typeof data === 'object' && data !== null ? (
            <ChartContainer config={chartConfig} className="h-[300px] !w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={undefined} height={undefined} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                        type="monotone"
                        dataKey="claims"
                        stroke="var(--color-claims)"
                        fill="var(--color-claims)"
                        fillOpacity={0.6}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>) 
        : (
            <Skeleton className="h-[300px] !w-full bg-black">
            </Skeleton>
        )
        }
    </>
    
)}

export default AreaGraph