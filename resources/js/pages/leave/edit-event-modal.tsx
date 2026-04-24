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

import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { update } from '@/routes/leave';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CalendarOff, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { leave_types, LeaveEvent, statuses } from './leave_data/data';

export default function EditEventModal({
    open,
    onOpenChange,
    event,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: LeaveEvent | undefined;
}) {
    const { setData, processing, submit, errors, data } = useForm({
        id: event?.id as string | number,
        user_id: event?.user_id as number | string,
        leave_type: event?.calendarId as string,
        date_from: event?.start?.toString() ?? '',
        date_to: event?.end?.toString() ?? '',
        description: event?.description ?? '',
        is_approve: event?.is_approve ?? (false as boolean | undefined),
    });

    const [date, setDate] = useState<DateRange | undefined>({
        from: event?.start ? new Date(event.start.toString()) : undefined,
        to: event?.end ? new Date(event.end.toString()) : undefined,
    });

    let leaveType = '';

    if (
        event?.calendarId !== 'CTO' &&
        event?.calendarId !== 'Auto Offset' &&
        event?.calendarId !== 'On Leave (not filled)' &&
        event?.calendarId !== 'Auto Offset (not filled)'
    ) {
        leaveType = 'On Leave';
    }

    const [selectedStatus, setSelectedStatus] = useState<string | null>(
        (leaveType || event?.calendarId) ?? null,
    );

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

    const { users } = usePage<PageProps>().props;

    function handleSubmit() {
        submit(update(Number(event?.id)), {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    }

    return (
        <Dialog
            key={event?.id}
            modal={false}
            open={open}
            onOpenChange={onOpenChange}
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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <FieldGroup className="gap-4">
                            {/* EMPLOYEE NAME */}
                            <Field>
                                <FieldLabel className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                                    Employee Name
                                </FieldLabel>
                                <Combobox
                                    defaultInputValue={event?.user}
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
                                            defaultMonth={
                                                date?.from ?? new Date()
                                            }
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

                            {/* Leave (Approve/Pending) */}
                            <Field>
                                <FieldLabel>Status</FieldLabel>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_approve"
                                        checked={data.is_approve ?? false}
                                        onCheckedChange={() =>
                                            setData(
                                                'is_approve',
                                                !event?.is_approve,
                                            )
                                        }
                                    />
                                </div>
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
                                        defaultValue={
                                            leaveType === 'On Leave'
                                                ? event?.calendarId
                                                : ''
                                        }
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
                                    defaultValue={event?.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Type your message here."
                                />
                            </Field>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-3 dark:border-zinc-800">
                                <Button
                                    variant="ghost"
                                    type="button"
                                    className="text-[13px] text-zinc-600"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-[13px] text-white hover:bg-blue-600"
                                >
                                    {processing ?? <Spinner />}
                                    Submit
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
