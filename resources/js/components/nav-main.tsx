import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { MainNav } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: MainNav[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    const { auth } = usePage().props;

    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((data, index) => (
                <div key={index} className="md:mb-4">
                    <SidebarGroupLabel key={index}>
                        {data.label}
                    </SidebarGroupLabel>
                    {data.items?.length &&
                        data.items
                            .filter(
                                (item) =>
                                    !(
                                        auth.role === 'employee' &&
                                        item.title === 'All Balances'
                                    ),
                            )
                            .map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl(item.href)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.href} cacheFor={0}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                </div>
            ))}
        </SidebarGroup>
    );
}
