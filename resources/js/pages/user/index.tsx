import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import users from '@/routes/users';
import { usePage } from '@inertiajs/react';
import { User2, User2Icon, UsersIcon } from 'lucide-react';
import CreateUser from './create-user';

export default function User() {
    const { users } = usePage().props;

    return (
        <div className="m-4">
            <Tabs defaultValue="users">
                <TabsList variant="line">
                    <TabsTrigger value="users">
                        <UsersIcon />
                        Users
                    </TabsTrigger>
                    <TabsTrigger value="create">
                        <User2 />
                        New User
                    </TabsTrigger>
                </TabsList>
                <TabsContent className="m-4" value="users">
                    <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="flex items-center gap-1 text-sm">
                                    Office of Civil Defense{' '}
                                    <span className="text-yellow-300 dark:text-yellow-400">
                                        Caraga
                                    </span>
                                </h5>
                                <h3 className="text-2xl font-semibold">
                                    Users Lists
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    User creation and details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="m-4">{/* Data table */}</div>
                </TabsContent>
                <TabsContent className="m-4 space-y-1.5" value="create">
                    <div className="rounded-x flex h-full flex-1 flex-col gap-4 overflow-x-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="flex items-center gap-1 text-sm">
                                    Office of Civil Defense{' '}
                                    <span className="text-yellow-300 dark:text-yellow-400">
                                        Caraga
                                    </span>
                                </h5>
                                <h3 className="text-2xl font-semibold">
                                    User Creation
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Full personal details
                                </p>
                            </div>
                        </div>
                    </div>
                    <CreateUser />
                </TabsContent>
            </Tabs>

            {/* data table */}
            <div></div>
        </div>
    );
}

User.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
    ],
};
