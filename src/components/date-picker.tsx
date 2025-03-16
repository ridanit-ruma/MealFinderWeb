import { useState } from "react";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";

export default function DatePicker(props: { className: string, onChange: (date: Date | null) => void, defaultValue?: Date, disabled?: (date: Date) => boolean }) {
    const [date, setDate] = useState<Date | null>(props.defaultValue ?? null)
    const [open, setOpen] = useState(false)

    return (
        <div className={props.className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                        }) : <span>날짜를 고르세요</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-10">
                    <Card className='z-10 mt-2 p-2'>
                        <Calendar
                            mode='single'
                            selected={date ?? undefined}
                            onSelect={(date) => {
                                setDate(date ?? null)
                                props.onChange(date ?? null)
                                setOpen(false)
                            }}
                            disabled={props.disabled}
                            initialFocus
                        />
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    )
}