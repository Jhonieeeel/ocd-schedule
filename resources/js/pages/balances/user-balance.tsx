import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { carry, update } from '@/routes/balance';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, Clock, Plus, X } from 'lucide-react';
import {
    AttendanceLog,
    Balance,
    leaves,
    months,
} from '../leave/leave_data/data';
import UserAttendace from './user-attendance';

type PageProps = {
    flash: {
        message: string;
    };
    userBalance: Balance;
};

export default function UserBalance({ userBalance }: { userBalance: Balance }) {
    const { submit, setData, errors, processing, data, reset } =
        useForm<Balance>({
            id: userBalance?.id,
            user_id: userBalance?.user_id,
            undertime: userBalance.undertime ?? (0.0 as number),

            // balance
            vl_balance: userBalance.vl_balance,
            fl_balance: userBalance.fl_balance,
            sl_balance: userBalance.sl_balance,
            spl_balance: userBalance.spl_balance,

            // used
            vl_used: userBalance.vl_used,
            fl_used: userBalance.fl_used,
            sl_used: userBalance.sl_used,

            // date
            month: userBalance.month,
            year: userBalance.year,
        });

    const { flash } = usePage<PageProps>().props;

    function handleUpdate(e) {
        e.preventDefault();
        submit(update(Number(data.id)));
    }

    const form = useForm({
        id: userBalance.id as number,
        user_id: userBalance.user.id as number,
        month: userBalance.month as number,
        year: userBalance.year as number,
    });

    const attendanceForm = useForm<AttendanceLog>({
        user_id: userBalance.user.id,
        balance_id: userBalance.id!,
        date: new Date(),
        minutes: 0,
        hours: 0,
        is_tardy: false,
    });

    function carryOver() {
        form.submit(carry(), {
            onSuccess: () => {
                console.log(data);
            },
        });
    }

    const usageRate = (balance: number, used: number) => {
        const total = balance + used;
        return total > 0 ? ((used / total) * 100).toFixed(2) : '0.00';
    };

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
                {/* User Info */}
                <div className="flex items-center justify-between">
                    <div>
                        <h5 className="flex items-center gap-1 text-sm">
                            Month of
                            <div className="dark:text-yellow-300">
                                {
                                    months.find(
                                        (m) => m.id === userBalance.month,
                                    )?.month
                                }
                            </div>
                        </h5>
                        <h3 className="text-2xl font-semibold">
                            {userBalance.user?.name} Balance
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Leave balances for the current period
                        </p>
                    </div>

                    <UserAttendace
                        key={userBalance.id}
                        userBalance={userBalance}
                        attendanceForm={attendanceForm}
                    />
                </div>
                <form
                    onSubmit={handleUpdate}
                    method="put"
                    className="grid auto-rows-min md:grid-cols-4 md:gap-8"
                >
                    {/* Undertime */}
                    <Card className="col-span-4 shadow-md dark:border-zinc-700">
                        <CardContent className="flex items-center gap-4 pt-5">
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-yellow-100 dark:bg-yellow-900">
                                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                    Undertime / Tardiness
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        step={0.002}
                                        className="h-9 pr-14"
                                        value={data.undertime}
                                        onChange={(e) =>
                                            setData(
                                                'undertime',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                                        hours
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Hours logged this period
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {leaves.map(
                        ({
                            key,
                            label,
                            icon,
                            iconClass,
                            balanceKey,
                            usedKey,
                        }) => (
                            <Card
                                key={key}
                                className="col-span-2 border-2 dark:border-zinc-700"
                            >
                                <CardHeader className="flex flex-row items-center justify-between pt-4 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {label}
                                    </CardTitle>
                                    <div
                                        className={cn(
                                            'flex h-7 w-7 items-center justify-center rounded-md',
                                            iconClass,
                                        )}
                                    >
                                        {icon}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 pb-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                            Balance
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                className="h-9 pr-12"
                                                value={data[balanceKey]}
                                                onChange={(e) =>
                                                    setData(
                                                        balanceKey,
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                                                days
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                            Used
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                min={0}
                                                step={0.5}
                                                className="h-9 pr-12"
                                                value={data[usedKey]}
                                                onChange={(e) =>
                                                    setData(
                                                        usedKey,
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                                                days
                                            </span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">
                                            Usage rate
                                        </span>
                                        <span className="font-medium">
                                            {usageRate(
                                                data[balanceKey],
                                                data[usedKey],
                                            )}
                                            % used
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ),
                    )}

                    {/* action */}
                    <div className="col-span-4 flex items-center justify-between gap-2">
                        <Button
                            variant="outline"
                            className="gap-2"
                            disabled={form.processing}
                            onClick={carryOver}
                        >
                            {form.processing ? (
                                <Spinner />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                            Add to next month
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400"
                            >
                                {processing && <Spinner />}
                                Update
                            </Button>
                        </div>
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
