import { BellIcon, CopyIcon, XIcon } from 'lucide-react';
import DatePicker from './components/date-picker';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { useEffect, useState } from 'react';
import { fetchMeal } from './services/meal.service';
import { Skeleton } from './components/ui/skeleton';
import { motion } from 'motion/react';
import { subscribe } from './lib/notification';

export interface MealData {
    date: string;
    likes: number;
    dislikes: number;
    data: {
        dish: string;
        allergies: string;
    }[];
}

export default function MealCard(props: {
    time: string;
    closestDate: Date;
    date: Date;
    setDate: (date: Date) => void;
}) {
    const [data, setData] = useState<MealData | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // YYYYMMDD Asia/Seoul
        if (!props.date) return;
        const formattedDate = props.date
            .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/(\.| )/g, '');
        setData(null);
        setError(false);
        fetchMeal(formattedDate)
            .then((data) => {
                const d = data[props.time];
                setData(d);
            })
            .catch(() => setError(true));
    }, [props.date, props.time]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Card className="w-full max-w-[400px]">
                <CardHeader className="text-left">
                    <div className="flex gap-2 justify-between">
                        <div>
                            <CardTitle>
                                {data ? (
                                    props.date.toLocaleDateString('ko-KR', {
                                        weekday: 'long',
                                    }) + ' 급식 정보'
                                ) : (
                                    <Skeleton className="w-[80%] h-6" />
                                )}
                            </CardTitle>
                            <CardDescription className="mt-2">
                                {data ? (
                                    props.date.toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                ) : (
                                    <Skeleton className="w-[50%] h-5" />
                                )}
                            </CardDescription>
                        </div>
                    </div>
                    <DatePicker
                        className="mt-2 w-full"
                        onChange={(d) => props.setDate(d ?? new Date())}
                        defaultValue={props.date}
                        disabled={
                            // weekend disable
                            (d) => d.getDay() === 0 || d.getDay() === 6
                        }
                    />
                </CardHeader>
                <CardContent>
                    {error || !data ? (
                        <div className="flex flex-col items-center gap-3 mt-10 mb-10">
                            <XIcon className="h-10 w-10 text-muted-foreground" />
                            <div className="text-center text-sm text-muted-foreground">급식 데이터가 없습니다.</div>
                        </div>
                    ) : (
                        <motion.div animate={{ opacity: data ? 1 : 0 }}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">메뉴</TableHead>
                                        <TableHead className="text-center">알레르기 정보</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data.map((meal) => (
                                        <TableRow key={meal.dish}>
                                            <TableCell align="left">{meal.dish}</TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        {meal.allergies ? (
                                                            <Button
                                                                variant="ghost"
                                                                className="h-[23px] text-xs cursor-pointer text-muted-foreground"
                                                            >
                                                                보이기
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                disabled
                                                                variant="ghost"
                                                                className="h-[23px] text-xs cursor-pointer text-muted-foreground"
                                                            >
                                                                없음
                                                            </Button>
                                                        )}
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <p>{meal.allergies}</p>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </motion.div>
                    )}
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button className="w-full flex-1 h-[37px]" onClick={() => subscribe()}>
                        <BellIcon className="mr-2 h-4 w-4" />
                        <span>알림 받기</span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full flex-1 h-[37px]"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                [props.date.getDate().toString(), data?.data.map((d) => d.dish).join('\n')].join(
                                    '\n',
                                ) || '',
                            );
                        }}
                    >
                        <CopyIcon className="mr-2 h-4 w-4" />
                        <span>복사</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
