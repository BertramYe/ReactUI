import Loading from '../Loading'
import Style from './index.module.css'
import loadingGif from '../../assets/uploading.gif'
import { ClassName } from '../BasicalTools'

type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    enableLoadingIcon?:boolean,
    isLoadingClassName?:React.ButtonHTMLAttributes<HTMLButtonElement>['className'],
    loadingIcon?:React.ImgHTMLAttributes<HTMLImageElement>['src']
}

const Button = ({enableLoadingIcon=false,className,loadingIcon,disabled=false,children,type='button',isLoadingClassName,...rest}:TButton) => {
    return (
        <button type={type} disabled={disabled} 
            className={ClassName(Style.choooseButton,className,
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                enableLoadingIcon && !disabled?`${Style.choooseButtonActive} ${isLoadingClassName}`:undefined)}
            {...rest}>
            { enableLoadingIcon ? (disabled ? <Loading loadingGif={loadingIcon ?? loadingGif} /> : children ) : children }
        </button>
    )
}

export default Button


export {
    type TButton
}