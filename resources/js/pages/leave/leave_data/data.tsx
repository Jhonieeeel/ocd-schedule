import { AlertCircle, AlertTriangle, MapPin, Star } from 'lucide-react';

// lib/calendar-colors.ts
export const CALENDARS = {
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
    'Mandatory/Force Leave': {
        colorName: 'force_leave',
        lightColors: {
            main: '#f97316',
            container: '#ffedd5',
            onContainer: '#9a3412',
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
        darkColors: {
            main: '#a3e635',
            container: '#1a2e05',
            onContainer: '#d9f99d',
        },
    },
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
} as const;

export type CalendarId = keyof typeof CALENDARS;

export interface CalendarColors {
    main: string;
    container: string;
    onContainer: string;
}

export const statuses = [
    {
        label: 'CTO',
        type: 'cto',
        bg: 'bg-green-100',
        text: 'text-green-700',
        ring: 'ring-green-200',
        activeBg: 'bg-green-500',
    },
    {
        label: 'On Leave',
        type: 'on_leave',
        bg: 'bg-red-100',
        text: 'text-red-700',
        ring: 'ring-red-200',
        activeBg: 'bg-red-500',
    },
    {
        label: 'Auto Offset',
        type: 'auto_offset',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        ring: 'ring-blue-200',
        activeBg: 'bg-blue-500',
    },
    {
        label: 'On Leave (not filled)',
        type: 'on_leave_not_filled',
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        ring: 'ring-yellow-200',
        activeBg: 'bg-yellow-500',
    },
    {
        label: 'Auto Offset (not filled)',
        type: 'auto_offset_not_filled',
        bg: 'bg-zinc-100',
        text: 'text-zinc-600',
        ring: 'ring-zinc-200',
        activeBg: 'bg-zinc-500',
    },
];

export const leave_types = [
    {
        id: 1,
        leave_type: 'vacation_leave',
        name: 'Vacation Leave',
    },
    {
        id: 2,
        leave_type: 'force_leave',
        name: 'Mandatory/Force Leave',
    },
    {
        id: 3,
        leave_type: 'sick_leave',
        name: 'Sick Leave',
    },
    {
        id: 4,
        leave_type: 'wellness_leave',
        name: 'Wellness Leave',
    },
    {
        id: 5,
        leave_type: 'maternity_leave',
        name: 'Maternity Leave',
    },
    {
        id: 6,
        leave_type: 'paternity_leave',
        name: 'Paternity Leave',
    },
    {
        id: 7,
        leave_type: 'special_privilege_leave',
        name: 'Special Privilege Leave',
    },
    {
        id: 8,
        leave_type: 'solo_parent_leave',
        name: 'Solo Parent Leave',
    },
    {
        id: 9,
        leave_type: 'study_leave',
        name: 'Study Leave',
    },
    {
        id: 10,
        leave_type: '10_day_leave',
        name: '10 Day VAWC Leave',
    },
    {
        id: 11,
        leave_type: 'rehabilitation_privilege',
        name: 'Rehabilitation Privilege',
    },
    {
        id: 12,
        leave_type: 'special_leave_benefits_for_women',
        name: 'Special Leave Benefits for Women',
    },
    {
        id: 13,
        leave_type: 'special_emergency_calamity_leave',
        name: 'Special Emergency Calamity Leave',
    },
    {
        id: 14,
        leave_type: 'adoption_leave',
        name: 'Adoption Leave',
    },
];

export type Balance = {
    id?: number;
    user_id: number;
    year: number;
    month: number;
    user?: {
        id: number;
        name: string;
    };
    vl_balance?: number;
    vl_used?: number;
    sl_balance?: number;
    sl_used?: number;
    fl_balance?: number;
    fl_used?: number;
    spl_balance?: number;
    undertime?: number;
    as_of?: string;

    created_at?: string;
    updated_at?: string;
};

export type LeaveEvent = {
    id: number | undefined;
    calendarId?: string;
    title?: string;
    card_title?: string;
    leave_type?: string;
    user?: string;
    user_id?: string | number;
    description?: string;
    is_approve: boolean;
    start: string;
    end: string;

    theme?: any;
};

export type TypeCalendar = {
    calendarId: string;
    description: string;
    end: Temporal.PlainDate;
    id: string;
    leaves: string;
    location?: string | undefined;
    people?: any;
    resourceId: string | number;
    start: Temporal.PlainDate;
    theme?: any;
    title: string;
    user: string;
    user_id: string | number;
};

export const months = [
    {
        id: 1,
        month: 'January',
    },
    {
        id: 2,
        month: 'February',
    },
    {
        id: 3,
        month: 'March',
    },
    {
        id: 4,
        month: 'April',
    },
    {
        id: 5,
        month: 'May',
    },
    {
        id: 6,
        month: 'June',
    },
    {
        id: 7,
        month: 'July',
    },
    {
        id: 8,
        month: 'August',
    },
    {
        id: 9,
        month: 'September',
    },
    {
        id: 10,
        month: 'October',
    },
    {
        id: 11,
        month: 'November',
    },
    {
        id: 12,
        month: 'December',
    },
];

export const leaves: {
    key: string;
    label: string;
    icon: React.ReactNode;
    iconClass: string;
    balanceKey: keyof typeof form.data;
    usedKey: keyof typeof form.data;
}[] = [
    {
        key: 'vl',
        label: 'Vacation Leave',
        icon: <MapPin className="h-3.5 w-3.5" />,
        iconClass:
            'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
        balanceKey: 'vl_balance',
        usedKey: 'vl_used',
    },
    {
        key: 'sl',
        label: 'Sick Leave',
        icon: <AlertCircle className="h-3.5 w-3.5" />,
        iconClass:
            'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
        balanceKey: 'sl_balance',
        usedKey: 'sl_used',
    },
    {
        key: 'fl',
        label: 'Force Leave',
        icon: <AlertTriangle className="h-3.5 w-3.5" />,
        iconClass: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
        balanceKey: 'fl_balance',
        usedKey: 'fl_used',
    },
    {
        key: 'spl',
        label: 'Special Privilege',
        icon: <Star className="h-3.5 w-3.5" />,
        iconClass: 'bg-muted text-muted-foreground',
        balanceKey: 'spl_balance',
        usedKey: 'spl_used',
    },
];

let currentYear = new Date().getFullYear();
export const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

export type AttendanceLog = {
    id: number;
    user_id: number | undefined;
    balance_id: number;
    date: string;
    minutes?: number;
    hours?: number;
    is_tardy: boolean;
    cutoff: number;
};
