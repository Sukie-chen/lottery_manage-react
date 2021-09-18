/*
 * @Author: Sukie-Chen
 * @Description:
 * @Date: 2021-09-14 16:09:29
 */
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Click } from './Click'
function App() {
  const [list, setList] = useState([])
  useEffect(()=>{
    axios.get('/api/live').then((res) => {
      // console.log(res.data)
      setList(res.data)
    })
  }, [])
  const newList = []
  const [upload, setUpload] = useState([])
  // 改变奖品名称
  const handleChangeValue = (e, id) => {
    const data = newList.filter((item) => {
      return item.award_id === id
    })
    if (data.length !== 0) {
      data[0].award_name = e.target.value
    } else {
      newList.push({ award_id: id, award_name: e.target.value })
    }
  }
  // 改变奖品图片
  // const handleChangeImage = (e, id) => {
    // const file = e.target.files[0]
    // const reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (e) => {
    //   console.log(e)
    // }
    // console.log(file.path)
    // const data = newList.filter((item) => {
    //   return item.award_id === id
    // })
    // if (data.length !== 0) {
    //   data[0].award_image = 1
    // } else {
    //   newList.push({ award_id: id, award_image:11 })
    // }
    
  // }
  // 改变奖品权重等级
  const handleChangeWeight = (e, id) => {
    const data = newList.filter((item) => {
      return item.award_id === id
    })
    if (data.length !== 0) {
      data[0].award_weight = Number(e.target.value)
    } else {
      newList.push({ award_id: id, award_weight: Number(e.target.value) })
    }
  }
  const [isClick, setIsClick] = useState(false)
  const [hidden, setHidden] = useState(true)
  const handleClick = () => {
    setUpload(newList)
    setIsClick(true)
    setHidden(false)
  }
  const isCheck = ()=> {
    console.log('ischeck',upload) //为空
    axios.post('/api/live', { upload }).then((res) => {
      console.log(res.data)
    })
  }
  return (
    <div>
      {list.map((item) => {
        return (
          <li key={item.award_id} className='list'>
            <div>第{item.award_id}格修改：</div>
            奖品名称：
            <input
              type='text'
              defaultValue={item.award_name}
              disabled={isClick}
              onChange={(e) => handleChangeValue(e, item.award_id)}
            />
            奖品权重：
            <select
              defaultValue={item.award_weight}
              disabled={isClick}
              onChange={(e) => handleChangeWeight(e, item.award_id)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </li>
        )
      })}
      <button onClick={() => handleClick(true)}>上传</button>
      <Click isHidden={hidden} isCheck={isCheck} setHidden={setHidden}/>
    </div>
  )
}

export default App
