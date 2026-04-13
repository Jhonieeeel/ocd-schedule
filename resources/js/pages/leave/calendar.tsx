import {
    createViewDay,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
import { CalendarIcon, Clock, FileText, User, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import 'temporal-polyfill/global';
import { customComponents } from './custom-modal';
import AddEventModal from './add-event-modal';

// custom

function CalendarLeave() {
    const [openAddEvent, setOpenAddEvent] = useState(false);

    const eventsService = useState(() => createEventsServicePlugin())[0];

    const calendar = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            // createViewMonthAgenda(),
        ],
        calendars: {
            sick_leave: {
                colorName: 'sick_leave',
                lightColors: {
                    main: '#ef4444', // red — illness/urgent
                    container: '#fee2e2',
                    onContainer: '#991b1b',
                },
                darkColors: {
                    main: '#f87171',
                    container: '#7f1d1d',
                    onContainer: '#fecaca',
                },
            },
            vacation_leave: {
                colorName: 'vacation_leave',
                lightColors: {
                    main: '#3b82f6', // blue — relaxed/travel
                    container: '#dbeafe',
                    onContainer: '#1e40af',
                },
                darkColors: {
                    main: '#60a5fa',
                    container: '#1e3a8a',
                    onContainer: '#bfdbfe',
                },
            },
        },
        defaultView: viewMonthGrid.name,
        events: [
            {
                id: '1',
                calendarId: 'sick_leave',
                title: 'SIck Leave',
                leave_type: 'Sick Leave',
                user: 'Jhoniel Villacura',
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum minima libero quaerat!',
                start: Temporal.PlainDate.from('2026-04-26'),
                end: Temporal.PlainDate.from('2026-04-26'),
            },
            {
                id: '2',
                calendarId: 'vacation_leave',
                title: 'Vacation Leave',
                leave_type: 'Vacation Leave',
                user: 'Jhoniel Villacura',
                description:
                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum minima libero quaerat!',
                start: Temporal.PlainDate.from('2026-04-14'),
                end: Temporal.PlainDate.from('2026-04-14'),
            },
        ],
        plugins: [eventsService, createEventModalPlugin()],
        callbacks: {
            // if its yesterday checker
            onClickDate(date) {
                const today = Temporal.PlainDate.from(
                    new Date().toISOString().split('T')[0],
                );
                const clicked = Temporal.PlainDate.from(date);

                if (Temporal.PlainDate.compare(clicked, today) < 0) {
                    return;
                }

                setOpenAddEvent(true);
            },
        },
    });

    useEffect(() => {
        // get all events
        eventsService.getAll();
    }, []);

    // custom modal

    return (
        <div>
            <ScheduleXCalendar
                calendarApp={calendar}
                customComponents={customComponents}
            />
            <AddEventModal
                openAddEvent={openAddEvent}
                setOpenAddEvent={setOpenAddEvent}
            />
        </div>
    );
}

export default CalendarLeave;
