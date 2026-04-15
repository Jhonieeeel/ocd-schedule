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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { CalendarIcon, Clock, User, FileText } from 'lucide-react';
import { useState } from 'react';

type CustomCalendarEvent = {
    calendarId: number;
    id: string;
    title: string;
    start: string;
    end: string;
    leave_type: string;
    user?: string;
    description?: string;
};

export const customComponents = {
    eventModal: ({ calendarEvent }: { calendarEvent: CustomCalendarEvent }) => {
        const leaveColors: Record<
            string,
            { bg: string; text: string; border: string; accent: string }
        > = {
            'Sick Leave': {
                bg: 'bg-red-100',
                text: 'text-red-700',
                border: 'border-red-200',
                accent: 'bg-red-500',
            },
            'Vacation Leave': {
                bg: 'bg-blue-100',
                text: 'text-blue-700',
                border: 'border-blue-200',
                accent: 'bg-blue-500',
            },

            // --- LEAVE TYPES ---
            'Mandatory/Force Leave': {
                bg: 'bg-orange-100',
                text: 'text-orange-700',
                border: 'border-orange-200',
                accent: 'bg-orange-500',
            },
            'Wellness Leave': {
                bg: 'bg-emerald-100',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                accent: 'bg-emerald-500',
            },
            'Maternity Leave': {
                bg: 'bg-pink-100',
                text: 'text-pink-700',
                border: 'border-pink-200',
                accent: 'bg-pink-500',
            },
            'Paternity Leave': {
                bg: 'bg-indigo-100',
                text: 'text-indigo-700',
                border: 'border-indigo-200',
                accent: 'bg-indigo-500',
            },
            'Special Privilege Leave': {
                bg: 'bg-purple-100',
                text: 'text-purple-700',
                border: 'border-purple-200',
                accent: 'bg-purple-500',
            },
            'Solo Parent Leave': {
                bg: 'bg-amber-100',
                text: 'text-amber-700',
                border: 'border-amber-200',
                accent: 'bg-amber-500',
            },
            'Study Leave': {
                bg: 'bg-sky-100',
                text: 'text-sky-700',
                border: 'border-sky-200',
                accent: 'bg-sky-500',
            },
            '10 Day VAWC Leave': {
                bg: 'bg-red-50',
                text: 'text-red-800',
                border: 'border-red-300',
                accent: 'bg-red-600',
            },
            'Rehabilitation Privilege': {
                bg: 'bg-teal-100',
                text: 'text-teal-700',
                border: 'border-teal-200',
                accent: 'bg-teal-500',
            },
            'Special Leave Benefits for Women': {
                bg: 'bg-rose-50',
                text: 'text-rose-700',
                border: 'border-rose-200',
                accent: 'bg-rose-600',
            },
            'Special Emergency Calamity Leave': {
                bg: 'bg-amber-100',
                text: 'text-amber-800',
                border: 'border-amber-300',
                accent: 'bg-amber-700',
            },
            'Adoption Leave': {
                bg: 'bg-lime-100',
                text: 'text-lime-700',
                border: 'border-lime-200',
                accent: 'bg-lime-500',
            },

            // --- STATUSES ---
            CTO: {
                bg: 'bg-green-100',
                text: 'text-green-700',
                border: 'border-green-200',
                accent: 'bg-green-500',
            },
            'Auto Offset': {
                bg: 'bg-blue-100',
                text: 'text-blue-700',
                border: 'border-blue-200',
                accent: 'bg-blue-500',
            },
            'On Leave (not filled)': {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                border: 'border-yellow-200',
                accent: 'bg-yellow-500',
            },
            'Auto Offset (not filled)': {
                bg: 'bg-zinc-100',
                text: 'text-zinc-600',
                border: 'border-zinc-200',
                accent: 'bg-zinc-400',
            },
        };

        const colors = leaveColors[calendarEvent.leave_type] ?? {
            bg: 'bg-zinc-100',
            text: 'text-zinc-600',
            border: 'border-zinc-200',
            accent: 'bg-violet-500',
        };

        const form = useForm();

        // custom component visible
        const [visible, setVisible] = useState(true);

        function deleteLeave() {
            setVisible(false);
        }

        return (
            // <div className="w-[360px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            //     <div className={`h-1 ${colors.accent}`} />

            //     {/* header */}
            //     <div className="flex items-start justify-between gap-2.5 px-5 pt-4 pb-3.5">
            //         <div className="min-w-0 flex-1">
            //             <span
            //                 className={`mb-1.5 inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${colors.bg} ${colors.text} ${colors.border}`}
            //             >
            //                 {calendarEvent.leave_type}
            //             </span>
            //             <h2 className="truncate text-base font-medium text-zinc-900 dark:text-white">
            //                 {calendarEvent.title}
            //             </h2>
            //         </div>
            //         <div
            //             className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg}`}
            //         >
            //             <CalendarIcon className={`h-4 w-4 ${colors.text}`} />
            //         </div>
            //     </div>

            //     <div className="mx-5 border-t border-zinc-100 dark:border-zinc-800" />

            //     {/* details */}
            //     <div className="flex flex-col gap-2.5 px-5 py-3.5">
            //         {/* time */}
            //         <div className="flex items-center gap-2.5">
            //             <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            //                 <Clock className="h-3.5 w-3.5 text-zinc-500" />
            //             </div>
            //             <div>
            //                 <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
            //                     {calendarEvent.start.toString()}
            //                 </p>
            //                 <p className="text-[11px] text-zinc-400">All day</p>
            //             </div>
            //         </div>

            //         {/* user */}
            //         {calendarEvent.user && (
            //             <div className="flex items-center gap-2.5">
            //                 {/* avatar initials ✅ */}
            //                 <div
            //                     className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${colors.bg} ${colors.text}`}
            //                 >
            //                     {calendarEvent.user
            //                         .split(' ')
            //                         .map((n: string) => n[0])
            //                         .join('')}
            //                 </div>
            //                 <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
            //                     {calendarEvent.user}
            //                 </p>
            //             </div>
            //         )}

            //         {/* description */}
            //         {calendarEvent.description && (
            //             <div className="flex items-start gap-2.5">
            //                 <div className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            //                     <FileText className="h-3.5 w-3.5 text-zinc-500" />
            //                 </div>
            //                 <p className="pt-1.5 text-xs leading-relaxed text-zinc-500">
            //                     {calendarEvent.description}
            //                 </p>
            //             </div>
            //         )}
            //     </div>

            //     {/* actions */}
            //     <div className="flex gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
            //         <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-[13px] text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">
            //             Edit
            //         </button>
            //         <AlertDialog>
            //             <AlertDialogTrigger asChild>
            //                 <button
            //                     onClick={deleteLeave}
            //                     className="flex-1 rounded-lg border border-red-200 bg-red-50 py-1.5 text-[13px] text-red-700 hover:bg-red-100"
            //                 >
            //                     Delete
            //                 </button>
            //             </AlertDialogTrigger>
            //             <AlertDialogContent>
            //                 <AlertDialogHeader>
            //                     <AlertDialogTitle>
            //                         Delete Leave Request?
            //                     </AlertDialogTitle>
            //                     <AlertDialogDescription>
            //                         This will permanently delete{' '}
            //                         <strong>{calendarEvent.title}</strong>. This
            //                         action cannot be undone.
            //                     </AlertDialogDescription>
            //                 </AlertDialogHeader>
            //                 <AlertDialogFooter>
            //                     <AlertDialogCancel>Cancel</AlertDialogCancel>
            //                     <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700">
            //                         Yes, Delete
            //                     </AlertDialogAction>
            //                 </AlertDialogFooter>
            //             </AlertDialogContent>
            //         </AlertDialog>
            //     </div>
            // </div>

            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    },
};
