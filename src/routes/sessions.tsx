import { backend } from '@/util/backend'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type WeeklySplit = { distinct_weekday_records: number; week_start: string }[]

export const Route = createFileRoute('/sessions')({
  component: SettingsView,
})

const Header = lazy(() => import('@/components/common/Header'))

function SettingsView() {
  const [weeklySplit, setWeeklySplit] = useState<WeeklySplit>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await backend.rpc('get_weekly_exercise_aggregation')
      setWeeklySplit(data as WeeklySplit)
    })()
  }, [])

  const weeklySplitElement = (
    <div className="flex flex-col grow *:text-primary-accent">
      <h1 className="pb-3">Weekly split</h1>
      <ResponsiveContainer>
        <LineChart
          data={weeklySplit}
          margin={{ top: 20, bottom: 0, left: -30, right: 20 }}
        >
          <XAxis dataKey="week_start" />
          <YAxis />
          <CartesianGrid strokeDasharray="1 1" />
          <Line
            dataKey="distinct_weekday_records"
            type="monotone"
            className="*:stroke-primary-accent"
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
  return (
    <>
      <Header link="/" title="Home" />
      <main className="px-2 text-center">
        <div className="flex h-64 pt-5">{weeklySplitElement}</div>
      </main>
    </>
  )
}
