import { ColumnDef } from '@tanstack/react-table';

export type Offset = {
    user_id: number;
    leave_type: string;
    leave_date: Date;
};

export const offSetColumns: ColumnDef<Offset>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'total',
        header: 'Total',
    },
];
