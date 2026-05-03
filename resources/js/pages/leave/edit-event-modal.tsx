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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroupAddon } from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { Switch } from '@/components/ui/switch';
import { update } from '@/routes/leave';
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CalendarOff, CheckIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { leave_types, LeaveEvent, statuses } from './leave_data/data';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function EditEventModal({
    open,
    onOpenChange,
    event,
    form,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: LeaveEvent | undefined;
    form: ReturnType<typeof useForm<Partial<LeaveEvent>>>;
}) {
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
        setTimeout(() => {
            form.submit(update(Number(form.data.id)), {
                onSuccess: () => {
                    onOpenChange(!open);
                    setDate({ from: new Date() });
                    form.reset();
                },
            });
        }, 0);
    }

    return (
        <Dialog
            key={event?.id}
            modal={false}
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogTitle></DialogTitle>
            <DialogContent
                aria-labelledby={undefined}
                className="gap-0 overflow-hidden p-0 sm:max-w-md"
            >
                {/* ACCENT BAR */}
                <div className="h-[3px] bg-blue-500" />

                {/* HEADER */}
                <div className="border-b border-zinc-100 px-6 pt-5 pb-3 dark:border-zinc-800">
                    <p className="text-[15px] font-medium text-zinc-900 dark:text-zinc-50">
                        Edit Leave
                    </p>
                    <p className="mt-0.5 text-[12px] text-zinc-400 dark:text-zinc-500">
                        Fill in the details below to submit a leave request.
                    </p>
                </div>

                {/* BODY */}
                <div className="flex flex-col gap-4 px-6 py-4">
                    {/* EMPLOYEE NAME */}
                    <Field>
                        <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                            Employee name
                        </FieldLabel>
                        <Combobox
                            defaultInputValue={event?.user}
                            onValueChange={(user) =>
                                form.setData('user_id', user as string | number)
                            }
                            items={users}
                        >
                            <ComboboxInput placeholder="Select an employee">
                                <InputGroupAddon>
                                    <UserIcon className="h-3.5 w-3.5 text-zinc-400" />
                                </InputGroupAddon>
                            </ComboboxInput>
                            <ComboboxContent alignOffset={-28} className="w-60">
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
                            message={form.errors.user_id}
                            className="mt-1"
                        />
                    </Field>

                    {/* DATE RANGE */}
                    <Field>
                        <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                            Date range
                        </FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start px-2.5 text-[13px] font-normal"
                                >
                                    <CalendarIcon className="h-3.5 w-3.5 text-zinc-400" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(
                                                    date.from,
                                                    'MMM dd, yyyy',
                                                )}{' '}
                                                —{' '}
                                                {format(
                                                    date.to,
                                                    'MMM dd, yyyy',
                                                )}
                                            </>
                                        ) : (
                                            format(date.from, 'MMM dd, yyyy')
                                        )
                                    ) : (
                                        <span className="text-zinc-400">
                                            Pick a date
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from ?? new Date()}
                                    selected={date}
                                    onSelect={(range) => {
                                        setDate(range);
                                        form.setData(
                                            'date_from',
                                            range?.from
                                                ? format(
                                                      range.from,
                                                      'yyyy-MM-dd',
                                                  ).toString()
                                                : '',
                                        );
                                        form.setData(
                                            'date_to',
                                            range?.to
                                                ? format(
                                                      range.to,
                                                      'yyyy-MM-dd',
                                                  ).toString()
                                                : '',
                                        );
                                    }}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError
                            message={
                                form.errors.date_from ?? form.errors.date_to
                            }
                            className="mt-1"
                        />
                    </Field>

                    {/* STATUS TOGGLE */}
                    <Field>
                        <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                            Status
                        </FieldLabel>
                        <div className="flex items-center gap-2.5">
                            <Switch
                                id="is_approve"
                                checked={form.data.is_approve ?? false}
                                onCheckedChange={() => {
                                    const next = !form.data.is_approve;
                                    form.setData('is_approve', next);
                                }}
                                className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600"
                            />
                            <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
                                {form.data.is_approve ? 'Approved' : 'Pending'}
                            </span>
                        </div>
                    </Field>

                    {/* LEAVE TYPE PILLS */}
                    <Field>
                        <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                            Leave type
                        </FieldLabel>
                        <div className="flex flex-wrap gap-1.5">
                            {statuses.map((status) => {
                                const isSelected =
                                    selectedStatus === status.label;
                                return (
                                    <button
                                        type="button"
                                        key={status.label}
                                        onClick={() => {
                                            setSelectedStatus(status.label);
                                            form.setData(
                                                'leave_type',
                                                status.label === 'On Leave'
                                                    ? ''
                                                    : status.label,
                                            );
                                        }}
                                        className={`rounded-full px-3 py-1 text-[12px] font-medium ring-[0.5px] transition-colors ${
                                            isSelected
                                                ? `${status.activeBg} text-white ring-transparent`
                                                : `bg-zinc-50 text-zinc-500 ring-zinc-200 hover:opacity-80 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700`
                                        }`}
                                    >
                                        {status.label}
                                    </button>
                                );
                            })}
                        </div>
                        <InputError
                            message={form.errors.leave_type}
                            className="mt-1"
                        />
                    </Field>

                    {/* LEAVE TYPE COMBOBOX (On Leave only) */}
                    {selectedStatus === 'On Leave' && (
                        <Field>
                            <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                                Leave subtype
                            </FieldLabel>
                            <Combobox
                                items={leave_types}
                                defaultValue={
                                    leaveType === 'On Leave'
                                        ? event?.calendarId
                                        : ''
                                }
                                onValueChange={(value) =>
                                    form.setData('leave_type', value as string)
                                }
                            >
                                <ComboboxInput
                                    name="leave_type"
                                    placeholder="Select a leave type"
                                >
                                    <InputGroupAddon>
                                        <CalendarOff className="h-3.5 w-3.5 text-zinc-400" />
                                    </InputGroupAddon>
                                </ComboboxInput>
                                <ComboboxContent
                                    alignOffset={-28}
                                    className="w-60"
                                >
                                    <ComboboxEmpty>
                                        No types found.
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
                                message={form.errors.leave_type}
                                className="mt-1"
                            />
                        </Field>
                    )}

                    {/* DESCRIPTION */}
                    <Field>
                        <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                            Description / remarks
                            <span className="ml-1 font-normal text-zinc-300 dark:text-zinc-600">
                                (optional)
                            </span>
                        </FieldLabel>
                        <Textarea
                            name="description"
                            defaultValue={event?.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            placeholder="Type your message here."
                            className="h-16 resize-none text-[13px]"
                        />
                    </Field>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-3 dark:border-zinc-800">
                    <Button
                        variant="ghost"
                        type="button"
                        className="text-[13px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.processing}
                        onClick={handleSubmit}
                        className="gap-1.5 bg-blue-500 text-[13px] text-white hover:bg-blue-600"
                    >
                        {form.processing ? (
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                            <CheckIcon className="h-3.5 w-3.5" />
                        )}
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
