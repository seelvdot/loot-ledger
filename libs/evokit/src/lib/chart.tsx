'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from 'recharts';

const FONT_HEADER = 'var(--font-header)';
const FONT_MONO = 'var(--font-mono)';
const LIME = 'oklch(0.87 0.21 128.1)';

export const AREA_DATA = [
  { month: 'Jan', revenue: 18200, users: 1240 },
  { month: 'Feb', revenue: 22400, users: 1580 },
  { month: 'Mar', revenue: 19800, users: 1390 },
  { month: 'Apr', revenue: 27600, users: 2010 },
  { month: 'May', revenue: 31200, users: 2440 },
  { month: 'Jun', revenue: 42190, users: 3847 },
];

export const BAR_DATA = [
  { day: 'Mon', commits: 14 },
  { day: 'Tue', commits: 28 },
  { day: 'Wed', commits: 9 },
  { day: 'Thu', commits: 33 },
  { day: 'Fri', commits: 21 },
  { day: 'Sat', commits: 6 },
  { day: 'Sun', commits: 3 },
];

export const RADIAL_DATA = [
  { name: 'Design', label: 'Design', value: 84, fill: LIME },
  { name: 'Eng', label: 'Eng', value: 67, fill: 'oklch(0.7 0.15 200)' },
  { name: 'PM', label: 'PM', value: 52, fill: 'oklch(0.65 0.2 300)' },
];

export function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-card border border-border px-3 py-2 text-xs shadow-xl"
      style={{ fontFamily: FONT_MONO }}
    >
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color || p.fill }}>
          {p.name}: {p.value > 999 ? `$${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

export function RevenueAreaChart() {
  return (
    <div className="border border-border p-4">
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={AREA_DATA}>
          <defs>
            <linearGradient id="limeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={LIME} stopOpacity={0.25} />
              <stop offset="95%" stopColor={LIME} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{
              fontSize: 9,
              fill: 'oklch(0.55 0 0)',
              fontFamily: FONT_MONO,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: 9,
              fill: 'oklch(0.55 0 0)',
              fontFamily: FONT_MONO,
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <RechartTooltip content={<ChartTip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke={LIME}
            strokeWidth={1.5}
            fill="url(#limeFill)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UsersLineChart() {
  return (
    <div className="border border-border p-4">
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={AREA_DATA}>
          <XAxis
            dataKey="month"
            tick={{
              fontSize: 9,
              fill: 'oklch(0.55 0 0)',
              fontFamily: FONT_MONO,
            }}
            axisLine={false}
            tickLine={false}
          />
          <RechartTooltip content={<ChartTip />} />
          <Line
            type="monotone"
            dataKey="users"
            name="Users"
            stroke="oklch(0.7 0.15 200)"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CommitsBarChart() {
  return (
    <div className="border border-border p-4">
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={BAR_DATA}>
          <XAxis
            dataKey="day"
            tick={{
              fontSize: 9,
              fill: 'oklch(0.55 0 0)',
              fontFamily: FONT_MONO,
            }}
            axisLine={false}
            tickLine={false}
          />
          <RechartTooltip content={<ChartTip />} />
          <Bar
            dataKey="commits"
            name="Commits"
            fill={LIME}
            fillOpacity={0.75}
            radius={0}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamVelocityRadialChart() {
  return (
    <div className="border border-border p-4 flex items-center gap-6">
      <RadialBarChart
        width={160}
        height={120}
        innerRadius={20}
        outerRadius={55}
        data={RADIAL_DATA}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          dataKey="value"
          background={{ fill: 'oklch(0.22 0 0)' }}
          isAnimationActive={false}
        />
        <RechartTooltip content={<ChartTip />} />
      </RadialBarChart>
      <div className="space-y-2">
        {RADIAL_DATA.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <div className="w-2 h-2" style={{ backgroundColor: d.fill }} />
            <span
              className="text-[10px] text-muted-foreground uppercase tracking-widest"
              style={{ fontFamily: FONT_HEADER }}
            >
              {d.name}
            </span>
            <span
              className="text-[10px] text-foreground ml-auto"
              style={{ fontFamily: FONT_MONO }}
            >
              {d.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartDemo() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[350px] border border-dashed border-border bg-card/10 flex items-center justify-center animate-pulse text-[10px] text-primary/40 font-mono tracking-widest uppercase">
        [CARREGANDO GRÁFICOS...]
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p
          className="text-[9px] text-muted-foreground uppercase tracking-widest mb-3"
          style={{ fontFamily: FONT_MONO }}
        >
          Revenue — Area
        </p>
        <RevenueAreaChart />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p
            className="text-[9px] text-muted-foreground uppercase tracking-widest mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            Users — Line
          </p>
          <UsersLineChart />
        </div>
        <div>
          <p
            className="text-[9px] text-muted-foreground uppercase tracking-widest mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            Commits — Bar
          </p>
          <CommitsBarChart />
        </div>
      </div>
      <div>
        <p
          className="text-[9px] text-muted-foreground uppercase tracking-widest mb-3"
          style={{ fontFamily: FONT_MONO }}
        >
          Team velocity — Radial
        </p>
        <TeamVelocityRadialChart />
      </div>
    </div>
  );
}
