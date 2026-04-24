import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { index } from '@/routes/balance';
import { Head, useForm } from '@inertiajs/react';
import { Filter } from 'lucide-react';
import { Balance, months, years } from '../leave/leave_data/data';
import { columns } from './columns';
import { DataTable } from './data-table';

import { useQuery } from '@tanstack/react-query';

export default function UserBalances() {
    const { setData, data } = useForm({
        month: 11 as number | null,
        year: '2024' as string | null,
        balances: [],
    });

    async function fetchBalances(month: number | null, year: string | null) {
        const res = await fetch(`/all_balances/?month=${month}&year=${year}`);
        const data = res.json();

        return data;
    }

    const { data: testBalances, isLoading } = useQuery({
        queryKey: ['userBalances', data.month, data.year],
        queryFn: () => fetchBalances(data.month, data.year),
        staleTime: 2000,
    });

    return (
        <>
            <Head title="User Balances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:m-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-md text-2xl font-semibold">
                            Employee Balances
                        </h3>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filter by
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-80 p-0"
                                align="end"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">
                                            Filter
                                        </span>
                                    </div>
                                    {(data.month || data.year) && (
                                        <button
                                            onClick={() => {
                                                setData({
                                                    month: null,
                                                    year: undefined,
                                                });
                                            }}
                                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Filters */}
                                <div className="space-y-4 p-4">
                                    {/* Month */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Month
                                        </label>
                                        <Select
                                            value={data.month}
                                            onValueChange={(value) =>
                                                setData(
                                                    'month',
                                                    value as unknown as number,
                                                )
                                            }
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Select month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((m, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={m.id}
                                                    >
                                                        {m.month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Year */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Year
                                        </label>
                                        <Select
                                            value={data.year}
                                            onValueChange={(value) =>
                                                setData('year', value)
                                            }
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {years.map((y) => (
                                                    <SelectItem
                                                        key={y}
                                                        value={y}
                                                    >
                                                        {y}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex gap-2 border-t bg-muted/40 px-4 py-3">
                                    <Button
                                        variant="outline"
                                        className="h-8 flex-1 text-sm"
                                        onClick={() => {
                                            setData({
                                                month: undefined,
                                                year: undefined,
                                            });
                                        }}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        className="h-8 flex-1 text-sm"
                                        // onClick={handleApply}
                                        disabled={!data.month && !data.year}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="relative mt-4 overflow-hidden rounded-xl">
                    <DataTable
                        data={testBalances ?? []}
                        columns={columns}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    );
}

UserBalances.layout = {
    breadcrumbs: [
        {
            title: 'User Balances',
            href: index(),
        },
    ],
};
