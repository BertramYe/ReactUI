import { useRef } from 'react'
import { ClassName, GenerateUnitKey } from '../BasicalTools'
import Style from './index.module.css'


type TInput = React.InputHTMLAttributes<HTMLInputElement> & {
    containerProps?:React.HTMLAttributes<HTMLDivElement>,
    labelProps?:Omit<React.LabelHTMLAttributes<HTMLLabelElement>,'children' |'htmlFor'>,
    children?:React.LabelHTMLAttributes<HTMLLabelElement>['children'],
    labelPosition?: 'front' | 'behind',
}

// 对于基础组件的设计思想在于，看谁是主组件（权重最高和功能最重要的基础标签）来进一步封装
const Input = ({className,containerProps,labelProps,children,id,labelPosition = 'front',...inputPropsRest}:TInput) => {
    const selecter_key = useRef(id ?? `input_${GenerateUnitKey('time')}`)
    const {
        className:containerClassName,
        ...containerPropsRest
    } = containerProps ?? {}
    const {
        className:labelClassName,
        ...labelPropsRest
    } = labelProps ?? {}
 
    return (
        <div className={ClassName(Style.container,containerClassName)}  {...containerPropsRest} >
            {
                labelPosition == 'front' &&
                <label htmlFor={selecter_key.current} className={ClassName(Style.label,labelClassName)}  {...labelPropsRest}  >{children}</label>
            }
            <input  id = {selecter_key.current} className={ClassName(Style.input,className)} {...inputPropsRest} />
            {
                labelPosition == 'behind' &&
                <label htmlFor={selecter_key.current} className={ClassName(Style.label,labelClassName)}  {...labelPropsRest}  >{children}</label>
            }
        </div>
    )

}

export default Input

export {
    type TInput
}

