import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { index } from '@/routes/balance';
import { Head } from '@inertiajs/react';
import { Balance } from '../leave/leave_data/data';
import { DataTable } from './data-table';
import { columns } from './columns';

export default function UserBalances({ balances }: { balances: Balance[] }) {
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
                </div>

                <div className="relative mt-4 overflow-hidden rounded-xl">
                    <DataTable data={balances} columns={columns} />
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
