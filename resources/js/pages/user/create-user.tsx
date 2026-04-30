import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateUser() {
    return (
        <FieldGroup className="mx-auto mt-14 grid grid-cols-4">
            <Field className="col-span-2 space-y-1.5">
                <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                    First name
                </Label>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="First name"
                        className="h-9 pr-12"
                    />
                </div>
                <p className="text-xs text-muted-foreground">ex. Michael</p>
            </Field>
            <Field className="col-span-2 space-y-1.5">
                <Label className="text-xs tracking-wide text-muted-foreground uppercase">
                    last name
                </Label>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Last name"
                        className="h-9 pr-12"
                    />
                </div>
                <p className="text-xs text-muted-foreground">ex. Overly</p>
            </Field>
        </FieldGroup>
    );
}
