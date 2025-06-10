/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import  { type HTMLAttributes,Component } from 'react'


type TError = any
type TInfo = any

interface IFallBack {
  (error:TError,info:TInfo):React.ReactNode
}

// 以下自定义组件在调用时可以像像下面这样调用

// <ErrorBoundary fall_back={(err,info)=> <div>出现错误了！请稍后再试。</div>}>
//  <div> 这是详细的子组件 </div>                 
// </ErrorBoundary>



type TProps =  HTMLAttributes<HTMLElement> & {
  fall_back: IFallBack;
}

class ErrorBoundary extends Component<TProps> {
  private _fall_back: IFallBack;
  private _error?:any = null
  private _info?:any = null

  constructor(props: TProps) {
    const { fall_back } = props;
    super(props);
    this.state = { hasError: false };
    this._fall_back = fall_back;
  }

  static getDerivedStateFromError(error: any) {
    console.log('error of the ErrorBoundary when getDerivedStateFromError', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log('error of the ErrorBoundary when componentDidCatch', error, info);
    this._error = error
    this._info = info
  }

  render() {
    if ((this.state as any).hasError) {
      // Render the fallback UI when an error occurs
      
      return this._fall_back(this._error,this._info);
    }

    // Render children if no error occurs
    return this.props.children;
  }
}

export default ErrorBoundary;

export {
  type IFallBack
}