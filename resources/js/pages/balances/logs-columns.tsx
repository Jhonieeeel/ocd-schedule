import { ColumnDef } from '@tanstack/react-table';
import { AttendanceLog } from '../leave/leave_data/data';
import { format } from 'date-fns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MoreHorizontal, Scissors, Timer } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const logsColumns: ColumnDef<AttendanceLog>[] = [
    {
        accessorKey: 'date',
        header: () => (
            <div className="flex items-center gap-1.5 font-semibold">
                <Calendar className="h-3.5 w-3.5" />
                Date
            </div>
        ),
        cell: ({ row }) => {
            const date = row.original.date;
            const formatted = format(new Date(date), 'MMM d, yyyy');
            const day = format(new Date(date), 'EEE');

            return (
                <div className="py-1.5">
                    <div className="font-medium">{formatted}</div>
                    <div className="text-xs text-muted-foreground">{day}</div>
                </div>
            );
        },
    },
    {
        id: 'duration',
        header: () => (
            <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="h-3.5 w-3.5" />
                Duration
            </div>
        ),
        cell: ({ row }) => {
            const { hours, minutes } = row.original;
            const total = (hours ?? 0) * 60 + (minutes ?? 0);

            return (
                <div className="py-1.5">
                    <div className="font-medium tabular-nums">
                        {hours}h {minutes}m
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {total} mins total
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'cutoff',
        header: () => (
            <div className="flex items-center gap-1.5 font-semibold">
                <Scissors className="h-3.5 w-3.5" />
                Cutoff
            </div>
        ),
        cell: ({ row }) => {
            const cutoff = row.original.cutoff;

            return (
                <div className="py-1.5">
                    <Badge
                        variant="outline"
                        className={
                            cutoff === 1
                                ? 'border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950 dark:text-violet-300'
                                : 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }
                    >
                        {cutoff === 1 ? '1st Half' : '2nd Half'}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'is_tardy',
        header: () => (
            <div className="flex items-center gap-1.5 font-semibold">
                <Timer className="h-3.5 w-3.5" />
                Type
            </div>
        ),
        cell: ({ row }) => {
            const isTardy = row.original.is_tardy;

            return (
                <div className="py-1.5">
                    <Badge
                        variant="outline"
                        className={
                            isTardy
                                ? 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                                : 'border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300'
                        }
                    >
                        {isTardy ? '⏰ Tardiness' : '🕐 Undertime'}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const log = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => console.log('edit', log.id)}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => console.log('delete', log.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
