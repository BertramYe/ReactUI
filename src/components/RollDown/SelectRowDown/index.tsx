
import { useRef } from 'react'
import Style from './index.module.css'
import { ClassName, GenerateUnitKey } from '../../BasicalTools'


type TOption = React.OptionHTMLAttributes<HTMLOptionElement>
type TOptionItem<T> = [NonNullable<TOption['value']>,T]

type TSelectRowDown<T extends TOption['children']> = React.SelectHTMLAttributes<HTMLSelectElement> & {
    optionList: TOptionItem<T>[],
    optionProps?: Omit<TOption,'value' | 'children'>
    labelProps?:Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' >,
    containerClassName?:React.HTMLAttributes<HTMLDivElement>['className']
}


const SelectRowDown = <T extends TOption['children'],>({optionList,id,optionProps,labelProps,containerClassName,defaultValue,...selectProps}:TSelectRowDown<T>) => {
    const selecter_key = useRef(`input_${id ?? GenerateUnitKey('time')}`)
    return (
        <div className={ClassName(Style.container,containerClassName)}>
            <label htmlFor={selecter_key.current}  {...labelProps}></label>    
            <select id={selecter_key.current} {...selectProps} >
            {
                (defaultValue ? [[defaultValue,defaultValue],...optionList]:optionList).map((option,index)=>
                    <option {...optionProps} hidden={defaultValue? index == 0:false}  key={index} value={option[0]}>{option[1]}</option>
                )
            }
            </select>
        </div>
    )
}

export default SelectRowDown


export {
   type TSelectRowDown,
   type TOptionItem
}