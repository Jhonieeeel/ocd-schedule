import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import {
    GraduationCap,
    LucideIcon,
    Shield,
    ShieldCheck,
    User2,
    UserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type RoleConfig = {
    label: string;
    icon: LucideIcon;
    variant: string;
};

const roleMap: Record<string, RoleConfig> = {
    'super-admin': {
        label: 'Super Admin',
        icon: ShieldCheck,
        variant: 'secondary',
    },
    employee: { label: 'Employee', icon: UserRound, variant: 'secondary' },
    hr: { label: 'HR', icon: User2, variant: 'secondary' },
    gip: { label: 'Intern', icon: GraduationCap, variant: 'secondary' },
};

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium">{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.email}
            </span>
        ),
    },
    {
        accessorKey: 'roles',
        header: 'Role',
        cell: ({ row }) => {
            const roleName: string = row.original.roles[0]?.name ?? 'user';
            const role = roleMap[roleName] ?? {
                label: roleName,
                icon: User2,
                variant: 'outline',
            };
            const Icon = role.icon;

            return (
                <Badge
                    variant={role.variant}
                    className="flex w-fit items-center gap-1 capitalize"
                >
                    <Icon className="h-3 w-3" />
                    {role.label}
                </Badge>
            );
        },
    },
];
