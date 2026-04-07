import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  DoorOpen,
  Clock,
  UserX,
  Users,
  Laptop,
  AlertTriangle,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ====================== ANIMATED NUMBER COMPONENT ======================
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1200;
    const startValue = displayValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);


      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (value - startValue) * eased);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// ====================== STAT CARD ======================
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: 'red' | 'green' | 'blue';
}) => {
  const styles = {
    red: { iconBg: 'bg-red-500', numberColor: 'text-red-600 dark:text-red-500', darkBorder: 'dark:border-red-500/60' },
    green: { iconBg: 'bg-emerald-500', numberColor: 'text-emerald-600 dark:text-emerald-500', darkBorder: 'dark:border-emerald-500/60' },
    blue: { iconBg: 'bg-blue-500', numberColor: 'text-blue-600 dark:text-blue-500', darkBorder: 'dark:border-blue-500/60' },
  };

  const s = styles[color];
  const IconComponent = color === 'red' ? DoorOpen : color === 'green' ? Clock : UserX;

  return (
    <Card className={`bg-card border-2 rounded-3xl overflow-hidden h-50 shadow-sm border-border ${s.darkBorder} hover:border-border dark:hover:border-current transition-colors`}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${s.iconBg}`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <button className="text-muted-foreground hover:text-foreground p-1 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center -mt-1 gap-2">
          <p
            className={`text-[3.85rem] leading-none font-bold tracking-[-4.5px] ${s.numberColor}`}
            style={{ fontFamily: '"Akira Expanded", sans-serif' }}
          >
            <AnimatedNumber value={value} />
          </p>
          <p className="text-base font-medium text-muted-foreground text-center tracking-tight">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// ====================== TABLE CARD ======================
const TableCard = ({
  title,
  icon: Icon,
  data: initialData,
}: {
  title: string;
  icon: React.ElementType;
  data: Array<{ employee: string; total: number }>;
}) => {
  const [data, setData] = useState(initialData);

  const handleSort = (option: string) => {
    let sortedData = [...initialData];
    switch (option) {
      case "az": sortedData.sort((a, b) => a.employee.localeCompare(b.employee)); break;
      case "za": sortedData.sort((a, b) => b.employee.localeCompare(a.employee)); break;
      case "low-high": sortedData.sort((a, b) => a.total - b.total); break;
      case "high-low": sortedData.sort((a, b) => b.total - a.total); break;
      default: sortedData = [...initialData];
    }
    setData(sortedData);
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-6 pt-5 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleSort("az")}>A-Z (Employee Name)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("za")}>Z-A (Employee Name)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("low-high")}>Lowest to Highest (Total)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("high-low")}>Highest to Lowest (Total)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p className="text-base">No data yet</p>
            <p className="text-sm mt-1">No entries found for this category</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">EMPLOYEE</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-sm text-foreground">{item.employee}</td>
                    <td className="py-4 px-4 text-sm text-right font-medium text-foreground">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ====================== MAIN DASHBOARD ======================
export default function Dashboard() {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonths, setSelectedMonths] = useState<number[]>([today.getMonth() + 1]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllYears, setShowAllYears] = useState(false);

  const sortedMonths = useMemo(() => [...selectedMonths].sort((a, b) => a - b), [selectedMonths]);

  const filterButtonLabel = useMemo(() => {
    if (sortedMonths.length === 12) return `January – December ${selectedYear}`;
    if (sortedMonths.length === 1) return `${MONTHS[sortedMonths[0] - 1]} ${selectedYear}`;
    return `${MONTHS[sortedMonths[0] - 1]} – ${MONTHS[sortedMonths[sortedMonths.length - 1] - 1]} ${selectedYear}`;
  }, [sortedMonths, selectedYear]);

  const defaultYears = [2024, 2025, 2026, 2027];
  const allYears = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const displayedYears = showAllYears ? allYears : defaultYears;

  useEffect(() => {
    console.log(`Filter updated → ${selectedYear} | Months:`, sortedMonths);
  }, [selectedYear, sortedMonths]);

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex-1 space-y-8 p-6 bg-background min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Leave, Compensatory & Offset Overview</p>
          </div>

          {/* Single Filter Button */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-65 h-11 justify-between text-base font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {filterButtonLabel}
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-95 p-0" align="end">
              <div className="p-6 space-y-6">
                {/* Year Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllYears(!showAllYears)}
                      className="text-xs h-7 px-2"
                    >
                      {showAllYears ? "Show Less" : "All Years"}
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {displayedYears.map((year) => (
                      <Button
                        key={year}
                        variant={year === selectedYear ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Month Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-muted-foreground">Months</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedMonths([1,2,3,4,5,6,7,8,9,10,11,12])}>
                        All
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedMonths([today.getMonth() + 1])}>
                        Current
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto">
                    {MONTHS.map((month, idx) => {
                      const monthNum = idx + 1;
                      const isSelected = selectedMonths.includes(monthNum);
                      return (
                        <button
                          key={month}
                          onClick={() => {
                            setSelectedMonths((prev) =>
                              prev.includes(monthNum)
                                ? prev.filter((m) => m !== monthNum)
                                : [...prev, monthNum]
                            );
                          }}
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-all ${
                            isSelected ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/40'
                          }`}>
                            {isSelected && <span className="text-white text-[10px]">✓</span>}
                          </div>
                          <span>{month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t p-4 flex gap-3 bg-muted/30">
                <Button variant="outline" className="flex-1" onClick={() => { alert("CSV Export coming soon"); setIsFilterOpen(false); }}>
                  Export CSV
                </Button>
                <Button className="flex-1" onClick={() => { alert("Excel Export coming soon"); setIsFilterOpen(false); }}>
                  Export Excel
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Stat Cards with Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="On leave" value={186} color="red" />
          <StatCard title="Compensatory time off" value={250} color="green" />
          <StatCard title="Auto offset" value={25} color="blue" />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableCard title="On leave (Not filed)" icon={UserX} data={[]} />
          <TableCard title="Auto-offset (Not filed)" icon={AlertTriangle} data={[]} />
          <TableCard title="Planned forced leaves" icon={AlertTriangle} data={[]} />
          <TableCard title="On leave" icon={Users} data={[]} />
          <TableCard title="Auto-Offset" icon={UserX} data={[]} />
          <TableCard title="CTO" icon={Clock} data={[]} />
          <TableCard title="On duty" icon={Laptop} data={[]} />
        </div>
      </div>
    </>
  );
}
