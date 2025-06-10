/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import Style from './index.module.css';
import { ClassName, GenerateUnitKey } from "../../BasicalTools";

type TSingleSliderBar = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'defaultValue' | 'value' | 'containerProps'> & {
    direction?: 'row' | 'column',
    selectedValue?:number,
    selectedColor?:React.CSSProperties['color'],
    unSelectedColor?:React.CSSProperties['color'],
    sliderBarProps?:{
        width?:number,
        height?:number,
        color?:React.CSSProperties['color'],
        boderRadius?:React.CSSProperties['borderRadius']
    },
    containerProps?:React.HTMLAttributes<HTMLDivElement>
    labelProps?:Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'children'>,
    children?:React.LabelHTMLAttributes<HTMLLabelElement>['children'],
}

const SingleSliderBar = ({id,selectedValue=50,labelProps,
    selectedColor,unSelectedColor,direction='row',
    sliderBarProps,containerProps,className,min=0,max=100,onChange,children,...resetProps}:TSingleSliderBar) => {
    const [selected,setSelected] = useState<number>(selectedValue < parseFloat(`${min}`) ? 0 : selectedValue)
    const selecter_key = useRef(`sliderBar_${id ?? GenerateUnitKey('time')}`)
    return (
        <div {...containerProps} className={ClassName(Style.container,containerProps?.className)}
                style={{
                    '--selected': `${selected / (parseFloat(`${max}`) - parseFloat(`${min}`)) * 100}%`,
                    '--selected-color':selectedColor ?? 'black',
                    '--unSelected-color':unSelectedColor ?? 'white',
                    '--sliderBar-color':sliderBarProps ?? 'black',
                    '--sliderBar-width':sliderBarProps?.width ?? '15px',
                    '--sliderBar-height':sliderBarProps?.height ?? '15px',
                    '--sliderBar-border-radius': sliderBarProps?.boderRadius ?? '50%' 
                } as React.CSSProperties}
            >
            <label htmlFor={selecter_key.current} {...labelProps} >
                {children}
            </label>
            <div className={Style.inputContainer}>
                <input
                    {...resetProps}
                    id={selecter_key.current}
                    defaultValue={selected}
                    className={ClassName(Style.sliderInput,className)} type='range'  onChange={(e)=> {
                        setSelected(parseFloat(e.currentTarget.value))
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        onChange && onChange(e)
                    }}
                >
                </input>
                <div className={Style.sliderBarValue}>{selected}</div>
                <div className={Style.UnitContainer} >
                    <span className={Style.min}>{min}</span>
                   
                    <span className={Style.middle}>{(parseFloat(`${min}`) + parseFloat(`${max}`)) / 2}</span>
                    <span className={Style.max}>{max}</span>
                </div>
            </div>
        </div>
    )
}


export default SingleSliderBar


export {
    type TSingleSliderBar
}