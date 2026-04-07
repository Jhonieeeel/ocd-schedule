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
  MoreVertical
} from 'lucide-react';

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
    red: {
      bg: 'bg-zinc-900',
      border: 'border-red-500/40',
      iconBg: 'bg-red-500',
      numberColor: 'text-red-500',
      icon: DoorOpen,
    },
    green: {
      bg: 'bg-zinc-900',
      border: 'border-emerald-500/40',
      iconBg: 'bg-emerald-500',
      numberColor: 'text-emerald-500',
      icon: Clock,
    },
    blue: {
      bg: 'bg-zinc-900',
      border: 'border-blue-500/40',
      iconBg: 'bg-blue-500',
      numberColor: 'text-blue-500',
      icon: UserX,
    },
  };

  const s = styles[color];
  const IconComponent = s.icon;

  return (
    <Card className={`${s.bg} ${s.border} border-2 rounded-3xl overflow-hidden h-[200px] shadow-xl`}>
      <CardContent className="p-6 h-full flex flex-col">
        {/* Top: Icon + Menu */}
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl ${s.iconBg}`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <button className="text-zinc-400 hover:text-white p-1 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Balanced Centered Content */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-1 gap-2">
          {/* Big Number */}
          <p
            className={`text-[3.85rem] leading-none font-bold tracking-[-4.5px] ${s.numberColor}`}
            style={{ fontFamily: '"Akira Expanded", sans-serif' }}
          >
            {value}
          </p>

          {/* Title */}
          <p className="text-base font-medium text-zinc-400 text-center tracking-tight">
            {title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const TableCard = ({
  title,
  icon: Icon,
  data,
}: {
  title: string;
  icon: React.ElementType;
  data: Array<{ employee: string; total: number }>;
}) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardContent className="p-6 pt-5 pb-6">   {/* Reduced top/bottom padding */}
        <div className="flex items-center gap-3 mb-5">   {/* Slightly reduced margin */}
          <div className="p-2 bg-zinc-800 rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-lg text-white">{title}</h3>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-zinc-500">   {/* Reduced py-12 to py-8 */}
            <p className="text-base">No data yet</p>
            <p className="text-sm mt-1">No entries found for this category</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 font-medium text-sm text-zinc-400">Employee</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-zinc-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-zinc-900">
                    <td className="py-3 px-4 text-sm text-zinc-300">{item.employee}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-white">
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

export default function Dashboard() {
<<<<<<< HEAD
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:m-6">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}
=======
  const onLeaveData = [
    { employee: "Carpizo, Rosalie Lucas", total: 4 },
    { employee: "Clarete, Carlito Jr. Pacudan", total: 18 },
    { employee: "Clarete, Carlito Jr. Pacudan", total: 24 },
    { employee: "Clarete, Carlito Jr. Pacudan", total: 12 },
  ];
>>>>>>> origin/DashboardUI

  const ctoData = [
    { employee: "Briol, Ronald Anthony Paez", total: 2 },
    { employee: "Becera, Carlo Boneto Cabatuan", total: 1 },
    { employee: "Ticano, James Mag-abo", total: 1 },
  ];

  const onDutyData = [
    { employee: "Alingasa, Ray Francis Bacarisas", total: 1 },
    { employee: "Borday, Jenn Eric Gutang", total: 1 },
    { employee: "Vasallan, Rocky Taño", total: 1 },
  ];

  return (
    <>
      <Head title="Dashboard" />

      <div className="flex-1 space-y-8 p-6 bg-[#0A0A0A] min-h-screen text-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400 mt-1">Employee Leave & Attendance Summary</p>
          </div>

          <Button variant="outline" className="gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-900">
            <Calendar className="w-4 h-4" />
            April 2026
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="On leave" value={186} color="red" />
          <StatCard title="Compensatory time off" value={250} color="green" />
          <StatCard title="Auto offset" value={25} color="blue" />
        </div>

        {/* Tables - Now more balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TableCard title="On leave (Not filed)" icon={UserX} data={[]} />
          <TableCard title="Auto-offset (Not filed)" icon={AlertTriangle} data={[]} />
          <TableCard title="Planned forced leaves" icon={AlertTriangle} data={[]} />
          <TableCard title="On leave" icon={Users} data={onLeaveData} />
          <TableCard title="Auto-Offset" icon={UserX} data={onLeaveData} />
          <TableCard title="CTO" icon={Clock} data={ctoData} />
          <TableCard title="On duty" icon={Laptop} data={onDutyData} />
        </div>
      </div>
    </>
  );
}
