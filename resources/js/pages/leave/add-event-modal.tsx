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
import { useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, CalendarOff, CheckIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { leave_types, LeaveEvent, statuses } from './leave_data/data';
import { reset } from '@/routes/password';

type AddModalProps = {
    openAddEvent: boolean;
    setOpenAddEvent: (value: boolean) => void;
    form: ReturnType<typeof useForm<LeaveEvent>>;
};

export default function AddEventModal({
    openAddEvent,
    setOpenAddEvent,
    form,
}: AddModalProps) {
    const { users, auth } = usePage<PageProps>().props;

    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    // date picker
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: undefined,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.submit(store(), {
            onSuccess: () => {
                setOpenAddEvent(false);
                setSelectedStatus(null);
                setDate({ from: new Date() });
                form.reset();
            },
        });
    };

    type User = {
        id: number;
        name: string;
    };

    type PageProps = {
        flash?: {
            message?: string;
        };
        users?: User[];
        leaves?: [];
    };

    return (
        <Dialog
            modal={false}
            open={openAddEvent}
            onOpenChange={setOpenAddEvent}
        >
            <DialogContent className="gap-0 overflow-hidden border-zinc-600 p-0 sm:max-w-md">
                {/* ACCENT BAR */}
                <div className="h-[3px] bg-blue-500" />

                {/* HEADER */}
                <div className="border-b border-zinc-100 px-6 pt-5 pb-3 dark:border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-[15px] font-medium text-zinc-900 dark:text-zinc-50">
                            Add New Leave
                        </DialogTitle>
                        <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
                            Fill in the details below to submit a leave request.
                        </p>
                    </DialogHeader>
                </div>

                {/* BODY */}
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className="gap-4">
                            {/* EMPLOYEE NAME */}
                            <Field>
                                <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                                    Employee name
                                </FieldLabel>
                                <Combobox
                                    defaultInputValue={
                                        auth.role === 'employee'
                                            ? auth.user.id
                                            : form.data.user_id
                                    }
                                    disabled={auth.role === 'employee'}
                                    onValueChange={(user) =>
                                        form.setData(
                                            'user_id',
                                            user as string | number,
                                        )
                                    }
                                    items={users}
                                >
                                    <ComboboxInput placeholder="Select an employee">
                                        <InputGroupAddon>
                                            <UserIcon className="h-3.5 w-3.5 text-zinc-400" />
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
                                            id="date-picker-range"
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
                                                    format(
                                                        date.from,
                                                        'MMM dd, yyyy',
                                                    )
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
                                            defaultMonth={new Date()}
                                            selected={date}
                                            onSelect={(range) => {
                                                setDate(range);
                                                form.setData(
                                                    'start',
                                                    range?.from
                                                        ? format(
                                                              range.from,
                                                              'yyyy-MM-dd',
                                                          )
                                                        : '',
                                                );
                                                form.setData(
                                                    'end',
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
                                    message={
                                        form.errors.date_from ??
                                        form.errors.date_to
                                    }
                                    className="mt-1"
                                />
                            </Field>

                            {/* LEAVE STATUS PILLS */}
                            <Field>
                                <FieldLabel className="text-[12px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
                                    Leave status
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
                                                    setSelectedStatus(
                                                        status.label,
                                                    );
                                                    form.setData(
                                                        'leave_type',
                                                        status.label ===
                                                            'On Leave'
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
                                        Leave type
                                    </FieldLabel>
                                    <Combobox
                                        items={leave_types}
                                        onValueChange={(value) =>
                                            form.setData(
                                                'leave_type',
                                                value as string,
                                            )
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
                                    Description / remarks{' '}
                                    <span className="font-normal text-zinc-300 dark:text-zinc-600">
                                        (optional)
                                    </span>
                                </FieldLabel>
                                <Textarea
                                    name="description"
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Type your message here."
                                    className="h-16 resize-none text-[13px]"
                                />
                            </Field>

                            {/* FOOTER */}
                            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-[13px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
                                    onClick={() => {
                                        setOpenAddEvent(false);
                                        setSelectedStatus(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="gap-1.5 bg-blue-500 text-[13px] text-white hover:bg-blue-600"
                                >
                                    {form.processing ? (
                                        <>
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckIcon className="h-3.5 w-3.5" />
                                            Submit
                                        </>
                                    )}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
