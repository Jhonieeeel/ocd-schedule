import { usePage } from '@inertiajs/react';
import {
    createViewDay,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import 'temporal-polyfill/global';

import AddEventModal from './add-event-modal';
import { ViewEventModal } from './custom-modal';
import { CALENDARS, LeaveEvent } from './leave_data/data';
import EditEventModal from './edit-event-modal';
import { useAppearance } from '@/hooks/use-appearance';

type Props = {
    leaves: LeaveEvent[];
};

type CalendarId = keyof typeof CALENDARS;

function CalendarLeave() {
    const { leaves, auth } = usePage<Props>().props;

    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [viewEvent, setViewEvent] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [event, setEvent] = useState<LeaveEvent | undefined>(undefined);

    const eventsService = useState(() => createEventsServicePlugin())[0];

    // dark mode
    const { appearance } = useAppearance();

    const mappedEvents = (leaves ?? []).map((leave) => {
        const calendar = CALENDARS[leave.calendarId as CalendarId];

        return {
            id: leave.id,
            calendarId: leave.calendarId,
            title: `${leave.title} - ${leave.user}`,
            card_title: leave.title,
            leave: leave.title,
            user: leave.user,
            user_id: leave.user_id,
            description: leave.description,
            is_approve: leave.is_approve,
            start: Temporal.PlainDate.from(leave.start),
            end: Temporal.PlainDate.from(leave.end),

            theme: calendar ?? null,
        };
    });

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
        calendars: CALENDARS,
        defaultView: viewMonthGrid.name,
        events: mappedEvents,
        plugins: [eventsService],
        timezone: 'Asia/Taipei',
        isDark: appearance === 'dark',
        monthGridOptions: {
            nEventsPerDay: 20,
        },
        callbacks: {
            onClickDate(date) {
                const today = Temporal.PlainDate.from(
                    new Intl.DateTimeFormat('en-CA').format(new Date()),
                );
                const clicked = Temporal.PlainDate.from(date);

                if (Temporal.PlainDate.compare(clicked, today) < 0) return;

                // if (auth.role !== 'employee') setOpenAddEvent(true);
                setOpenAddEvent(true);
            },

            onEventClick(event) {
                setEvent(event as unknown as LeaveEvent);
                setViewEvent(true);
            },
        },
    });

    useEffect(() => {
        eventsService.set(mappedEvents);
    }, [leaves]);

    return (
        <div className="w-full">
            <ScheduleXCalendar calendarApp={calendar} />

            <AddEventModal
                openAddEvent={openAddEvent}
                setOpenAddEvent={setOpenAddEvent}
            />

            {event && (
                <ViewEventModal
                    key={event.id}
                    open={viewEvent}
                    onOpenChange={setViewEvent}
                    event={event}
                    onEdit={() => {
                        setViewEvent(false);
                        setEditEvent(true);
                    }}
                />
            )}

            {event && (
                <EditEventModal
                    key={event.id}
                    event={event}
                    open={editEvent}
                    onOpenChange={setEditEvent}
                />
            )}
        </div>
    );
}

export default CalendarLeave;
