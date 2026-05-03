import { useForm, usePage } from '@inertiajs/react';
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

import { useAppearance } from '@/hooks/use-appearance';
import AddEventModal from './add-event-modal';
import { ViewEventModal } from './custom-modal';
import EditEventModal from './edit-event-modal';
import { CALENDARS, LeaveEvent } from './leave_data/data';

type Props = {
    leaves: LeaveEvent[];
};

type CalendarId = keyof typeof CALENDARS;

function CalendarLeave() {
    const { leaves } = usePage<Props>().props;

    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [viewEvent, setViewEvent] = useState(false);
    const [editEvent, setEditEvent] = useState(false);

    const eventsService = useState(() => createEventsServicePlugin())[0];

    // form
    const form = useForm<LeaveEvent>({
        id: undefined as number | undefined,
        user_id: '',
        leave_type: '',
        start: '',
        end: '',
        description: '',
        is_approve: false as boolean,
    });

    const addForm = useForm<LeaveEvent>({
        id: undefined as number | undefined,
        user_id: '',
        leave_type: '',
        start: '',
        end: '',
        description: '',
        is_approve: false as boolean,
    });

    // dark mode
    const { appearance } = useAppearance();

    const mappedEvents = (leaves ?? []).map((leave) => {
        const calendar = CALENDARS[leave.calendarId as CalendarId];

        return {
            id: leave.id,
            calendarId: leave.calendarId,
            title: `${leave.title} - ${leave.user}`,
            card_title: leave.title,
            leave_type: leave.title,
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
            nEventsPerDay: 50,
        },
        callbacks: {
            onClickDate(date) {
                addForm.setData('start', date.toString());
                setOpenAddEvent(true);
            },

            onEventClick(clickedEvent) {
                form.setData(clickedEvent as unknown as LeaveEvent);
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
            {addForm.data.start && (
                <AddEventModal
                    key={addForm.data.start}
                    form={addForm}
                    openAddEvent={openAddEvent}
                    setOpenAddEvent={setOpenAddEvent}
                />
            )}
            {form.data && (
                <ViewEventModal
                    key={form.data.id}
                    form={form}
                    open={viewEvent}
                    onOpenChange={setViewEvent}
                    event={form.data}
                    onEdit={() => {
                        setViewEvent(false);
                        setEditEvent(true);
                    }}
                />
            )}
            {form.data && (
                <EditEventModal
                    key={form.data.calendarId}
                    form={form}
                    event={form.data}
                    open={editEvent}
                    onOpenChange={setEditEvent}
                />
            )}
        </div>
    );
}

export default CalendarLeave;
