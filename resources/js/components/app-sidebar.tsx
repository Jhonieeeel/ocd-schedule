import { index } from '@/actions/App/Http/Controllers/DashboardController';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import balance from '@/routes/balance';
import leave from '@/routes/leave';
import type { MainNav, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FileText,
    FolderGit2,
    LayoutGrid,
    Rows,
    User,
    User2Icon,
    Users2,
} from 'lucide-react';

const mainNavItems: MainNav[] = [
    {
        label: 'Platform',
        items: [
            {
                title: 'Dashboard',
                href: index(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Leave Tracker',
        items: [
            {
                title: 'My Balance',
                href: balance.index(),
                icon: User,
            },
            {
                title: 'All Balances',
                href: balance.all(),
                icon: Rows,
            },
            {
                title: 'Leaves',
                href: leave.index(),
                icon: FileText,
            },
        ],
    },
    {
        label: 'User Management',
        items: [
            {
                title: 'Users',
                href: '',
                icon: Users2,
                role: 'hr',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={index()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
