import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, User2, UsersIcon, X } from 'lucide-react';
import CreateUser from './create-user';
import users from '@/routes/users';
import { CreateUserType } from '../leave/leave_data/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UserTable } from './user-table';
import { userColumns } from './user-column';
import { User as Users } from '@/types';

type PageProps = {
    flash: {
        message: string;
    };
    users: Users[];
};

export default function User() {
    const form = useForm<CreateUserType>({
        firstname: '',
        lastname: '',
        sex: '',
        email: '',
        password: '',
        password_confirmation: '',
        employee_number: '',
        role: '',
    });

    const { flash, users } = usePage<PageProps>().props;

    return (
        <div className="m-4">
            {flash.message && (
                <div className="py-4">
                    <Alert className="relative max-w-md border border-green-300 bg-green-200 py-2 dark:border-[#1D9E75] dark:bg-[#085041]">
                        <CheckCircle2Icon className="h-[18px] w-[18px] text-green-700 dark:text-emerald-400" />

                        <AlertTitle className="font-medium text-green-900 dark:text-emerald-200">
                            {flash.message}
                        </AlertTitle>

                        <AlertDescription className="text-sm leading-relaxed text-green-700 dark:text-emerald-400">
                            The new account has been saved to database.
                        </AlertDescription>

                        <button className="absolute top-3 right-3 text-green-600 transition-opacity hover:opacity-100 dark:text-emerald-500/60">
                            <X size={14} />
                        </button>
                    </Alert>
                </div>
            )}
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
                    <div className="mb-4 flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
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

                    {/* data table */}
                    <div>
                        <UserTable columns={userColumns} data={users ?? []} />
                    </div>
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
                    <CreateUser form={form} />
                </TabsContent>
            </Tabs>
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
