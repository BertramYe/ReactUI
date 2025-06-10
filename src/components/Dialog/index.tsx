

import { useCallback, useRef } from 'react'
import Style from './index.module.css'
import { ClassName } from '../BasicalTools'


type TDialog =  React.DialogHTMLAttributes<HTMLDialogElement> & {
    ref?:React.RefObject<HTMLDialogElement | null>,
    dialogTitle?:React.HTMLAttributes<HTMLHeadingElement>['children'],
    dialogTitleClassName?:React.HTMLAttributes<HTMLHeadingElement>['className'],
    showDialog?:boolean
}

const Dialog = ({className,ref,children,dialogTitle,dialogTitleClassName,showDialog=false,...rest}:TDialog) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref =  ref ?? useRef<HTMLDialogElement>(null)
    useCallback(()=> {
        if(showDialog){
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ref?.current?.showModal()
        }else{
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ref?.current?.close()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showDialog])
    return (
        <dialog ref={ref} className={ClassName(Style.dialog,className)} {...rest}>
            {
                dialogTitle &&
                <h1 className={ClassName(Style.title,dialogTitleClassName)}>{dialogTitle}</h1>
            }
            <div className={Style.dialogContainer}>
                {children}
            </div>
        </dialog>
    )

}


export {
    type TDialog
}




export default Dialog