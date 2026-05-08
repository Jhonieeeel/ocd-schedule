import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Clock } from 'lucide-react';
import { Balance, months, years } from '../leave/leave_data/data';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { useForm, usePage } from '@inertiajs/react';
import { store } from '@/routes/balance';

type User = {
    id: number;
    name: string;
};

type PageProps = {
    users: User[];
};

export default function AddBalance() {
    const { users, auth } = usePage<PageProps>().props;

    const now = new Date();

    const form = useForm({
        user_id: auth.user.id,

        // balance
        vl_balance: undefined as number | undefined,
        fl_balance: undefined as number | undefined,
        spl_balance: undefined as number | undefined,
        sl_balance: undefined as number | undefined,

        // used/
        vl_used: undefined as number | undefined,
        fl_used: undefined as number | undefined,
        spl_used: undefined as number | undefined,
        sl_used: undefined as number | undefined,

        // time
        undertime: undefined as number | undefined,

        // date
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    });

    function handleSubmit() {
        form.submit(store(), {
            onSuccess: () => form.reset(),
        });
    }

    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>
                <Button className="border-2 border-yellow-300 bg-yellow-100 text-yellow-300 hover:bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800">
                    Add User Balance
                </Button>
            </DialogTrigger>

            <DialogContent
                aria-describedby={undefined}
                className="overflow-hidden p-0 sm:max-w-145"
            >
                <DialogHeader className="flex flex-row items-center gap-3 border-b px-6 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-100 dark:bg-yellow-900">
                        <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <div>
                        <DialogTitle className="text-sm leading-none font-medium">
                            User Balance
                        </DialogTitle>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Add leave and time records
                        </p>
                    </div>
                </DialogHeader>

                <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-6 py-5">
                    {/* User */}
                    <div className="space-y-1.5">
                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                            User ( search by name )
                        </Label>
                        <Combobox items={users}>
                            <ComboboxInput placeholder="Select an employee" />
                            <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    {/* Month & Year */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Month
                            </Label>
                            <Select
                                value={form.data.month.toString()}
                                onValueChange={(v) =>
                                    form.setData('month', Number(v))
                                }
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((m) => (
                                        <SelectItem
                                            key={m.id}
                                            value={m.id.toString()}
                                        >
                                            {m.month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Year
                            </Label>
                            <Select
                                value={form.data.year.toString()}
                                onValueChange={(v) =>
                                    form.setData('year', Number(v))
                                }
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((y) => (
                                        <SelectItem
                                            key={y}
                                            value={y.toString()}
                                        >
                                            {y}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    {/* Undertime */}
                    <div className="space-y-1.5">
                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                            Undertime
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="0"
                                min={0}
                                step={1}
                                className="h-9 pr-12"
                                value={form.data.undertime}
                                onChange={(e) =>
                                    form.setData(
                                        'undertime',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                                mins
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total undertime in minutes
                        </p>
                    </div>

                    <Separator />

                    {/* Leave Balances */}
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Leave Balances
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    key: 'vl_balance',
                                    label: 'VL',
                                    desc: 'Vacation leave',
                                },
                                {
                                    key: 'sl_balance',
                                    label: 'SL',
                                    desc: 'Sick leave',
                                },
                                {
                                    key: 'fl_balance',
                                    label: 'FL',
                                    desc: 'Force leave',
                                },
                                {
                                    key: 'spl_balance',
                                    label: 'SPL',
                                    desc: 'Special privilege',
                                },
                            ].map(({ key, label, desc }) => (
                                <div key={key} className="space-y-1.5">
                                    <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                        {label} Balance
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                                            {label}
                                        </span>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            min={0}
                                            step={0.5}
                                            className="h-9 pl-10"
                                            value={
                                                form.data[
                                                    key as keyof typeof form.data
                                                ]
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    key as keyof typeof form.data,
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Leave Used */}
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Leave Used
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    key: 'vl_used',
                                    label: 'VL',
                                    desc: 'Vacation leave used',
                                },
                                {
                                    key: 'sl_used',
                                    label: 'SL',
                                    desc: 'Sick leave used',
                                },
                                {
                                    key: 'fl_used',
                                    label: 'FL',
                                    desc: 'Force leave used',
                                },
                                {
                                    key: 'spl_used',
                                    label: 'SPL',
                                    desc: 'Special privilege used',
                                },
                            ].map(({ key, label, desc }) => (
                                <div key={key} className="space-y-1.5">
                                    <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                        {label} Used
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                                            {label}
                                        </span>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            min={0}
                                            step={1}
                                            className="h-9 pl-10"
                                            value={
                                                form.data[
                                                    key as keyof typeof form.data
                                                ]
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    key as keyof typeof form.data,
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />
                </div>

                <DialogFooter className="gap-2 border-t bg-muted/40 px-6 py-4">
                    <DialogClose asChild>
                        <Button variant="outline" className="flex-1">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={form.processing}
                        className="flex-2 border-2 border-yellow-300 bg-yellow-100 text-yellow-300 hover:border-yellow-400 hover:bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:border-yellow-600 dark:hover:bg-yellow-800"
                        onClick={handleSubmit}
                    >
                        Save Balance
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
