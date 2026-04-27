import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/attendance_logs';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { AttendanceLog, Balance } from '../leave/leave_data/data';

export default function UserAttendace({
    userBalance,
    attendanceForm,
}: {
    userBalance: Balance;
    attendanceForm: ReturnType<typeof useForm<AttendanceLog>>;
}) {
    function handleSubmit() {
        attendanceForm.submit(store());
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-yellow-600 text-white hover:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-900">
                    {attendanceForm.processing && <Spinner />}
                    Log Attendance
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Log Attendance</DialogTitle>
                    <DialogDescription>
                        Record undertime or tardiness entry.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5 py-2">
                        {/* Date */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs tracking-widest text-muted-foreground uppercase">
                                Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start border border-border bg-muted/30 px-3 py-2 text-sm font-normal hover:bg-muted/50"
                                    >
                                        <span className="mr-3 border-r border-border pr-3 text-xs font-bold text-muted-foreground">
                                            DATE
                                        </span>
                                        {attendanceForm.data.date ? (
                                            format(
                                                new Date(
                                                    attendanceForm.data.date,
                                                ),
                                                'PPP',
                                            )
                                        ) : (
                                            <span className="text-muted-foreground">
                                                Pick a date
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            attendanceForm.data.date
                                                ? new Date(
                                                      attendanceForm.data.date,
                                                  )
                                                : undefined
                                        }
                                        onSelect={(date) =>
                                            attendanceForm.setData(
                                                'date',
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : '',
                                            )
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Hours + Minutes */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs tracking-widest text-muted-foreground uppercase">
                                    Hours
                                </Label>
                                <div className="flex items-center overflow-hidden rounded-lg border border-border bg-muted/30">
                                    <span className="border-r border-border bg-muted/50 px-3 py-2 text-xs font-bold text-muted-foreground">
                                        HRS
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={attendanceForm.data.hours}
                                        onChange={(e) =>
                                            attendanceForm.setData(
                                                'hours',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-xs tracking-widest text-muted-foreground uppercase">
                                    Minutes
                                </Label>
                                <div className="flex items-center overflow-hidden rounded-lg border border-border bg-muted/30">
                                    <span className="border-r border-border bg-muted/50 px-3 py-2 text-xs font-bold text-muted-foreground">
                                        MIN
                                    </span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={attendanceForm.data.minutes}
                                        onChange={(e) =>
                                            attendanceForm.setData(
                                                'minutes',
                                                Number(e.target.value),
                                            )
                                        }
                                        className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Type toggle */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="tracking-widests text-xs text-muted-foreground uppercase">
                                Type
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        attendanceForm.setData(
                                            'is_tardy',
                                            false,
                                        )
                                    }
                                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                                        !attendanceForm.data.is_tardy
                                            ? 'border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                            : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted'
                                    }`}
                                >
                                    <span
                                        className={`flex items-center rounded-lg border px-2 py-0.5 text-xs font-bold ${
                                            !attendanceForm.data.is_tardy
                                                ? 'border-blue-500/50 bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                                : 'border-border bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        UT
                                    </span>
                                    Undertime
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        attendanceForm.setData('is_tardy', true)
                                    }
                                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                                        attendanceForm.data.is_tardy
                                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted'
                                    }`}
                                >
                                    <span
                                        className={`flex items-center rounded-lg border px-2 py-0.5 text-xs font-bold ${
                                            attendanceForm.data.is_tardy
                                                ? 'border-amber-500/50 bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                                : 'border-border bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        T
                                    </span>
                                    Tardy
                                </button>
                            </div>
                            <p
                                className={`mt-0.5 text-xs ${
                                    attendanceForm.data.is_tardy
                                        ? 'text-amber-600 dark:text-amber-400'
                                        : 'text-blue-600 dark:text-blue-400'
                                }`}
                            >
                                Considered as{' '}
                                {attendanceForm.data.is_tardy
                                    ? 'Tardiness'
                                    : 'Undertime'}
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={attendanceForm.processing}
                            className="bg-yellow-600 text-white hover:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-900"
                        >
                            {attendanceForm.processing && <Spinner />}
                            Save Log
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
