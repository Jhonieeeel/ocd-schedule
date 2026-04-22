import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Balance } from '../leave/leave_data/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, CheckCircle, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Field } from '@/components/ui/field';
import { update } from '@/routes/balance';

export default function UserBalance({ userBalance }: { userBalance: Balance }) {
    const { submit, setData, errors, processing, data } = useForm({
        id: userBalance?.id,
        user_id: userBalance?.user_id,
        undertime: userBalance.undertime ?? (0.0 as number),
    });

    function handleUpdate(e) {
        e.preventDefault();
        submit(update(data.id));
    }

    console.log(userBalance.undertime);

    return (
        <div
            className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
            key={userBalance.id}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-semibold">
                        {userBalance.user.name} Balance
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Leave balances for the current period
                    </p>
                </div>

                {/* Status Badge */}
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <CheckCircle className="h-3 w-3" />
                    Updated
                </span>
            </div>
            <form
                onSubmit={handleUpdate}
                method="put"
                className="grid auto-rows-min gap-4 md:grid-cols-4"
            >
                {/* Undertime */}
                <Card className="col-span-4 dark:bg-zinc-900">
                    <CardContent className="flex items-center gap-4 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                            <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        {/* naka input ni */}
                        <Field className="w-full">
                            <p className="text-xs">Undertime</p>
                            <Input
                                type="number"
                                step={0.001}
                                min={0}
                                defaultValue={data.undertime}
                                onChange={(e) =>
                                    setData('undertime', Number(e.target.value))
                                }
                            />
                            <p className="text-xs">hours logged this period</p>
                        </Field>
                    </CardContent>
                </Card>

                {/* VL Balance */}
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
                                {userBalance.vl_balance} days
                            </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Used</span>
                            <span className="text-sm font-semibold">
                                {userBalance.vl_used} days
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Usage rate</span>
                            <span className="text-xs">
                                {/* {data?.vl_balance
                                    ? Math.floor(
                                          ((data?.vl_used ?? 0) /
                                              data.vl_balance) *
                                              100,
                                      )
                                    : '0'} */}
                                % used
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* SL Balance */}
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
                                {userBalance.sl_balance} days
                            </span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Used</span>
                            <span className="text-sm font-semibold">
                                {userBalance.sl_used} days
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs">Usage rate</span>
                            <span className="text-xs">
                                {/* {data?.sl_balance
                                    ? Math.floor(
                                          ((data?.sl_used ?? 0) /
                                              data.sl_balance) *
                                              100,
                                      )
                                    : '0'} */}
                                % used
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* action */}
                <div className="col-span-4 flex items-center justify-end">
                    <Button
                        type="submit"
                        variant="destructive"
                        className="cursor"
                    >
                        Update
                    </Button>
                </div>
            </form>
            {/* <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div> */}
        </div>
    );
}

UserBalance.layout = {
    breadcrumbs: [
        {
            title: 'User Balance',
        },
    ],
};
