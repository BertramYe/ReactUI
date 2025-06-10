//  some basical funcs
export {
    GetElementTranslate,
    PointerMover,
    type TPointMoveArea,
    type TPoint
} from './components/Actions'

export {
    ClassName,
    UpCaseFirstChar,
    GenerateUnitKey,
    GetObjectType
} from './components/BasicalTools'

export {
    useDebounce,
    useThrottle
} from './components/Hooks'

// the components
import BetweenInput from './components/BetweenInput'
import Button from './components/Button'
import Dialog from './components/Dialog'
import ErrorBoundary from './components/ErrorBoundary'
import FoldDetail from './components/FoldDetail'
import Input from './components/Input'
import Loading from './components/Loading'
import InputRowDown from './components/RollDown/InputRowDown'
import SearchRowDown from './components/RollDown/SearchRowDown'
import SelectRowDown from './components/RollDown/SelectRowDown'
import Selecter from './components/Selecter'
import DoubleSliderBar from './components/SliderBar/DoubleSliderBar'
import SingleSliderBar from './components/SliderBar/SingleSliderBar'

// types
export {
    type TBetweenInput,
    type TBetweenInputType,
} from './components/BetweenInput'

export {
 type TButton
} from './components/Button'
export  {
    type TDialog
} from './components/Dialog'
export {
    type IFallBack
} from './components/ErrorBoundary'
export {
    type TFoldDetail
} from './components/FoldDetail'


export {
    type TInput
} from './components/Input'

export {
    type TLoading
} from './components/Loading'

export {
    type TInputRowDown
} from './components/RollDown/InputRowDown'

export{
    type ISearchRowDown
} from './components/RollDown/SearchRowDown'

export {
   type TSelectRowDown,
   type TOptionItem
} from './components/RollDown/SelectRowDown'


export {
    type TSelecter
} from './components/Selecter'


export {
    type TDoubleSliderBarType,
    type TSliderBar,
    type TDoubleSliderBar
} from './components/SliderBar/DoubleSliderBar'

export {
    type TSingleSliderBar
} from './components/SliderBar/SingleSliderBar'


export {
    BetweenInput,
    Button,
    Dialog,
    ErrorBoundary,
    FoldDetail,
    Input,
    Loading,
    InputRowDown,
    SearchRowDown,
    SelectRowDown,
    Selecter,
    DoubleSliderBar,
    SingleSliderBar
}