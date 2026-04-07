import { ColumnDef } from '@tanstack/react-table';

export type Leave = {
    user_id: number;
    leave_type: string;
    leave_date: Date;
};

export const columns: ColumnDef<Leave>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'total',
        header: 'Total',
    },
];
