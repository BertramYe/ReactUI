/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useMemo, useRef, useState } from 'react'
import Style from './index.module.css'
import { PointerMover,type TPoint } from '../../Actions'
import { ClassName } from '../../BasicalTools'

interface IOnChanged {
    (value:number):void
}

type TDoubleSliderBarType = 'Min' | 'Max'
type TSliderBar = {
    width?:number,
    height?:number,
    color?:React.CSSProperties['color'],
    backgroundColor?:React.CSSProperties['backgroundColor'],
    boderRadius?:React.CSSProperties['borderRadius'],
    defaultMinValue?:number,
    defaultMaxValue?:number,
    OnMinChanged?:IOnChanged
    OnMaxChanged?:IOnChanged
}

type TDoubleSliderBar = React.HTMLAttributes<HTMLDivElement> & {
    direction?:'row' | 'column',
    sliderBarProps?:TSliderBar,
    trackProps?:{
        step?:number,
        min?:number,
        max?:number,
        width?:number,
        height?:number,
        boderRadius?:React.CSSProperties['borderRadius'],
        selectedColor?:React.CSSProperties['color'],
        unSelectedColor?:React.CSSProperties['color'],
    }
    titleClassName?:React.HTMLAttributes<HTMLDivElement>['className']
}

const DoubleSliderBar = ({trackProps,sliderBarProps,direction='row',children,titleClassName,className,...restProps}:TDoubleSliderBar) => {
    const minRef = useRef<HTMLSpanElement>(null)
    const maxRef = useRef<HTMLSpanElement>(null)
    // 相对 container 的有效的移动距离，在这个值可能是 横坐标，也有可能是纵坐标
    const [minPosition,setMinPosition] = useState(sliderBarProps?.defaultMinValue ?? 30)
    const [maxPosition,setMaxPosition] = useState(sliderBarProps?.defaultMaxValue ?? 50)
    const {SliderBarSize,ContainerSize,ActualBewtweenValue} = useMemo(()=> {
        const ContainerSize = direction == 'row' ? {
            w: trackProps?.width ?? 320,
            h: trackProps?.height ?? 8
        }:{
            w: trackProps?.width ?? 8,
            h: trackProps?.height ?? 320
        }
        const SliderBarSize = {
            w:sliderBarProps?.width ?? 16,
            h:sliderBarProps?.height ?? 16
        }
        const ActualBewtweenValue = {
            min: trackProps?.min ?? 0,
            max: trackProps?.max ?? 100,
            step: trackProps?.step ?? 1,
            defaultMin: sliderBarProps?.defaultMinValue ?? 30,
            defaultMax: sliderBarProps?.defaultMaxValue ?? 50
        }
        if(ActualBewtweenValue.min > ActualBewtweenValue.max){
            throw new Error(`trackProps.min can be greater than trackProps.max !`)
        }

        if(ActualBewtweenValue.defaultMin > ActualBewtweenValue.defaultMax){
            throw new Error(`sliderBarProps.defaultMinValue can be greater than sliderBarProps.defaultMaxValue ! `)
        }

        if(ActualBewtweenValue.defaultMin < ActualBewtweenValue.min){
            throw new Error(`sliderBarProps.defaultMinValue can be less than trackProps.min !`)
        }
        if(ActualBewtweenValue.defaultMax > ActualBewtweenValue.max){
            throw new Error(`sliderBarProps.defaultMaxValue can be greater than trackProps.max !`)
        }
        if(ActualBewtweenValue.step / 1 !== ActualBewtweenValue.step  || ActualBewtweenValue.step < 1){
            throw new Error(`trackProps?.step must be an positive integer !`)
        }

        return {
            SliderBarSize,
            ContainerSize,
            ActualBewtweenValue
        }
    },[direction,trackProps,sliderBarProps])

    const GetSiliderBarMoveArea = (barType:TDoubleSliderBarType)=> {
        if(barType=='Min'){
            return direction == 'row' ?
            {
                l:-(SliderBarSize.w/2),
                r: maxPosition - (SliderBarSize.w ) / 2,
                t:-(SliderBarSize.h/2),
                b: ContainerSize.h + (SliderBarSize.h/2)
            }
            : {
                l:-( SliderBarSize.w / 2 ),
                r: ContainerSize.w + ( SliderBarSize.w ) / 2,
                t:-( SliderBarSize.h / 2 ),
                b: maxPosition - (SliderBarSize.h / 2)
            }
        }else{
            return direction == 'row' ? {
                l: minPosition - ( SliderBarSize.w ) / 2,
                r: ContainerSize.w - ( SliderBarSize.w / 2),
                t: -(SliderBarSize.h / 2),
                b: ContainerSize.h + (SliderBarSize.h/2)
            }:{
                l: -(SliderBarSize.w / 2),
                r: ContainerSize.w + (SliderBarSize.w ) / 2,
                t: minPosition - (SliderBarSize.h) / 2,
                b: ContainerSize.h-(SliderBarSize.h/2)
            }
        }
    }

    const GetMoverPosition = (barType:TDoubleSliderBarType,position:TPoint) => {
        let value = direction == 'row' ?  position.x + SliderBarSize.w / 2 :position.y + SliderBarSize.h/2
        if(value <=0 ){
            value = 0
        }else{
            if(direction == 'row' && value >= ContainerSize.w){
                value = ContainerSize.w
            }
            if(direction == 'column' && value >= ContainerSize.h){
                value = ContainerSize.h
            }
        }
        const actualValue = Math.floor((value /( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * (ActualBewtweenValue.max - ActualBewtweenValue.min) / ActualBewtweenValue.step)
        if(barType == 'Min'){
            setMinPosition(value);
            if(sliderBarProps && sliderBarProps.OnMinChanged ){
                sliderBarProps.OnMinChanged(actualValue)
            }
        }else{
            setMaxPosition(value)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            sliderBarProps?.OnMaxChanged && sliderBarProps.OnMaxChanged(actualValue)
        }
    }


    return (
        <div {...restProps} className={ClassName(direction == 'row' ? Style.containerH:Style.containerV,className)} style={{
            '--mix-position':`${minPosition}px`,
            '--max-position':`${maxPosition}px`,
            '--slider-track-width': `${ContainerSize.w}px`,
            '--slider-track-height': `${ContainerSize.h}px`,
            '--slider-track-boder-radius': `${trackProps?.boderRadius ?? `${Math.min(ContainerSize.w,ContainerSize.h)/2}px`}`,
            '--slider-bar-width':`${SliderBarSize.w}px`,
            '--slider-bar-height': `${SliderBarSize.h}px`,
            '--slider-bar-color': `${sliderBarProps?.color ?? 'white'}`,
            '--slider-bar-border-radius': `${sliderBarProps?.boderRadius ?? `${Math.min(SliderBarSize.w,SliderBarSize.h)/2}px`}`,
            '--slider-bar-bg-color': `${sliderBarProps?.backgroundColor ?? 'black'}`,
            '--track-bg':`linear-gradient(to ${direction == 'row'? 'right' : 'bottom' }, 
                ${trackProps?.unSelectedColor ?? 'white'} 0%,                       
                ${trackProps?.unSelectedColor ?? 'white'} ${(minPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * 100}%,       
                ${trackProps?.selectedColor ??'black'} ${(minPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * 100}%,         
                ${trackProps?.selectedColor ??'black'} ${(maxPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * 100}%,         
                ${trackProps?.unSelectedColor ?? 'white'} ${(maxPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * 100}%,      
                ${trackProps?.unSelectedColor ?? 'white'}  100%                      
            )`,
        } as  React.CSSProperties}>
            <div className={ClassName(direction =='row'? Style.titleH:Style.titleV,titleClassName)}>{children}</div>
            <div className={direction == 'row'? Style.barContainerH: Style.barContainerV}>
                <span ref={minRef} 
                    min-value = {Math.floor((minPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h)) * (ActualBewtweenValue.max - ActualBewtweenValue.min) / ActualBewtweenValue.step)}
                    className={ClassName(Style.minBar,Style.minBarTip,direction == 'row' ? Style.minBarH : Style.minBarV)}
                    onPointerDown={(e)=> {
                        if(maxRef.current){
                            e.currentTarget.style.zIndex = `1`
                            maxRef.current.style.zIndex = `0`
                            PointerMover(e,
                                {
                                    fixedColumn:direction == 'row',
                                    fixedRow: direction == 'column',
                                    moveArea:GetSiliderBarMoveArea('Min'),
                                    selfSetTransformValue:true,
                                    OnGetMoverPosition:(position) => GetMoverPosition('Min',position)
                                }
                            )
                        }
                    }}
                />
                <span 
                    ref={maxRef}
                    max-value={Math.floor(((maxPosition / ( direction == 'row'? ContainerSize.w :  ContainerSize.h))) * (ActualBewtweenValue.max - ActualBewtweenValue.min) / ActualBewtweenValue.step)}
                    className={ClassName(Style.maxBar,Style.maxBarTip,direction == 'row' ? Style.maxBarH : Style.maxBarV)}
                    onPointerDown={(e)=> {
                        if(minRef.current){
                            minRef.current.style.zIndex = `0`
                            e.currentTarget.style.zIndex = `1`
                            PointerMover(e,
                                {
                                    fixedColumn:direction == 'row',
                                    fixedRow: direction == 'column',
                                    moveArea:GetSiliderBarMoveArea('Max'),
                                    selfSetTransformValue:true,
                                    OnGetMoverPosition:(position) => GetMoverPosition('Max',position)
                                }
                            )
                        }
                    }}
                />
            </div>
            <div className={direction == 'row' ? Style.unitContainerH: Style.unitContainerV}>
                <span className={direction =='row' ? Style.minUnitH : Style.minUnitV}>{ActualBewtweenValue.min}</span>
                <span className={direction =='row' ? Style.middleUnitH : Style.middleUnitV}>{(ActualBewtweenValue.min + ActualBewtweenValue.max) / 2}</span>
                <span className={direction =='row' ? Style.maxUnitH : Style.maxUnitV}>{ActualBewtweenValue.max}</span>
            </div>
        </div>
    )
}
export default DoubleSliderBar



export {
    type TDoubleSliderBarType,
    type TSliderBar,
    type TDoubleSliderBar
}