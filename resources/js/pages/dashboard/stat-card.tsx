import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@headlessui/react';
import { LucideIcon } from 'lucide-react';

type Card = {
    title: string;
    total: number;
    icon: LucideIcon | null;
    css: string;
};

export default function StatCard({ data }: { data: Card }) {
    return (
        <Card size="md" className="mx-auto w-full max-w-sm shadow">
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-start">
                        {data.icon && (
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${data.css}`}
                            >
                                <data.icon />
                            </div>
                        )}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <h1 className="text-2xl font-semibold">{data.total}</h1>
            </CardContent>
            <CardFooter className="flex justify-center">
                <small>{data.title}</small>
            </CardFooter>
        </Card>
    );
}
