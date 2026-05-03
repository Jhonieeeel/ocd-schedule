import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { destroy, show } from '@/routes/balance';
import { Link, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Balance } from '../leave/leave_data/data';

export const columns: ColumnDef<Balance>[] = [
    {
        accessorKey: 'user.name',
        id: 'user.name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original.user?.name;

            return <div className="truncate font-medium">{user}</div>;
        },
    },

    // VL Balance

    {
        accessorKey: 'vl_balance',
        header: () => (
            <div className="font-semibold text-amber-600 dark:text-amber-300">
                Current VL
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="py-1.5 font-medium text-amber-600 dark:text-amber-300">
                    {row.original.vl_balance}
                </div>
            );
        },
    },
    {
        accessorKey: 'vl_used',
        header: () => (
            <div className="text-muted-foreground">Remaining VL (Possible)</div>
        ),
        cell: ({ row }) => {
            const balance = row.original;

            const isNextYear = balance.month === 12;

            const vlBalance = balance.vl_balance ?? 0;
            const flBalance = balance.fl_balance ?? 0;
            const undertime = balance.undertime ?? 0;
            const vlUsed = balance.vl_used ?? 0;
            const flUsed = balance.fl_used ?? 0;

            const totalUsed = vlUsed + flUsed;

            const calculate =
                vlBalance - (undertime + (isNextYear ? flBalance : totalUsed));

            const result = calculate + 1.25;

            return (
                <div className="py-1.5 font-medium text-muted-foreground">
                    {result.toFixed(3)}
                </div>
            );
        },
    },

    // SL Balance

    {
        accessorKey: 'sl_balance',
        header: () => (
            <div className="font-semibold text-blue-600 dark:text-blue-400">
                Current SL
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="py-1.5 font-medium text-blue-600 dark:text-blue-400">
                    {row.original.sl_balance}
                </div>
            );
        },
    },
    {
        accessorKey: 'sl_used',
        header: () => (
            <div className="text-muted-foreground">Remaining SL (Possible)</div>
        ),
        cell: ({ row }) => {
            let balance = row.original;

            let nextSL =
                (balance.sl_balance ?? 0) - (balance.sl_used ?? 0) + 1.25;

            return (
                <div className="py-1.5 font-medium text-muted-foreground">
                    {nextSL.toFixed(3)}
                </div>
            );
        },
    },

    // Updated at — Teal: semantic "freshness/status" color

    {
        accessorKey: 'updated_at',
        header: () => (
            <div className="font-semibold text-teal-600 dark:text-teal-400">
                Updated At
            </div>
        ),
        cell: ({ row }) => {
            const dateString = row.original.updated_at;
            const date = new Date(dateString ?? '');

            const isUpdated = differenceInDays(new Date(), date) <= 14;

            return (
                <div className="py-1.5 font-medium">
                    {/* <Badge
                        variant="secondary"
                        className={
                            isUpdated
                                ? // Updated — green pill: same-ramp text on fill for both modes
                                  'bg-green-200 text-xs text-green-800 dark:bg-green-900 dark:text-green-300'
                                : // Outdated — coral/red pill
                                  'bg-red-200 text-xs text-red-800 dark:bg-red-900 dark:text-red-300'
                        }
                    >
                        {isUpdated ? 'Updated' : 'Outdated'}
                    </Badge> */}
                    {formatDistanceToNow(new Date(dateString?.toString()), {
                        addSuffix: true,
                    })}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const balance = row.original;

            const form = useForm({
                id: balance.id,
            });

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="dark:border-zinc-600"
                        >
                            <Link href={show(balance.id as number)}>
                                <DropdownMenuItem>View</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                                onClick={() => form.submit(destroy(balance))}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/*  */}
                </>
            );
        },
    },
];
