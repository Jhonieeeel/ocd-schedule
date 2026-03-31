import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { index } from '@/routes/balance';
import { Head } from '@inertiajs/react';

export default function Leave() {
    return (
        <>
            <Head title="Leave" />
            <div></div>
        </>
    );
}

Leave.layout = {
    breadcrumbs: [
        {
            title: 'Leave',
            href: index(),
        },
    ],
};
