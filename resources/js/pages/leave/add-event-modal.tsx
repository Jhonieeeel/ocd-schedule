import InputError from '@/components/input-error';
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
import { leave_types, statuses } from './leave_data/data';

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

export default function AddEventModal({
    openAddEvent,
    setOpenAddEvent,
}: AddModalProps) {
    const { users, flash, leaves, auth } = usePage<PageProps>().props;

    const [leave, setLeave] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // date picker
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    // useForm
    const { data, setData, processing, submit, errors } = useForm({
        user_id: (auth.role === 'employee' ? auth.user.id : '') as
            | number
            | string, // 1, 2, 3...
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
                                    defaultInputValue={
                                        auth.role === 'employee'
                                            ? auth.user.id
                                            : data.user_id
                                    }
                                    disabled={auth.role === 'employee'}
                                    onValueChange={(user) =>
                                        setData(
                                            'user_id',
                                            user as string | number,
                                        )
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
                                        {auth.role === 'employee' ? (
                                            <ComboboxList>
                                                <ComboboxItem
                                                    key={auth.user.id}
                                                    value={auth.user.id}
                                                >
                                                    {auth.user.name}
                                                </ComboboxItem>
                                            </ComboboxList>
                                        ) : (
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
                                        )}
                                    </ComboboxContent>
                                </Combobox>
                                <InputError
                                    message={errors.user_id}
                                    className="mt-2"
                                />
                            </Field>

                            {/* DATE RAMGE 2 field*/}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Date Range
                                </FieldLabel>
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
                                <InputError
                                    message={errors.date_from && errors.date_to}
                                    className="mt-2"
                                />
                            </Field>

                            {/* LEAVE STATUS */}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Leave Status
                                </FieldLabel>
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
                                <InputError
                                    message={errors.leave_type}
                                    className="mt-2"
                                />
                            </Field>
                            {selectedStatus === 'On Leave' && (
                                <Field>
                                    <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                        Leave Type
                                    </FieldLabel>

                                    <Combobox
                                        items={leave_types}
                                        onValueChange={(value) => {
                                            setData(
                                                'leave_type',
                                                value as string,
                                            );
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
                                    <InputError
                                        message={errors.leave_type}
                                        className="mt-2"
                                    />
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
