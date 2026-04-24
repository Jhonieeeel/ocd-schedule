import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { update } from '@/routes/balance';
import { useForm, usePage } from '@inertiajs/react';
import { Badge, CheckCircle, CheckCircle2Icon, Clock, X } from 'lucide-react';
import { Balance } from '../leave/leave_data/data';
import { Spinner } from '@/components/ui/spinner';

type PageProps = {
    flash: {
        message: string;
    };
    userBalance: Balance;
};

export default function UserBalance({ userBalance }: { userBalance: Balance }) {
    const { submit, setData, errors, processing, data } = useForm({
        id: userBalance?.id,
        user_id: userBalance?.user_id,
        undertime: userBalance.undertime ?? (0.0 as number),
    });

    const { flash } = usePage<PageProps>().props;

    function handleUpdate(e) {
        e.preventDefault();
        submit(update(data.id));
    }

    return (
        <>
            <div className="m-4">
                {flash.message && (
                    <Alert className="relative max-w-md border border-green-300 bg-green-200 dark:border-[#1D9E75] dark:bg-[#085041]">
                        <CheckCircle2Icon className="h-[18px] w-[18px] text-green-700 dark:text-emerald-400" />

                        <AlertTitle className="font-medium text-green-900 dark:text-emerald-200">
                            Balance updated successfully
                        </AlertTitle>

                        <AlertDescription className="text-sm leading-relaxed text-green-700 dark:text-emerald-400">
                            Your account balance has been updated and is now
                            current.
                        </AlertDescription>

                        <button className="absolute top-3 right-3 text-green-600 transition-opacity hover:opacity-100 dark:text-emerald-500/60">
                            <X size={14} />
                        </button>
                    </Alert>
                )}
            </div>
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
                    <Card className="col-span-4 dark:border-zinc-700 dark:bg-zinc-900">
                        <CardContent className="flex items-center gap-4 py-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <Field className="w-full">
                                <p className="text-xs">Undertime/Tardiness</p>
                                <Input
                                    type="number"
                                    step={0.001}
                                    min={0}
                                    defaultValue={data.undertime}
                                    onChange={(e) =>
                                        setData(
                                            'undertime',
                                            Number(e.target.value),
                                        )
                                    }
                                />
                                <p className="text-xs">
                                    hours logged this period
                                </p>
                            </Field>
                        </CardContent>
                    </Card>

                    {/* VL Balance */}
                    <Card className="col-span-2 mx-auto w-full dark:border-zinc-700 dark:bg-zinc-900">
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
                    <Card className="col-span-2 mx-auto w-full dark:border-zinc-700 dark:bg-zinc-900">
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
                            {processing && <Spinner />}
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

UserBalance.layout = {
    breadcrumbs: [
        {
            title: 'User Balance',
        },
    ],
};
