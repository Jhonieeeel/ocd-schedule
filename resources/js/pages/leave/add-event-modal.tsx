import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroupAddon } from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/leave';
import { Form, useForm, usePage } from '@inertiajs/react';
import { addDays, format } from 'date-fns';
import { CalendarIcon, CalendarOff, UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

type AddModalProps = {
    openAddEvent: boolean;
    setOpenAddEvent: (value: boolean) => void;
};

type User = {
    email: string;
    name: string;
    id: string | number;
};

type FileLeave = {
    user_id: number;
    leave_type: string;
};

const statuses = [
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

const leave_types = [
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

export default function AddEventModal({
    openAddEvent,
    setOpenAddEvent,
}: AddModalProps) {
    const [leave, setLeave] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);

    // date picker
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    // useForm
    const { data, setData, processing, submit } = useForm({
        user_id: '' as number | string, // 1, 2, 3...
        leave_type: '', // Sick Leave, Vacation Leave
        date_from: '', // march 1 to april etc
        date_to: '', // march 1 to april etc
        description: '', // asdsad optiomal
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submit(store(), {
            onSuccess: () => {
                setOpenAddEvent(false);
                setSelectedStatus(null);
            },
        });
    };

    type User = {
        id: number;
        name: string;
    };

    type PageProps = {
        flash: {
            message?: string;
        };
        users: User[];
        leaves: [];
    };

    // usePage
    const { users, flash, leaves } = usePage<PageProps>().props;
    console.log(leaves);

    return (
        <Dialog
            modal={false}
            open={openAddEvent}
            onOpenChange={setOpenAddEvent}
        >
            <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
                {/* accent bar */}
                <div className="h-1 bg-blue-500" />

                <div className="px-6 pt-5 pb-2">
                    <DialogHeader>
                        <DialogTitle className="text-base font-medium">
                            Add New Leave
                        </DialogTitle>
                        <p className="text-[12px] text-zinc-400">
                            Fill in the details below to submit a leave request.
                        </p>
                    </DialogHeader>
                </div>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSubmit} method="post">
                        <FieldGroup className="gap-4">
                            {/* EMPLOYEE NAME */}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Employee Name
                                </FieldLabel>
                                <Combobox
                                    onValueChange={(user) =>
                                        setData('user_id', user)
                                    }
                                    items={users}
                                >
                                    <ComboboxInput placeholder="Select an employee">
                                        <InputGroupAddon>
                                            <UserIcon className="h-4 w-4 text-zinc-400" />
                                        </InputGroupAddon>
                                    </ComboboxInput>
                                    <ComboboxContent
                                        alignOffset={-28}
                                        className="w-60"
                                    >
                                        <ComboboxEmpty>
                                            No employees found.
                                        </ComboboxEmpty>
                                        <ComboboxList>
                                            {(user) => (
                                                <ComboboxItem
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </Field>

                            {/* DATE RAMGE 2 field*/}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Date Range
                                </FieldLabel>
                                <input
                                    type="hidden"
                                    name="date_to"
                                    value={data.date_to}
                                />
                                <input
                                    type="hidden"
                                    name="date_from"
                                    value={data.date_from}
                                />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date-picker-range"
                                            className="justify-start px-2.5 font-normal"
                                        >
                                            <CalendarIcon />
                                            {date?.from ? (
                                                date.to ? (
                                                    <>
                                                        {format(
                                                            date.from,
                                                            'LLL dd, y',
                                                        )}{' '}
                                                        -{' '}
                                                        {format(
                                                            date.to,
                                                            'LLL dd, y',
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        date.from,
                                                        'LLL dd, y',
                                                    )
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="range"
                                            defaultMonth={new Date()}
                                            selected={date}
                                            onSelect={(range) => {
                                                setDate(range);
                                                setData(
                                                    'date_from',
                                                    range?.from
                                                        ? format(
                                                              range.from,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                );
                                                setData(
                                                    'date_to',
                                                    range?.to
                                                        ? format(
                                                              range.to,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                );
                                            }}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>

                            {/* LEAVE STATUS */}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Leave Status
                                </FieldLabel>
                                <input type="hidden" value={data.leave_type} />
                                <div className="flex flex-wrap gap-2">
                                    {statuses.map((status) => {
                                        const isSelected =
                                            selectedStatus === status.label;
                                        return (
                                            <button
                                                type="button"
                                                key={status.label}
                                                onClick={() => {
                                                    setSelectedStatus(
                                                        status.label,
                                                    );

                                                    if (
                                                        status.label ===
                                                        'On Leave'
                                                    ) {
                                                        setData(
                                                            'leave_type',
                                                            '',
                                                        );
                                                    } else {
                                                        setData(
                                                            'leave_type',
                                                            status.label,
                                                        );
                                                    }
                                                }}
                                                className={`rounded-full px-3 py-1 text-[12px] font-medium ring-1 transition-colors ${
                                                    isSelected
                                                        ? `${status.activeBg} text-white ring-transparent`
                                                        : `${status.bg} ${status.text} ${status.ring} hover:opacity-80`
                                                }`}
                                            >
                                                {status.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </Field>
                            {selectedStatus === 'On Leave' && (
                                <Field>
                                    <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                        Leave Type
                                    </FieldLabel>

                                    <Combobox
                                        items={leave_types}
                                        onValueChange={(value) => {
                                            setData('leave_type', value);
                                        }}
                                    >
                                        <ComboboxInput
                                            name="leave_type"
                                            placeholder="Select an leave type"
                                        >
                                            <InputGroupAddon>
                                                <CalendarOff className="h-4 w-4 text-zinc-400" />
                                            </InputGroupAddon>
                                        </ComboboxInput>
                                        <ComboboxContent
                                            alignOffset={-28}
                                            className="w-60"
                                        >
                                            <ComboboxEmpty>
                                                No employees found.
                                            </ComboboxEmpty>
                                            <ComboboxList>
                                                {(leave) => (
                                                    <ComboboxItem
                                                        key={leave.id}
                                                        value={leave.name}
                                                    >
                                                        {leave.name}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                </Field>
                            )}

                            {/* REMAKRS / DESCRIPTION */}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Description/Remarks (Optional)
                                </FieldLabel>
                                <Textarea
                                    name="description"
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Type your message here."
                                />
                            </Field>
                            <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-3 dark:border-zinc-800">
                                <Button
                                    variant="ghost"
                                    className="text-[13px] text-zinc-600"
                                    onClick={() => {
                                        setOpenAddEvent(false);
                                        setSelectedStatus(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-[13px] text-white hover:bg-blue-600"
                                >
                                    {processing ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
