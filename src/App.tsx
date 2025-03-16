import { useEffect, useState } from 'react';
import './App.css';
import { register } from './serviceWorkerRegistration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import MealCard from './components/app/meal-card';
import { getClosestDate } from './lib/date-util';

function App() {
    const [date, setDate] = useState(getClosestDate());

    useEffect(() => {
        register();
    }, []);

    return (
        <div className="flex flex-col items-center h-full w-full">
            <p className="font-medium cookie text-4xl mb-5">급식 정보</p>
            <Tabs className="w-full max-w-[400px]" defaultValue="breakfast">
                <TabsList className="w-full">
                    <TabsTrigger value="breakfast">조식</TabsTrigger>
                    <TabsTrigger value="lunch">중식</TabsTrigger>
                    <TabsTrigger value="dinner">석식</TabsTrigger>
                </TabsList>
                <TabsContent value="breakfast">
                    <MealCard time="breakfast" date={date} setDate={setDate} />
                </TabsContent>
                <TabsContent value="lunch">
                    <MealCard time="lunch" date={date} setDate={setDate} />
                </TabsContent>
                <TabsContent value="dinner">
                    <MealCard time="dinner" date={date} setDate={setDate} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default App;
