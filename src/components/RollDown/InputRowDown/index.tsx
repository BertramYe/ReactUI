import Style from './index.module.css'
import Selecter, { type TSelecter } from '../../Selecter'
import { ClassName } from '../../BasicalTools'
import Input, { type TInput } from '../../Input'
type TInputRowDown<T extends React.ReactNode> = Omit<TInput, 'containerProps'> & Omit<TSelecter<T>,'containerProps'> & {
    includeRowDownIcon?:boolean,
    inputContainerProps?:TInput['containerProps'],
    selecterContainerProps?:TSelecter<T>['containerProps']
}

const InputRowDown = <T extends React.ReactNode,>({ className: InputClassName, optionList, labelProps, children: InputChidren,
    onSelected, onUpdateSelectedList, deduplicationSelectedList = true,
    selectedMode = 'mutiple', selecterContainerProps,inputContainerProps, optionProps, checkBoxProps, optionContainerClassName,
    includeRowDownIcon=false,
    ...inputProps
}: TInputRowDown<T>) => {
    return (
        <div className={ClassName(Style.rollDownSelecterContainer,includeRowDownIcon ? Style.rowdownIcon:undefined)}>
            <Input 
                className={ClassName(Style.rollDownInput, InputClassName)}
                labelProps={{
                    ...labelProps,
                    className: ClassName(Style.inputWarning,labelProps?.className)
                }}
                containerProps={inputContainerProps}
                {...inputProps}
            >
                {InputChidren}
            </Input>
            <Selecter
                selectedMode={selectedMode}
                optionList={optionList}
                onSelected={onSelected}
                onUpdateSelectedList={onUpdateSelectedList}
                deduplicationSelectedList={deduplicationSelectedList}
                containerProps={{
                    ...selecterContainerProps,
                    className: ClassName(Style.rollDownOptions, selecterContainerProps?.className)
                }}
                optionProps={{
                    ...optionProps,
                    className: ClassName(Style.option, optionProps?.className)
                }}
                checkBoxProps={checkBoxProps}
                optionContainerClassName={optionContainerClassName}
            >
            </Selecter>
        </div>
    )
}

export default InputRowDown



export {
    type TInputRowDown
}