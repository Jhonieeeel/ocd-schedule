import { Card } from '@/components/ui/card';
import { Head, usePage } from '@inertiajs/react';
import { Clock, DoorClosed, LucideIcon, User2 } from 'lucide-react';
import { columns } from './dashboard/leave-columns';
import { LeaveTable } from './dashboard/leave-table';
import { offSetColumns } from './dashboard/offset-columns';
import { OffSetTable } from './dashboard/offset-table';
import StatCard from './dashboard/stat-card';
import { LeaveEvent } from './leave/leave_data/data';

type Card = {
    title: string;
    total: number;
    icon: LucideIcon | null;
    css: string;
};

type LeaveType = {
    id: number;
    user_id: number;
    leave_type: string;
    description: string;
    date_from: string;
    date_to: string;

    created_at: string;
    updated_at: string;
};

type DashboardProps = {
    cto: LeaveType[];
    auto_offset: LeaveType[];
    leaves: LeaveType[];
};

export default function Dashboard({
    cto,
    auto_offset,
    leaves,
}: DashboardProps) {
    const statData: Card[] = [
        {
            title: 'On Leave',
            total: leaves.length,
            icon: DoorClosed,
            css: 'text-white bg-red-500',
        },
        {
            title: 'Compensatory time off',
            total: cto.length,
            icon: Clock,
            css: 'text-white bg-green-500',
        },
        {
            title: 'Auto Offset',
            total: auto_offset.length,
            icon: User2,
            css: 'text-white bg-blue-500',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:m-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-md text-2xl font-semibold">
                            Dashboard Overview
                        </h3>
                        <p className="text-gray-400">
                            Leave, Compensatory & Offset Overview
                        </p>
                    </div>
                    <div>{/* button here */}</div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {statData.map((data, index) => (
                        <div key={index}>
                            <StatCard data={data} />
                        </div>
                    ))}
                </div>
                <div className="relative mt-4 grid flex-1 grid-cols-2 gap-4 overflow-hidden rounded-xl">
                    <LeaveTable columns={columns} data={[]} />
                    <OffSetTable columns={offSetColumns} data={[]} />
                </div>
            </div>
        </>
    );
}
