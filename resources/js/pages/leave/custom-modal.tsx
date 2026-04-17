import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { CALENDARS } from './leave_data/data';
import { CalendarDays, FileText } from 'lucide-react';
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
import { useForm } from '@inertiajs/react';
import { destroy } from '@/routes/leave';

type CustomCalendarEvent = {
    calendarId: string;
    id: string;
    title: string;
    start: any;
    end: any;
    user?: string;
    description?: string;
};

export const ViewEventModal = ({
    open,
    onOpenChange,
    event,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: CustomCalendarEvent | null;
}) => {
    const [internalOpen] = useState(true);

    if (!event) return null;

    const calendar = CALENDARS[event.calendarId];

    const colors = calendar?.lightColors ?? {
        main: '#71717a',
        container: '#f4f4f5',
        onContainer: '#3f3f46',
    };

    const form = useForm({});

    const handleDelete = (event: any) => {
        form.submit(destroy(event.id));
    };

    return (
        <Dialog open={open ?? internalOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md overflow-hidden p-0">
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                    {/* ACCENT LINE */}
                    <div
                        className="h-1"
                        style={{ backgroundColor: colors.main }}
                    />

                    {/* HEADER */}
                    <div className="flex items-start justify-between gap-2.5 px-7 pt-6 pb-3.5">
                        <div className="min-w-0">
                            <span
                                className="mb-1.5 inline-block rounded border px-2 py-0.5 text-[11px] font-medium"
                                style={{
                                    backgroundColor: colors.container,
                                    color: colors.onContainer,
                                    borderColor: colors.main + '33',
                                }}
                            >
                                {event.calendarId}
                            </span>

                            <h2 className="truncate text-base font-medium text-zinc-900 dark:text-white">
                                {event.title}
                            </h2>
                        </div>

                        {/* ICON BADGE */}
                        <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: colors.container }}
                        >
                            <CalendarDays
                                className="h-4 w-4"
                                style={{ color: colors.main }}
                            />
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="mx-5 border-t border-zinc-100 dark:border-zinc-800" />

                    {/* DETAILS */}
                    <div className="flex flex-col gap-4 px-5 py-4">
                        {/* DATE */}
                        <div className="flex items-start gap-3">
                            <div
                                className="flex h-[30px] w-[30px] items-center justify-center rounded-lg"
                                style={{ backgroundColor: colors.container }}
                            >
                                <CalendarDays
                                    className="h-3.5 w-3.5"
                                    style={{ color: colors.main }}
                                />
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
                                    {event.start?.toString()}
                                </p>
                                <p className="text-[11px] text-zinc-400">
                                    {event.end?.toString()}
                                </p>
                            </div>
                        </div>

                        {/* USER */}
                        {event.user && (
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[11px] font-medium"
                                    style={{
                                        backgroundColor: colors.main + '20',
                                        color: colors.main,
                                    }}
                                >
                                    {event.user
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </div>

                                <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
                                    {event.user}
                                </p>
                            </div>
                        )}

                        {/* DESCRIPTION */}
                        {event.description && (
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex h-[30px] w-[30px] items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor: colors.container,
                                    }}
                                >
                                    <FileText
                                        className="h-3.5 w-3.5"
                                        style={{ color: colors.main }}
                                    />
                                </div>

                                <p className="pt-1 text-xs leading-relaxed text-zinc-500">
                                    {event.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
                        <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-[13px] text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">
                            Edit
                        </button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="flex-1 rounded-lg border border-red-200 bg-red-50 py-1.5 text-[13px] text-red-700 hover:bg-red-100">
                                    Delete
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete Leave Request?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete This action
                                        cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDelete(event)}
                                        className="bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Yes, Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
