
/*
 * @Author: Sukie-Chen
 * @Description: 
 * @Date: 2021-09-18 00:16:19
 */
import { useState } from 'react'
import './click.css'
export const Click = (props) => {
  const {isHidden, isCheck, setHidden} = props
  const [hiddened] = useState(true)
  const isClick = () => {
    isCheck(); 
    setHidden(true)
  }
  return (
    <div className={hiddened === isHidden? 'checkBoxHidden': 'checkBox'}>
      <div >确定上传吗？</div>
      <div>
        <button onClick={()=> isClick()}>确定</button>
        <button onClick={()=> setHidden(true)}>取消</button>
      </div>
    </div>
  )
}