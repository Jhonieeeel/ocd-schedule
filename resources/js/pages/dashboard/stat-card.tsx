import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import CountUp from './CountUp';

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
                <h1 className="font-akira text-7xl font-semibold">
                    {/* <CountUp start={0} end={data.total.toString()} /> */}
                    <CountUp
                        from={0}
                        to={data.total}
                        separator=","
                        direction="up"
                        duration={0.5}
                        className="count-up-text"
                        delay={0}
                    />
                </h1>
            </CardContent>
            <CardFooter className="flex justify-center">
                <small>{data.title}</small>
            </CardFooter>
        </Card>
    );
}
