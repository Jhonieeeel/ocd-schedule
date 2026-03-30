import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { MainNav, NavItem } from '@/types';

export function NavMain({ items = [] }: { items: MainNav[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((data, index) => (
                <div key={index} className="md:mb-4">
                    <SidebarGroupLabel key={index}>
                        {data.label}
                    </SidebarGroupLabel>
                    {data.items?.length &&
                        data.items.map((item, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
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
