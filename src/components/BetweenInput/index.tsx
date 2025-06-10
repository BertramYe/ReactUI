
import SelectRowDown,{type TSelectRowDown} from '../RollDown/SelectRowDown'
import Input, {type TInput} from '../Input'
import Style from './index.module.css'
import { ClassName } from '../BasicalTools'


type TBetweenInputType = 'Input' | 'Select'

// 公共部分
type TBaseProps = {
  titleProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  children?: React.ReactNode
}

// 定义 Discriminated Union
type TMinInput<MIN extends React.ReactNode> =  { minInputType?: 'Input'; minInputProps?: TInput } 
                                            | { minInputType?: 'Select'; minInputProps?: TSelectRowDown<MIN> }

type TMaxInput<MAX extends React.ReactNode> = { maxInputType?: 'Input'; maxInputProps?: TInput } 
                                            | { maxInputType?: 'Select'; maxInputProps?: TSelectRowDown<MAX> }

// 最终组合类型
type TBetweenInput<MIN extends React.ReactNode, MAX extends React.ReactNode> = TBaseProps & TMinInput<MIN> & TMaxInput<MAX>

const BetweenInput = <MIN extends React.ReactNode,MAX extends React.ReactNode>({children,
    minInputType,maxInputType,
    minInputProps,maxInputProps,
    titleProps,containerProps}:TBetweenInput<MIN,MAX>) => {
 
    return (
        <div {...containerProps} className={ClassName(Style.container,containerProps?.className)}>
            <div {...titleProps} className={ClassName(Style.titleContainer,titleProps?.className)}>{children}</div>
            <div className={Style.inputcontainer}>
                {
                    minInputType == 'Select'?
                    <SelectRowDown
                       {
                        ...minInputProps as TSelectRowDown<MIN>
                       }
                    >   
                    </SelectRowDown>
                    :
                    <Input
                        {
                        ...minInputProps as TInput
                        }
                    >
                    </Input> 
                }
                <div className={Style.verticalLine}>{`-`}</div>
                {
                    maxInputType == 'Select'?
                    <SelectRowDown
                       {
                        ...maxInputProps as TSelectRowDown<MAX>
                       }
                    ></SelectRowDown>
                    :
                    <Input
                       {...maxInputProps as TInput }
                    ></Input> 
                }
            </div>
        </div>
    )
}

export default BetweenInput



export {
    type TBetweenInput,
    type TBetweenInputType,
    type TInput,
    type TSelectRowDown
}