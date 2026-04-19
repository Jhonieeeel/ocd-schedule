import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Balance } from '../leave/leave_data/data';

export const columns: ColumnDef<Balance>[] = [
    {
        accessorKey: 'user.name',
        id: 'user.name',
        header: () => <div className="py-4">Employee Name</div>,
        cell: ({ row }) => {
            return <div className="font-medium">{row.original.user.name}</div>;
        },
    },

    // VL

    {
        accessorKey: 'vl_balance',
        header: () => (
            <div className="font-semibold text-orange-600 dark:text-yellow-300">
                Current VL
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="py-1.5 font-medium text-orange-600 dark:text-yellow-300">
                    {row.original.vl_balance}
                </div>
            );
        },
    },
    {
        accessorKey: 'vl_used',
        header: () => <div>Remaining VL (Possible)</div>,
        cell: ({ row }) => {
            let balance = row.original;

            let vlBalance = balance.vl_balance;
            let undertime = balance.undertime;
            let vlUsed = balance.vl_used ?? 0;
            let flUsed = balance.fl_used ?? 0;

            let remainingVL =
                vlBalance - (undertime + (vlUsed ?? flUsed)) + 1.25;

            return (
                <div className="py-1.5 font-medium">
                    {remainingVL.toFixed(3)}
                </div>
            );
        },
    },

    // SL
    {
        accessorKey: 'sl_balance',
        header: () => (
            <div className="font-semibold text-orange-600 dark:text-yellow-300">
                Current SL
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="py-1.5 font-medium text-orange-600 dark:text-yellow-300">
                    {row.original.sl_balance}
                </div>
            );
        },
    },
    {
        accessorKey: 'sl_used',
        header: () => <div>Remaining SL (Possible)</div>,
        cell: ({ row }) => {
            let balance = row.original;

            let nextSL = balance.sl_balance - (balance.sl_used ?? 0) + 1.25;

            return (
                <div className="py-1.5 font-medium">{nextSL.toFixed(3)}</div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const balance = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log(balance)}>
                            Add to Next month
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
