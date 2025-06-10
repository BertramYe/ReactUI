import React from 'react'
import Style from './index.module.css'
import { ClassName } from '../BasicalTools'



type TFoldDetail = {
    summaryTitle?:React.HTMLAttributes<HTMLElement>['children'],
    summaryTitleClassName?:React.HTMLAttributes<HTMLElement>['className']
    containerClassName?:React.DetailsHTMLAttributes<HTMLDetailsElement>['className']
    children?:React.HTMLAttributes<HTMLDivElement>['children'],
    childrenClassName?:React.HTMLAttributes<HTMLDivElement>['className'],
    isOpen?:React.DetailsHTMLAttributes<HTMLDetailsElement>['open']
}

const FoldDetail = ({children,summaryTitle,isOpen=false,summaryTitleClassName,childrenClassName,containerClassName}:TFoldDetail) => {


    return (
        <details open={isOpen} className={ClassName(Style.details,containerClassName)}>
            <summary className={ClassName(Style.summary,summaryTitleClassName)}>{summaryTitle}</summary>
            <div className={ClassName(Style.FoldDetailChildren,childrenClassName)} >
                {children}
            </div>
        </details>
    )

}

export default FoldDetail


export {
    type TFoldDetail
}