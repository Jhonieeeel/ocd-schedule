import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useForm } from '@inertiajs/react';
import { CreateUserType } from '../leave/leave_data/data';
import { store } from '@/routes/users';
import InputError from '@/components/input-error';

export default function CreateUser({
    form,
}: {
    form: ReturnType<typeof useForm<CreateUserType>>;
}) {
    function handleSubmit(e) {
        e.preventDefault();

        form.submit(store(), {
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            className="min-h-screen py-8"
        >
            <FieldGroup className="max-w-4xl space-y-10">
                {/* Personal Information */}
                <section className="space-y-6">
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Personal information
                        </p>
                        <div className="h-px bg-border" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                First name
                            </Label>
                            <Input
                                type="text"
                                placeholder="e.g. Michael"
                                value={form.data.firstname}
                                onChange={(e) =>
                                    form.setData('firstname', e.target.value)
                                }
                                className="h-10"
                            />
                            {form.errors.firstname ? (
                                <InputError message={form.errors.firstname} />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Your legal first name
                                </p>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Last name
                            </Label>
                            <Input
                                type="text"
                                placeholder="e.g. Overly"
                                value={form.data.lastname}
                                onChange={(e) =>
                                    form.setData('lastname', e.target.value)
                                }
                                className="h-10"
                            />
                            {form.errors.lastname ? (
                                <InputError message={form.errors.lastname} />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Your legal last name
                                </p>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Email address
                            </Label>
                            <Input
                                type="email"
                                placeholder="e.g. michael@example.com"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                className="h-10"
                            />
                            {form.errors.email ? (
                                <InputError message={form.errors.email} />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Your valid email address
                                </p>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Employee Number
                            </Label>
                            <Input
                                type="text"
                                placeholder="OCD-123456"
                                value={form.data.employee_number}
                                onChange={(e) =>
                                    form.setData(
                                        'employee_number',
                                        e.target.value,
                                    )
                                }
                                className="h-10"
                            />
                            {form.errors.employee_number ? (
                                <InputError
                                    message={form.errors.employee_number}
                                />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Your valid employee numebr
                                </p>
                            )}
                        </Field>
                    </div>

                    <Field className="space-y-1.5">
                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                            Sex
                        </Label>
                        <div className="max-w-auto flex gap-3">
                            {['Male', 'Female', 'Other'].map((option) => (
                                <label
                                    key={option}
                                    className="flex h-10 flex-1 cursor-pointer items-center gap-2.5 rounded-md border border-input bg-background px-4 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    <input
                                        type="radio"
                                        name="sex"
                                        value={option.toLowerCase()}
                                        onChange={(e) =>
                                            form.setData('sex', e.target.value)
                                        }
                                        className="accent-primary"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {form.errors.sex ? (
                            <InputError message={form.errors.sex} />
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Your valid email address
                            </p>
                        )}
                    </Field>

                    {/* Roles */}
                    <Field className="space-y-1.5">
                        <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                            Employee Role
                        </Label>
                        <div className="max-w-auto flex gap-3">
                            {['hr', 'gip', 'employee', 'super-admin'].map(
                                (option) => (
                                    <label
                                        key={option}
                                        className="flex h-10 flex-1 cursor-pointer items-center gap-2.5 rounded-md border border-input bg-background px-4 text-sm text-foreground capitalize transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={option.toLowerCase()}
                                            onChange={(e) =>
                                                form.setData(
                                                    'role',
                                                    e.target.value,
                                                )
                                            }
                                            className="accent-primary"
                                        />
                                        {option}
                                    </label>
                                ),
                            )}
                        </div>
                        {form.errors.role ? (
                            <InputError message={form.errors.role} />
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Your valid Role
                            </p>
                        )}
                    </Field>
                </section>

                {/* Security */}
                <section className="space-y-6">
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                            Security
                        </p>
                        <div className="h-px bg-border" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Password
                            </Label>
                            <PasswordInput
                                placeholder="Enter a strong password"
                                value={form.data.password}
                                onChange={(e) =>
                                    form.setData('password', e.target.value)
                                }
                                className="h-10"
                            />
                            {form.errors.password ? (
                                <InputError message={form.errors.password} />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    At least 8 characters
                                </p>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                                Confirm password
                            </Label>
                            <PasswordInput
                                placeholder="Re-enter your password"
                                value={form.data.password_confirmation}
                                onChange={(e) =>
                                    form.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="h-10"
                            />
                            {form.errors.password_confirmation ? (
                                <InputError
                                    message={form.errors.password_confirmation}
                                />
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Must match the password above
                                </p>
                            )}
                        </Field>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-border pt-4">
                    <Button variant="outline" size="lg">
                        Cancel
                    </Button>
                    <Button type="submit" size="lg">
                        {form.processing && <Spinner />}
                        Create account
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
