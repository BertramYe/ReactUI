import React, { useCallback } from 'react';
import Style from './index.module.css';
import Loading from '../../Loading';
import loadingGif from '../../../assets/uploading.gif'

type ISearchRowDown<T extends object | string> = {
  onInput:(e:React.FormEvent<HTMLInputElement>)=>void,
  OptionList:T[],
  optionStringKey?:T extends object ? keyof T : never,
  isLoading:boolean,
  onSelected?:(SelectedOption:T,index:number,selected:boolean)=>void,
  selectedOptions:T[],
  placeHolder?:string,
  onUpdateSelectedList?:(staus:React.SetStateAction<T[]>)=> void,
  deduplicationSelectedList?:boolean,
}

const SearchRowDown = <T extends object | string,>({onInput,onUpdateSelectedList,deduplicationSelectedList = true,
  selectedOptions,OptionList,optionStringKey,placeHolder,isLoading=false,onSelected}:ISearchRowDown<T>) => {
    const SelectedOption = useCallback((option:T,index:number,selected:boolean)=>{
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSelected && onSelected(option,index,selected);
      if(onUpdateSelectedList){
        onUpdateSelectedList((pre)=> {
          if(selected){
              const cached = [...pre]
              if(deduplicationSelectedList){
                  return cached.includes(option) ? cached:[...cached,option]
              }else{
                  return [...pre,option]
              }
          }else{
              if(deduplicationSelectedList){ // remove all duplicated 
                  return pre.filter((item)=> item !== option)
              }else{ // remove the first one duplcated
                  const cached_index = pre.indexOf(option)
                  return cached_index > 0 ? pre.splice(cached_index,1): pre
              }
          }
        })
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const FilterOptionString = useCallback((option:T):string => (typeof option == 'object' ? option[optionStringKey as keyof typeof option] as string : option),[])

    return (
      <div className={Style.container}>
        <label  htmlFor="searchchoice"  className={Style.searchContainer}>
          <ul className={Style.selectedContainer}>
              {
                selectedOptions.map((selected,index)=> 
                  <li key={index}  className={Style.selectedItem}>
                    <span className={Style.selectedTip}>{FilterOptionString(selected)}</span>
                    <span className={Style.unSelectedButton} onClick={()=> SelectedOption(selected,index,false)} >{`❌`}</span>
                  </li>
                )
              }
          </ul>
          <input className={Style.selectInput} tabIndex={-1} id="searchchoice" onInput={onInput}  placeholder={placeHolder} />
        </label>
        <ul className={Style.selectOptions} >
            {
              isLoading ?
              <Loading loadingGif={loadingGif} imageCSS={Style.searchLoading}/>
              :
              <div className={Style.searchItemsList}>
                {
                  OptionList.map((opt,index)=> 
                    <li key={index} className={Style.optionItem} onMouseDown={()=> SelectedOption(opt,index,true)}>
                      { FilterOptionString(opt) }
                    </li>
                  )
                }
            </div>
            }
          </ul>
      </div>
    )
};

export default SearchRowDown;
export {
  type ISearchRowDown
}