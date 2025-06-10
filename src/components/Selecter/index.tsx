/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef } from 'react'
import Style from './index.module.css'
import { ClassName,GenerateUnitKey } from '../BasicalTools'
import Input, { type TInput } from '../Input'


type TCheckBoxProps = Omit<TInput,  'labelPosition' | 'children' | 'labelProps' | 'containerProps'>
type TOptionProps = NonNullable<TInput['labelProps']>
type TSelecterTitleProps = React.HTMLAttributes<HTMLLegendElement>
type TSelecter<T extends TInput['children']> = {
    optionList: T[],
    onSelected?: (option: T, index: number, selected: boolean) => void,
    onUpdateSelectedList?: (staus: React.SetStateAction<T[]>) => void,
    deduplicationSelectedList?: boolean,
    selectedMode?: 'Single' | 'mutiple',
    containerProps?: React.HTMLAttributes<HTMLFieldSetElement>,
    optionProps?: Omit<TOptionProps, 'children' | 'htmlFor'>,
    checkBoxProps?: TCheckBoxProps,
    optionContainerClassName?: NonNullable<TInput['containerProps']>['className'],
    optionLabelPosition?: TInput['labelPosition'],
    selecter_unit_key?:string,
    selecterTitleProps?:Omit<TSelecterTitleProps, 'children'>
    children?:TSelecterTitleProps['children']
}


const Selecter = <T extends TInput['children'],>({ onSelected, onUpdateSelectedList, deduplicationSelectedList = true,
    optionList, selectedMode = 'Single', containerProps, optionProps, checkBoxProps, optionContainerClassName,
    optionLabelPosition = 'behind',
    children,selecter_unit_key,selecterTitleProps
}: TSelecter<T>) => {
    const {onChange: checkBoxOnChange,className: checkBoxClassName,type:checkBoxType,...checkBoxPropsRest } = checkBoxProps ?? {}
    const selecter_key = useRef(`${checkBoxType}_${selecter_unit_key ?? GenerateUnitKey('time')}_`)
    const operatedInputRef = useRef<HTMLInputElement[]>([])
    //  由于 useMemo 比 useEffect 执行得早，而且页面也并未加载完成，所以无法获取对应的 checked_input 对象，所以不适合使用 useMemo 来进行操作
    // useEffect 的执行是在当前组件加载完成后所触发对应的 trigger
    useEffect(()=> {
        operatedInputRef.current = []
        if(selectedMode == 'Single'){
            for(let i = 0 ; i < optionList.length ; i ++){
                const checked_input = document.querySelector(`input#${selecter_key.current}${i}`) 
                if(checked_input ){
                    operatedInputRef.current.push(checked_input as HTMLInputElement)
                }
            }
        }
        return ()=> {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedMode,selecter_key.current])


    const TriggerOption = useCallback((e: React.ChangeEvent<HTMLInputElement>, option: T, index: number) => {
        const selected = selectedMode == 'Single' ? true : e.currentTarget.checked
        if (checkBoxOnChange) {
            checkBoxOnChange(e)
        }
        if (onSelected) {
            onSelected(option, index, selected)
        }
        if (onUpdateSelectedList && selectedMode == 'mutiple') {
            onUpdateSelectedList((pre:any) => {
                if (selected) {
                    const cached = [...pre]
                    if (deduplicationSelectedList) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return cached.includes(option) ? cached : [...cached, option]
                    } else {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return [...pre, option]
                    }
                } else {
                    if (deduplicationSelectedList) { // remove all duplicated 
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
                        return pre.filter((item:T) => item !== option)
                    } else { // remove the first one duplcated
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        const cached_index = pre.indexOf(option)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
                        return cached_index > 0 ? pre.splice(cached_index, 1) : pre
                    }
                }
            })
        }
       
        if(selectedMode == 'Single' && (checkBoxType ?? 'checkbox') == 'checkbox'){
            operatedInputRef.current.map((input_elm,input_elm_index)=>{
                if(input_elm_index !== index && input_elm.checked){
                    input_elm.checked = false
                }
                if(input_elm_index == index && !input_elm.checked){
                    input_elm.checked = true
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMode,checkBoxOnChange,onUpdateSelectedList,onSelected])

    return (
        <fieldset {...containerProps}  className={ClassName(Style.selecterContainer, containerProps?.className)}>
            {
                children &&
                <legend {...selecterTitleProps}  className={ClassName(Style.seleterTitle,selecterTitleProps?.className)}  >{children}</legend>
            }
            <div className={Style.optionConatiner}>
                {
                    optionList.map((option, index) =>
                    <Input 
                        key={index}
                    {
                    ...checkBoxPropsRest
                    }
                    type={checkBoxType ?? 'checkbox'} 
                    name={(selectedMode == 'Single' && checkBoxType == 'radio') ? (checkBoxPropsRest.name ?? `${checkBoxType}_${selecter_key.current}` ):checkBoxPropsRest.name}
                    labelPosition={optionLabelPosition} id={`${selecter_key.current}${index}`}
                    className={ClassName(Style.optionCheckBox, checkBoxProps?.className)}
                    onChange={(e) => TriggerOption(e, option, index)}
                    labelProps={optionProps}
                    containerProps={{
                        className: ClassName(Style.selecter, optionContainerClassName)
                    }}
                >
                    {option ?? ``}
                </Input>)
                }
            </div>
        </fieldset >
    )

}


export default Selecter



export {
    type TSelecter
}