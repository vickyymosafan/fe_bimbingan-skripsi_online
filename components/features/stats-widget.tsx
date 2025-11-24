import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StatsWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export function StatsWidget({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = 'text-primary',
}: StatsWidgetProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-sm font-medium',
                trend.isPositive ? 'text-chart-3' : 'text-destructive'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-[calc(var(--radius)-0.5rem)] bg-secondary', colorClass)}>
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
