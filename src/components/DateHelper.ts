// 获取某一天是星期几，并且可以指定 星期的显示模式
const GetWeekDay = (date?:string | number | Date, weekContentList?:string[] & {length:7}) => {
    const toFormatDate = date? new Date(date.toString()) : new Date()
    const week_math_range =  weekContentList ?? ['周日','周一','周二','周三','周四','周五','周六']
    const week_index = toFormatDate.getDay()
    return week_math_range[week_index]
}

const GetMonthFirstDay = (date?:string | number | Date) => {
    const toFormatDate = date? new Date(date.toString()) : new Date()
    const current_year =  toFormatDate.getFullYear();
    const current_month =  toFormatDate.getMonth();
    const first_day =  new Date(current_year, current_month, 1);
    return first_day
}

const GetMonthLastDay = (date?:string | number | Date) => {
    const toFormatDate = date? new Date(date.toString()) : new Date()
    const current_year =  toFormatDate.getFullYear();
    const current_month =  toFormatDate.getMonth();
    const last_day =  new Date(current_year, current_month + 1, 0);
    return last_day
}

/** 
 * current_time : current date
 * outPutTimeLength :  format date length, default is 2
*/
const AppendZeroIntoTime = (current_time:number | string, outPutTimeLength:number=2) => {
    const current_time_string = current_time.toLocaleString()
    if(current_time_string.length >= outPutTimeLength){
        return current_time_string
    }else{
        const to_add_zero_number =  outPutTimeLength - current_time_string.length        
        return `${'0'.repeat(to_add_zero_number)}${current_time_string}`
    }
}


/** 
 * Get current time of the format,here are below the details 
 * 
 * mm: month 
 * 
 * dd : day
 * 
 * y2 : years of two chars,like current date is 2024, you will get 24
 * 
 * y4 : full years,like 2024
 * 
 * SS: secound of now
 * 
 * HH: Hours of now
 * 
 * MM: Minutes of now
 * 
 * MS: Milliseconds of now
 * 
 * DS: default Milliseconds from  1970 /1 / 1  00:00:00 (UTC)  to now
 * 
 * DT: the value of the new Date(Date.now()), means Default current Time
 * 
 * for example:
 * mm-dd-y4 HH-MM-SS  ----> 10-21-2024 13-13-50
*/
const GetOrFormateTime = (formt:string,toFormatDate?:string | number | Date) => {
    const date = toFormatDate? new Date(toFormatDate.toString()) : new Date()
    const formatMap = {
        mm: AppendZeroIntoTime(date.getMonth() + 1),
        dd: AppendZeroIntoTime(date.getDate()),
        y2: date.getFullYear().toString().slice(-2),
        y4: date.getFullYear(),
        SS:AppendZeroIntoTime(date.getSeconds()),
        HH:AppendZeroIntoTime(date.getHours()),
        MM:AppendZeroIntoTime(date.getMinutes()),
        MS:AppendZeroIntoTime(date.getMilliseconds(),3),
        DS:Date.now(),
        DT:new Date(Date.now())
    };
    for(const key in formatMap){
        const value = formatMap[key as keyof typeof formatMap].toString()
        formt = formt.replace(key,value)
    }
    return formt
} 



export {
    GetWeekDay,
    GetMonthFirstDay,
    GetMonthLastDay,
    GetOrFormateTime
}