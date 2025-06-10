/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-expressions */

type TPoint = {
    x:number,
    y:number,
    z?:number
}

type TPointMoveArea = {
    l:number, // left
    t:number, // top
    r:number, // right
    b:number  // bottom
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const GetElementTranslate = <T extends HTMLElement>(element:T) => {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);

    // 获取 translateX 和 translateY 单位 px
    // const translateX = matrix.m41;
    // const translateY = matrix.m42;
    // const translateZ = matrix.m43; // 对应 translateZ
    // console.log(translateX,translateY,translateZ)
    return {
        x:matrix.m41,
        y:matrix.m42,
        z:matrix.m43
    }
}

type TPointerMoverAdditionalParams<T extends HTMLElement> = {
    parentNode?:T | null,
    moveArea?:TPointMoveArea,
    fixedRow?:boolean,
    fixedColumn?:boolean,
    OnGetMoverPosition?:(position:TPoint) => void,
    selfSetTransformValue?:boolean
}

const PointerMover = <C extends HTMLElement,P extends HTMLElement>(e:React.PointerEvent<C>,
    {parentNode,moveArea,fixedRow=false,fixedColumn = false,OnGetMoverPosition,selfSetTransformValue=false}:TPointerMoverAdditionalParams<P>
    ) => {
    const mover = e.currentTarget
    const container = (parentNode ?? mover.parentNode) as P
    if(container){
        const moverRect = mover.getBoundingClientRect()
        const currentTranslatePoint = GetElementTranslate(mover)
        // 以中心点为启动点，可以减少拖拽过程中的抖动
        const startPoint:TPoint = {
                        x:moverRect.x + moverRect.width / 2,
                        y:moverRect.y + moverRect.height / 2
                    }
        const containerRect = container.getBoundingClientRect()
        const moveScope = moveArea ?? {l:0,t:0,r:containerRect.width - moverRect.width,b:containerRect.height-moverRect.height}
        OnGetMoverPosition && OnGetMoverPosition(currentTranslatePoint)
        let transX = currentTranslatePoint.x
        let transY = currentTranslatePoint.y
        const PointerMoveEvent = (e:PointerEvent) => {
            const distenceX = e.clientX - startPoint.x
            const distenceY = e.clientY- startPoint.y
            transX = fixedRow ?  currentTranslatePoint.x : currentTranslatePoint.x + distenceX
            transY = fixedColumn ? currentTranslatePoint.y : currentTranslatePoint.y + distenceY 
            if(
                (fixedRow && !fixedColumn  && transY >= moveScope.t && transY <= moveScope.b) || 
                (!fixedRow && fixedColumn  && transX >= moveScope.l && transX <= moveScope.r) ||
                (!fixedRow && !fixedColumn  && transX >= moveScope.l && transX <= moveScope.r && transY >= moveScope.t && transY <= moveScope.b)
                ){
                if(!selfSetTransformValue){
                    mover.style.transform = `translateX(${transX}px)  translateY(${transY}px)`
                }
                OnGetMoverPosition && OnGetMoverPosition({x:transX,y:transY,z:0})
            }else{
                container.removeEventListener('pointermove',PointerMoveEvent)
            }
        }
        const PointerUpEvent = (_:PointerEvent) => {
            container.removeEventListener('pointermove',PointerMoveEvent)
            container.removeEventListener('pointerup',PointerUpEvent)
            OnGetMoverPosition && OnGetMoverPosition({x:transX,y:transY,z:0})
        }
        container.addEventListener('pointermove',PointerMoveEvent)
        container.addEventListener('pointerup',PointerUpEvent)
    }
}


export {
    GetElementTranslate,
    PointerMover,
    type TPointMoveArea,
    type TPoint
} 

