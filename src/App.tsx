import { useEffect, useState } from 'react'
import './App.css'
import { register } from './serviceWorkerRegistration'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import MealCard from './MealCard'

function App() {
  // closest next weekday
  const closestDate = (() => {
    // today is asia/seoul
    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const day = today.getDay();
    if (day === 0) {
      // Sunday, set to next Monday
      today.setDate(today.getDate() + 1);
    } else if (day === 6) {
      // Saturday, set to next Monday
      today.setDate(today.getDate() + 2);
    }
    return today;
  })();

  const [date, setDate] = useState(closestDate)

  useEffect(() => {
    register()
  }, [])

  return (
    <div className="flex flex-col items-center h-full w-full">
      <p className="font-medium cookie text-4xl mb-5">급식 정보</p>
      <Tabs className="w-full max-w-[400px]" defaultValue="breakfast">
        <TabsList className='w-full'>
          <TabsTrigger value="breakfast">조식</TabsTrigger>
          <TabsTrigger value="lunch">중식</TabsTrigger>
          <TabsTrigger value="dinner">석식</TabsTrigger>
        </TabsList>
        <TabsContent value="breakfast">
          <MealCard time='breakfast' closestDate={closestDate} date={date} setDate={setDate} />
        </TabsContent>
        <TabsContent value="lunch">
          <MealCard time='lunch' closestDate={closestDate} date={date} setDate={setDate} />
        </TabsContent>
        <TabsContent value="dinner">
          <MealCard time='dinner' closestDate={closestDate} date={date} setDate={setDate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
