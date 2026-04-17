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
import { CALENDARS } from './leave_data/data';

type LeaveEvent = {
    id: string;
    calendarId: string;
    title: string;
    leave_type: string;
    user: string;
    description: string;
    start: string;
    end: string;
};

type Props = {
    leaves: LeaveEvent[];
};

function CalendarLeave() {
    const { leaves } = usePage<Props>().props;

    const mappedEvents = (leaves ?? []).map((leave) => {
        const calendar = CALENDARS[leave.calendarId];

        return {
            id: leave.id,
            calendarId: leave.calendarId,
            title: leave.title,
            user: leave.user,
            description: leave.description,
            start: Temporal.PlainDate.from(leave.start),
            end: Temporal.PlainDate.from(leave.end),

            theme: calendar ?? null,
        };
    });
    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [viewEvent, setViewEvent] = useState(false);
    const [event, setEvent] = useState<any>(null);

    const eventsService = useState(() => createEventsServicePlugin())[0];

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid()],

        calendars: CALENDARS,

        defaultView: viewMonthGrid.name,
        events: mappedEvents,

        plugins: [eventsService],

        callbacks: {
            onClickDate(date) {
                const today = Temporal.PlainDate.from(
                    new Date().toISOString().split('T')[0],
                );
                const clicked = Temporal.PlainDate.from(date);

                if (Temporal.PlainDate.compare(clicked, today) < 0) return;

                setOpenAddEvent(true);
            },

            onEventClick(event) {
                setEvent(event);
                setViewEvent(true);
            },
        },
    });

    useEffect(() => {
        eventsService.set(mappedEvents);
    }, [leaves]);

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />

            <AddEventModal
                openAddEvent={openAddEvent}
                setOpenAddEvent={setOpenAddEvent}
            />

            <ViewEventModal
                open={viewEvent}
                onOpenChange={setViewEvent}
                event={event}
            />
        </div>
    );
}

export default CalendarLeave;
