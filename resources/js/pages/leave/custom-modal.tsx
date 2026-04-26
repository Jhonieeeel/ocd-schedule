import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { destroy, update } from '@/routes/leave';
import { Form, useForm, usePage } from '@inertiajs/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
    CalendarDays,
    CheckCircle2,
    Clock,
    FileText,
    Pencil,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { CALENDARS, LeaveEvent } from './leave_data/data';

type CalendarId = keyof typeof CALENDARS;

export const ViewEventModal = ({
    open,
    onOpenChange,
    onEdit,
    event,
    form,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: LeaveEvent;
    onEdit: (open: boolean) => void;
    form: ReturnType<typeof useForm<Partial<LeaveEvent>>>;
}) => {
    const [internalOpen, setInternalOpen] = useState(true);

    // check role
    const { auth } = usePage().props;

    if (!event) return null;

    function handleApprove() {
        const next = !form.data.is_approve;
        form.setData('is_approve', next);
        setTimeout(() => {
            form.submit(update(Number(event.id)), {
                onSuccess: () => {
                    form.setData({
                        user_id: undefined,
                    });
                },
            });
            onOpenChange(!open);
        }, 500);
    }

    const calendar = CALENDARS[event.calendarId as CalendarId];

    const colors = calendar?.lightColors ?? {
        main: '#71717a',
        container: '#f4f4f5',
        onContainer: '#3f3f46',
    };

    return (
        <Dialog
            modal={false}
            open={open ?? internalOpen}
            onOpenChange={onOpenChange}
        >
            <DialogTitle>View Event</DialogTitle>
            <DialogContent
                aria-describedby={undefined}
                className="max-w-md overflow-hidden border-zinc-600 bg-transparent p-0 shadow-none"
            >
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                    {/* ACCENT LINE */}
                    <div
                        className="h-1.5 w-full"
                        style={{ backgroundColor: colors.main }}
                    />

                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-3 px-5 pt-10 pb-4">
                        <div className="min-w-0 flex-1">
                            {/* CALENDAR TYPE BADGE */}
                            <span
                                className="mb-2 inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                                style={{
                                    backgroundColor: colors.container,
                                    color: colors.onContainer,
                                    borderColor: colors.main + '33',
                                }}
                            >
                                {event.calendarId}
                            </span>

                            {/* TITLE + STATUS BADGE */}
                            <div className="flex min-w-0 items-center gap-2">
                                <h2 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                    {event.card_title}
                                </h2>

                                {form.data.is_approve ? (
                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                                        Approved
                                    </span>
                                ) : (
                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-[11px] font-medium text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                                        Pending
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* ICON BADGE */}
                        <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: colors.container }}
                        >
                            <CalendarDays
                                className="h-4 w-4"
                                style={{ color: colors.main }}
                            />
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="mx-5 border-t border-zinc-200 dark:border-zinc-800" />

                    {/* DETAILS */}
                    <div className="flex flex-col gap-3 px-5 py-4">
                        {/* DATE */}
                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                style={{ backgroundColor: colors.container }}
                            >
                                <CalendarDays
                                    className="h-3.5 w-3.5"
                                    style={{ color: colors.main }}
                                />
                            </div>
                            <div className="pt-0.5">
                                <p className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                                    Date
                                </p>
                                <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                                    {new Date(
                                        event.start?.toString(),
                                    ).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                    Until{' '}
                                    {new Date(
                                        event.end?.toString(),
                                    ).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* USER */}
                        {event.user && (
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                                    style={{
                                        backgroundColor: colors.container,
                                        color: colors.main,
                                    }}
                                >
                                    {event.user
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                                        Employee
                                    </p>
                                    <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                                        {event.user}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* DESCRIPTION */}
                        {event.description && (
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                                    style={{
                                        backgroundColor: colors.container,
                                    }}
                                >
                                    <FileText
                                        className="h-3.5 w-3.5"
                                        style={{ color: colors.main }}
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                                        Reason
                                    </p>
                                    <p className="pt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* APPROVAL TOGGLE — admin only */}
                    {auth.role === 'hr' && (
                        <div className="flex items-center justify-between border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                {event.is_approve ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
                                ) : (
                                    <Clock className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                                )}
                                <Label
                                    htmlFor="approve-toggle"
                                    className="cursor-pointer text-[13px] font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    {event.is_approve
                                        ? 'Approved'
                                        : 'Pending approval'}
                                </Label>
                            </div>
                            <Switch
                                disabled={form.processing}
                                id="is_approve"
                                checked={form.data.is_approve}
                                onCheckedChange={handleApprove}
                                className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600"
                            />
                        </div>
                    )}

                    {/* ACTIONS — non-employees */}
                    {auth.role !== 'employee' && (
                        <div className="flex gap-2 border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
                            <button
                                onClick={() => onEdit(true)}
                                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2 text-[13px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                            </button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-600 py-2 text-[13px] font-medium text-white transition hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-2xl border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-zinc-900 dark:text-zinc-50">
                                            Delete leave request?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                                            This will permanently delete{' '}
                                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                                {event.card_title}
                                            </span>
                                            . This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="rounded-xl border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                            Cancel
                                        </AlertDialogCancel>
                                        <Form
                                            {...destroy.form(Number(event.id))}
                                            onSuccess={() => {
                                                onOpenChange(!open);
                                                form.reset();
                                            }}
                                        >
                                            {({ processing }) => (
                                                <AlertDialogAction
                                                    type="submit"
                                                    disabled={processing}
                                                    className="rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 dark:bg-red-700 dark:hover:bg-red-600"
                                                >
                                                    {processing ? (
                                                        <span className="flex items-center gap-2">
                                                            <Spinner />
                                                            Deleting
                                                        </span>
                                                    ) : (
                                                        'Yes, delete'
                                                    )}
                                                </AlertDialogAction>
                                            )}
                                        </Form>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
