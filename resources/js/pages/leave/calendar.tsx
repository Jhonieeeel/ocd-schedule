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
import { usePage } from '@inertiajs/react';

// custom

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

    const mappedEvents = (leaves ?? []).map((leave) => ({
        id: leave.id,
        calendarId: leave.calendarId,
        title: leave.title,
        leave_type: leave.calendarId,
        user: leave.user,
        description: leave.description,
        start: Temporal.PlainDate.from(leave.start),
        end: Temporal.PlainDate.from(leave.end),
    }));

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
            // --- EXISTING ---
            'Sick Leave': {
                colorName: 'sick_leave',
                lightColors: {
                    main: '#ef4444',
                    container: '#fee2e2',
                    onContainer: '#991b1b',
                },
                darkColors: {
                    main: '#f87171',
                    container: '#7f1d1d',
                    onContainer: '#fecaca',
                },
            },
            'Vacation Leave': {
                colorName: 'vacation_leave',
                lightColors: {
                    main: '#3b82f6',
                    container: '#dbeafe',
                    onContainer: '#1e40af',
                },
                darkColors: {
                    main: '#60a5fa',
                    container: '#1e3a8a',
                    onContainer: '#bfdbfe',
                },
            },

            // --- LEAVE TYPES ---
            'Mandatory/Force Leave': {
                colorName: 'force_leave',
                lightColors: {
                    main: '#f97316',
                    container: '#ffedd5',
                    onContainer: '#9a3412',
                }, // orange — mandatory/forced
                darkColors: {
                    main: '#fb923c',
                    container: '#7c2d12',
                    onContainer: '#fed7aa',
                },
            },
            'Wellness Leave': {
                colorName: 'wellness_leave',
                lightColors: {
                    main: '#10b981',
                    container: '#d1fae5',
                    onContainer: '#065f46',
                }, // emerald — health/wellness
                darkColors: {
                    main: '#34d399',
                    container: '#064e3b',
                    onContainer: '#a7f3d0',
                },
            },
            'Maternity Leave': {
                colorName: 'maternity_leave',
                lightColors: {
                    main: '#ec4899',
                    container: '#fce7f3',
                    onContainer: '#9d174d',
                }, // pink — maternity
                darkColors: {
                    main: '#f472b6',
                    container: '#831843',
                    onContainer: '#fbcfe8',
                },
            },
            'Paternity Leave': {
                colorName: 'paternity_leave',
                lightColors: {
                    main: '#6366f1',
                    container: '#e0e7ff',
                    onContainer: '#3730a3',
                }, // indigo — paternity
                darkColors: {
                    main: '#818cf8',
                    container: '#312e81',
                    onContainer: '#c7d2fe',
                },
            },
            'Special Privilege Leave': {
                colorName: 'special_privilege_leave',
                lightColors: {
                    main: '#a855f7',
                    container: '#f3e8ff',
                    onContainer: '#6b21a8',
                }, // purple — special/privilege
                darkColors: {
                    main: '#c084fc',
                    container: '#581c87',
                    onContainer: '#e9d5ff',
                },
            },
            'Solo Parent Leave': {
                colorName: 'solo_parent_leave',
                lightColors: {
                    main: '#f59e0b',
                    container: '#fef3c7',
                    onContainer: '#92400e',
                }, // amber — family
                darkColors: {
                    main: '#fbbf24',
                    container: '#78350f',
                    onContainer: '#fde68a',
                },
            },
            'Study Leave': {
                colorName: 'study_leave',
                lightColors: {
                    main: '#0ea5e9',
                    container: '#e0f2fe',
                    onContainer: '#0c4a6e',
                }, // sky — learning
                darkColors: {
                    main: '#38bdf8',
                    container: '#082f49',
                    onContainer: '#bae6fd',
                },
            },
            '10 Day VAWC Leave': {
                colorName: '10_day_leave',
                lightColors: {
                    main: '#dc2626',
                    container: '#fef2f2',
                    onContainer: '#7f1d1d',
                }, // deep red — VAWC/urgent
                darkColors: {
                    main: '#ef4444',
                    container: '#450a0a',
                    onContainer: '#fecaca',
                },
            },
            'Rehabilitation Privilege': {
                colorName: 'rehabilitation_privilege',
                lightColors: {
                    main: '#14b8a6',
                    container: '#ccfbf1',
                    onContainer: '#134e4a',
                }, // teal — recovery/rehab
                darkColors: {
                    main: '#2dd4bf',
                    container: '#042f2e',
                    onContainer: '#99f6e4',
                },
            },
            'Special Leave Benefits for Women': {
                colorName: 'special_leave_benefits_for_women',
                lightColors: {
                    main: '#db2777',
                    container: '#fdf2f8',
                    onContainer: '#831843',
                }, // rose — women
                darkColors: {
                    main: '#f472b6',
                    container: '#500724',
                    onContainer: '#fbcfe8',
                },
            },
            'Special Emergency Calamity Leave': {
                colorName: 'special_emergency_calamity_leave',
                lightColors: {
                    main: '#b45309',
                    container: '#fef3c7',
                    onContainer: '#78350f',
                }, // dark amber — emergency
                darkColors: {
                    main: '#d97706',
                    container: '#451a03',
                    onContainer: '#fde68a',
                },
            },
            'Adoption Leave': {
                colorName: 'adoption_leave',
                lightColors: {
                    main: '#84cc16',
                    container: '#f7fee7',
                    onContainer: '#365314',
                }, // lime — new beginnings
                darkColors: {
                    main: '#a3e635',
                    container: '#1a2e05',
                    onContainer: '#d9f99d',
                },
            },

            // --- STATUSES ---
            CTO: {
                colorName: 'cto',
                lightColors: {
                    main: '#22c55e',
                    container: '#dcfce7',
                    onContainer: '#15803d',
                },
                darkColors: {
                    main: '#4ade80',
                    container: '#14532d',
                    onContainer: '#bbf7d0',
                },
            },
            'Auto Offset': {
                colorName: 'auto_offset',
                lightColors: {
                    main: '#3b82f6',
                    container: '#dbeafe',
                    onContainer: '#1e40af',
                },
                darkColors: {
                    main: '#60a5fa',
                    container: '#1e3a8a',
                    onContainer: '#bfdbfe',
                },
            },
            'On Leave (not filled)': {
                colorName: 'on_leave_not_filled',
                lightColors: {
                    main: '#eab308',
                    container: '#fef9c3',
                    onContainer: '#a16207',
                },
                darkColors: {
                    main: '#facc15',
                    container: '#713f12',
                    onContainer: '#fef08a',
                },
            },
            'Auto Offset (not filled)': {
                colorName: 'auto_offset_not_filled',
                lightColors: {
                    main: '#71717a',
                    container: '#f4f4f5',
                    onContainer: '#3f3f46',
                },
                darkColors: {
                    main: '#a1a1aa',
                    container: '#27272a',
                    onContainer: '#e4e4e7',
                },
            },
        },
        defaultView: viewMonthGrid.name,
        events: mappedEvents,

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
        eventsService.set(mappedEvents);
    }, [leaves]);

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
