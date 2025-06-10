type CSSModuleClasses = {
    [key:string]: string
}

const ClassName = (...classNameList:( CSSModuleClasses | string | undefined)[]) => {
    // filter(Boolean) 用来从数组中移除所有 "假值"（falsy values），包括 undefined、null、false、0、NaN 和空字符串 ""。
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const prefilterClassName = classNameList.filter(Boolean).join(" ")
    // const combined_classname = classNameList.filter(Boolean).reverse().join(" ");
    return ` ${prefilterClassName} `;
}

const UpCaseFirstChar = (str:string) => {
    if(str.trim().length == 0){
        return str
    }else{
        const clear_str_list = str.trim().replace('_'," ").split(" ").map((item)=> item[0].toUpperCase() + item.slice(1) )
        return clear_str_list.join(" ")
    }
}

const GenerateUnitKey = (type?:'time') => {
    // performance.now() 性能和精确度比 Date.now() 要好
    if(type == 'time'){
        return performance.now().toString().replace('.','')
    }else{
        return performance.now().toString().replace('.','')
    }
}


const NormalObjectTypeList = ['array', 'map', 'set', 'date', 'regexp', 'error', 'object'] as const
type TNormalObjectTypeList = typeof NormalObjectTypeList[number]
// 获取js中常用的对象的一些类型
const GetObjectType = (object:any) => {
    const Type = typeof object
    if(Type !== 'object'){
        return Type
    }else{
        if(object == null){ //  不要提到最上面 ，可能会和 undefined 起冲突
            return 'null'
        }else if (Array.isArray(object)){
            return 'array'
        }
        else {
            const rawTag = Object.prototype.toString.call(object); // e.g. "[object Map]"
            const builtinType = rawTag.slice(8, -1).toLowerCase();
            if(NormalObjectTypeList.includes(builtinType as TNormalObjectTypeList)){
                return builtinType as TNormalObjectTypeList
            }else{
                // Otherwise, return class name (for user-defined class instances)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if(object.constructor && typeof object.constructor === 'function'){
                    // 以下我将其全部归纳为一个 class 类型， 如果你想获取具体的 class 类名，可以使用其自带的以下属性获取即可
                    // object.constructor.name.toLowerCase() 获取类的详细类名
                    return 'class' 
                }else{
                    return 'object'
                }
            }
        }
    }
}



export {
    ClassName,
    UpCaseFirstChar,
    GenerateUnitKey,
    GetObjectType
}