import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { index } from '@/routes/balance';

type Balance = {
    id: number;
    user_id: number;
    year: number;
    month: number;
    user: {
        id: number;
        name: string;
    };
    vl_balance: number;
    vl_used?: number;
    sl_balance: number;
    sl_used?: number;
    fl_balance: number;
    fl_used?: number;
    undertime?: number;
};

export default function Balance({ balances }: { balances: Balance[] }) {
    console.log(balances);
    return (
        <>
            <Head title="Balance" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 md:m-6">
                <Tabs defaultValue="table" className="w-full">
                    <TabsList>
                        <TabsTrigger value="table">Table</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table" className="my-4 space-y-3">
                        {/* BALANCE CREATION */}
                        <DataTable data={balances} columns={columns} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

Balance.layout = {
    breadcrumbs: [
        {
            title: 'Balance',
            href: index(),
        },
    ],
};
