import Styles from './index.module.css'
import { ClassName } from '../BasicalTools'




type TLoading = {
    loadingTips?:string,
    loadingGif:React.ImgHTMLAttributes<HTMLImageElement>['src'],
    imageCSS?:React.HTMLAttributes<HTMLDivElement>['className']
    
}


const Loading = ({loadingTips,loadingGif,imageCSS}:TLoading) => {
    
    return (
        <div className={Styles.loadingContainer}>
            {
                loadingTips &&
                <div className={Styles.tips}>{loadingTips}</div>
            }
            <div className={Styles.loadingImageContainer}>
                <img  className={ClassName(Styles.loadingImage,imageCSS)} src={loadingGif} alt="" />
            </div>
        </div>
    )
}

export default Loading


export {
    type TLoading
}