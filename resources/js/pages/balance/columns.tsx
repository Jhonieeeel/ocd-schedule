import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Balance = {
    id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
    };
    year: number;
    month: number;
    vl_balance: number;
    vl_used?: number;
    sl_balance: number;
    sl_used?: number;
    fl_balance: number;
    fl_used?: number;
    undertime?: number;
};
export const columns: ColumnDef<Balance>[] = [
    {
        accessorKey: 'user.name',
        header: () => <div>Employee Name</div>,
        cell: ({ row }) => (
            <div className="font-medium text-yellow-500">
                {row.original.user.name}
            </div>
        ),
    },
    {
        accessorKey: 'undertime',
        header: 'Undertime',
    },
    {
        accessorKey: 'vl_balance',
        header: 'VL Balance',
    },
    {
        accessorKey: 'vl_used',
        header: () => <div>VL Used</div>,
        cell: ({ row }) => (
            <div className="font-medium">{row.original.vl_used ?? 0}</div>
        ),
    },
    {
        accessorKey: 'sl_balance',
        header: 'SL Balance',
    },
    {
        accessorKey: 'sl_used',
        header: () => <div>SL Used</div>,
        cell: ({ row }) => (
            <div className="font-medium">{row.original.sl_used ?? 0}</div>
        ),
    },
];
