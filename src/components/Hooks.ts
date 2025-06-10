import { useMemo, useState } from "react";


interface ICallback<T> {
    (...argrs:T[]):void | Promise<void>
}
type TThrottleOptions = {
  triggerType:'leading' | 'tailing'
}
const useThrottle = <T,>(callback: ICallback<T>, delay: number = 1000,options?:TThrottleOptions) => {
    const [lastTriggerTime,SetLastTriggerTime] = useState<number | null>(null)
    const ThrottleOptions = useMemo<TThrottleOptions>(()=> options ?? {triggerType:'leading'} ,[options])
    return (argrs:T[])=> {
      const currentTime = Date.now()
      if( lastTriggerTime == null){
        if(ThrottleOptions.triggerType == 'leading'){
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          callback(...argrs)
        }
        SetLastTriggerTime(currentTime)
      }else if(currentTime - lastTriggerTime > delay){
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        callback(...argrs)
        SetLastTriggerTime(currentTime)
      }
    }
};


const useDebounce =  <T,>(callback:ICallback<T>,delay:number= 1000) => {
    const [timeOutId,setTimeOutID] = useState<number>()
    return (...argrs:T[]) => {
        clearTimeout(timeOutId);
        const newtimeOutId = setTimeout(()=> {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            callback(...argrs)
        },delay)
        setTimeOutID(newtimeOutId)
    }
}




export {
    useDebounce,
    useThrottle
}