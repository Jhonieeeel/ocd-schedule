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
import { CalendarIcon, Filter } from 'lucide-react';
import { months, years } from '../leave/leave_data/data';
import { columns } from './columns';
import { DataTable } from './data-table';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function UserBalances() {
    let currentMonth = (new Date().getMonth() + 1).toString();
    let currentYear = new Date().getFullYear().toString();

    const { setData, data } = useForm({
        month_id: currentMonth.toString(),
        year: currentYear.toString(),
    });

    const [page, setPage] = useState(1);

    async function fetchBalances(month: string, year: string, page: number) {
        const res = await fetch(
            `/all_balances?month=${month}&year=${year}&page=${page}`,
        );
        return res.json();
    }

    const { data: testBalances, isLoading } = useQuery({
        queryKey: ['userBalances', data.month_id, data.year, page],
        queryFn: () => fetchBalances(data.month_id, data.year, page),
        staleTime: 1000 * 60,
    });

    let filterMonth = months.find((m) => m.id === Number(data.month_id))?.month;

    return (
        <>
            <Head title="User Balances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:m-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                        <div>
                            <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                                Overview
                            </p>
                            <h2 className="text-2xl font-semibold text-foreground">
                                Employee Balances
                            </h2>
                            <div className="mt-2 flex items-center gap-2 rounded-md">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-md font-medium">
                                    {filterMonth} {data.year}
                                </span>
                            </div>
                        </div>
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
                                    {(data.month_id !== currentMonth ||
                                        data.year !== currentYear) && (
                                        <button
                                            onClick={() => {
                                                setData({
                                                    month_id: currentMonth,
                                                    year: currentYear,
                                                });
                                            }}
                                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Filters */}
                                <div className="flex items-center justify-around p-4">
                                    {/* Month */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                            Month
                                        </label>
                                        <Select
                                            value={data.month_id}
                                            onValueChange={(value) =>
                                                setData('month_id', value)
                                            }
                                        >
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Select month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {months.map((m, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={m.id.toString()}
                                                    >
                                                        {m.month.toString()}
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
                                                        value={y.toString()}
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
                                                month_id: undefined,
                                                year: undefined,
                                            });
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="relative mt-4 overflow-hidden rounded-xl">
                    <DataTable
                        data={testBalances?.data ?? []}
                        columns={columns}
                        isLoading={isLoading}
                        page={page}
                        onSetPage={setPage}
                    />
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={page <= 1}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page >= (testBalances?.last_page ?? 1)}
                        >
                            Next
                        </Button>
                    </div>
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
