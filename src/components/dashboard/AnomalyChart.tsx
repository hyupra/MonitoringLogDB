import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { TimeSeriesData } from "@/types/log";
import { format, parseISO } from "date-fns";

interface AnomalyChartProps {
  data: TimeSeriesData[];
  dataKey: keyof TimeSeriesData;
  title: string;
  color: string;
  unit?: string;
  threshold?: number;
}

export function AnomalyChart({ 
  data, 
  dataKey, 
  title, 
  color, 
  unit = "",
  threshold 
}: AnomalyChartProps) {
  const formattedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      time: format(parseISO(item.timestamp), "HH:mm"),
      value: item[dataKey] as number,
    }));
  }, [data, dataKey]);

  const anomalyPoints = useMemo(() => {
    return formattedData.filter((item) => item.is_anomaly);
  }, [formattedData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {title}: <span className="font-mono text-foreground">{data.value}{unit}</span>
          </p>
          {data.is_anomaly && (
            <p className="text-xs text-destructive font-medium mt-1">⚠ Anomaly Detected</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {threshold && (
          <span className="text-xs text-muted-foreground">
            Threshold: {threshold}{unit}
          </span>
        )}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.3}
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${dataKey})`}
            />
            {/* Anomaly markers */}
            {anomalyPoints.map((point, index) => (
              <ReferenceDot
                key={index}
                x={point.time}
                y={point.value}
                r={6}
                fill="hsl(var(--destructive))"
                stroke="hsl(var(--background))"
                strokeWidth={2}
                className="anomaly-marker"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
