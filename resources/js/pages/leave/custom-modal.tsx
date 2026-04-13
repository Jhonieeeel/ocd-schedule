import { CalendarIcon, Clock, User, FileText } from 'lucide-react';

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
        };

        const colors = leaveColors[calendarEvent.leave_type] ?? {
            bg: 'bg-zinc-100',
            text: 'text-zinc-600',
            border: 'border-zinc-200',
            accent: 'bg-violet-500',
        };

        return (
            <div className="w-[360px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                {/* accent bar ✅ */}
                <div className={`h-1 ${colors.accent}`} />

                {/* header */}
                <div className="flex items-start justify-between gap-2.5 px-5 pt-4 pb-3.5">
                    <div className="min-w-0 flex-1">
                        {/* badge ✅ */}
                        <span
                            className={`mb-1.5 inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                            {calendarEvent.leave_type}
                        </span>
                        <h2 className="truncate text-base font-medium text-zinc-900 dark:text-white">
                            {calendarEvent.title}
                        </h2>
                    </div>
                    {/* icon box ✅ */}
                    <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.bg}`}
                    >
                        <CalendarIcon className={`h-4 w-4 ${colors.text}`} />
                    </div>
                </div>

                <div className="mx-5 border-t border-zinc-100 dark:border-zinc-800" />

                {/* details */}
                <div className="flex flex-col gap-2.5 px-5 py-3.5">
                    {/* time */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <Clock className="h-3.5 w-3.5 text-zinc-500" />
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
                                {calendarEvent.start.toString()}
                            </p>
                            <p className="text-[11px] text-zinc-400">All day</p>
                        </div>
                    </div>

                    {/* user */}
                    {calendarEvent.user && (
                        <div className="flex items-center gap-2.5">
                            {/* avatar initials ✅ */}
                            <div
                                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${colors.bg} ${colors.text}`}
                            >
                                {calendarEvent.user
                                    .split(' ')
                                    .map((n: string) => n[0])
                                    .join('')}
                            </div>
                            <p className="text-[13px] font-medium text-zinc-900 dark:text-white">
                                {calendarEvent.user}
                            </p>
                        </div>
                    )}

                    {/* description */}
                    {calendarEvent.description && (
                        <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                <FileText className="h-3.5 w-3.5 text-zinc-500" />
                            </div>
                            <p className="pt-1.5 text-xs leading-relaxed text-zinc-500">
                                {calendarEvent.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* actions */}
                <div className="flex gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
                    <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-[13px] text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">
                        Edit
                    </button>
                    <button className="flex-1 rounded-lg border border-red-200 bg-red-50 py-1.5 text-[13px] text-red-700 hover:bg-red-100">
                        Delete
                    </button>
                </div>
            </div>
        );
    },
};
