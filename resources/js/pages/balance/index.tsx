import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { index } from '@/routes/balance';
import { Head } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { Balance as BalanceType } from '../leave/leave_userBalance?/userBalance?';

export default function Balance({ userBalance }: { userBalance: BalanceType }) {
    return (
        <>
            <Head title="Balance" />
            {userBalance === null ? (
                <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
                    <p className="text-lg font-semibold">
                        No balance records yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Your leave balance hasn't been updated yet. Please
                        contact HR for more information.
                    </p>
                </div>
            ) : (
                <div
                    className="grid grid-cols-4 gap-8 overflow-x-auto rounded-xl p-4 md:m-6"
                    key={userBalance?.id}
                >
                    <div className="col-span-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {userBalance?.as_of ? (
                                <>
                                    Showing balance for{' '}
                                    <span className="font-medium text-foreground">
                                        {new Date(
                                            0,
                                            (userBalance?.month ?? 1) - 1,
                                        ).toLocaleString('default', {
                                            month: 'long',
                                        })}{' '}
                                        {userBalance?.year}
                                    </span>{' '}
                                    as of{' '}
                                    <span className="font-medium text-foreground">
                                        {/* {new Date(
                                                userBalance?.as_of,
                                            ).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })} */}
                                    </span>
                                    . Contact HR if this seems outdated.
                                </>
                            ) : (
                                <>
                                    <span className="text-yellow-600 dark:text-yellow-400">
                                        ⚠️ Showing balance for{' '}
                                        <span className="font-medium">
                                            {new Date(
                                                0,
                                                (userBalance?.month ?? 1) - 1,
                                            ).toLocaleString('default', {
                                                month: 'long',
                                            })}{' '}
                                            {userBalance?.year}
                                        </span>
                                        . Not yet updated by HR.
                                    </span>
                                </>
                            )}
                        </p>
                        <span className="text-xs text-muted-foreground">
                            Last synced:{' '}
                            {new Date(
                                userBalance?.updated_at,
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Undertime */}
                    <Card className="col-span-4 dark:bg-zinc-900" key={index}>
                        <CardContent className="flex items-center gap-4 py-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-xs">Undertime</p>
                                <p className="text-2xl font-semibold">
                                    {userBalance?.undertime} hrs
                                </p>
                                <p className="text-xs">
                                    hours logged this period
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* mx-auto w-full max-w-sm dark:bg-zinc-900 */}
                    {/* VL Remaining */}
                    <Card className="mx-auto w-full max-w-sm dark:bg-zinc-900">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-widest uppercase">
                                VL Remaining
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            <p className="text-4xl font-bold">
                                {userBalance?.vl_balance}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm">
                                of {(userBalance?.vl_balance / 1.25).toFixed(3)}{' '}
                                days
                            </p>
                        </CardFooter>
                    </Card>

                    {/* SL Remaining */}
                    <Card className="mx-auto w-full max-w-sm dark:bg-zinc-900">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-widest uppercase">
                                SL Remaining
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            <p className="text-4xl font-bold">
                                {userBalance?.sl_balance}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm">
                                of {(userBalance?.sl_balance / 1.25).toFixed(3)}{' '}
                                days
                            </p>
                        </CardFooter>
                    </Card>

                    {/* VL Used */}
                    <Card className="mx-auto w-full max-w-sm dark:bg-zinc-900">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-widest uppercase">
                                VL Used
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            <p className="text-4xl font-bold">
                                {Math.floor(userBalance?.vl_used ?? 0)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm">days taken</p>
                        </CardFooter>
                    </Card>

                    {/* SL Used */}
                    <Card className="mx-auto w-full max-w-sm dark:bg-zinc-900">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium tracking-widest uppercase">
                                SL Used
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            <p className="text-4xl font-bold">
                                {Math.floor(userBalance?.sl_used ?? 0)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm">days taken</p>
                        </CardFooter>
                    </Card>

                    {/* Vacation Leave */}
                    <Card className="col-span-2 mx-auto w-full dark:bg-zinc-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-base font-semibold">
                                Vacation Leave
                            </CardTitle>
                            <Badge
                                variant="secondary"
                                className="rounded-md bg-blue-200 px-2 py-1 text-xs font-bold text-blue-700"
                            >
                                VL
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Balance</span>
                                <span className="text-sm font-semibold">
                                    {userBalance?.vl_balance.toFixed(3)} days
                                </span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Used</span>
                                <span className="text-sm font-semibold">
                                    {userBalance?.vl_used} days
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs">Usage rate</span>
                                <span className="text-xs">
                                    {userBalance?.vl_balance
                                        ? Math.floor(
                                              ((userBalance?.vl_used ?? 0) /
                                                  userBalance?.vl_balance) *
                                                  100,
                                          )
                                        : '0'}
                                    % used
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sick Leave */}
                    <Card className="col-span-2 mx-auto w-full dark:bg-zinc-900">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-base font-semibold">
                                Sick Leave
                            </CardTitle>
                            <Badge
                                variant="secondary"
                                className="rounded-md bg-blue-200 px-2 py-1 text-xs font-bold text-blue-700"
                            >
                                SL
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Balance</span>
                                <span className="text-sm font-semibold">
                                    {userBalance?.sl_balance} days
                                </span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Used</span>
                                <span className="text-sm font-semibold">
                                    {userBalance?.sl_used?.toFixed(3)} days
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs">Usage rate</span>
                                <span className="text-xs">
                                    {userBalance?.sl_balance
                                        ? Math.floor(
                                              ((userBalance?.sl_used ?? 0) /
                                                  userBalance?.sl_balance) *
                                                  100,
                                          )
                                        : '0'}
                                    % used
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
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
