import './App.css';
import axios from "axios";
import {useState} from "react";
function App() {
    const list = [
        {
            id:1,
            value: '奖品1',
            weight: 5
        },{
            id:2,
            value: '奖品3',
            weight: 1
        },{
            id:3,
            value: '奖品3',
            weight: 2
        },{
            id:4,
            value: '奖品4',
            weight: 2
        },{
            id:6,
            value: '奖品5',
            weight: 3
        },{
            id:7,
            value: '奖品6',
            weight: 4
        },{
            id:8,
            value: '奖品7',
            weight: 5
        },{
            id:9,
            value: '奖品8',
            weight: 5
        },
    ]
    //改变奖品名称
    const handleChangeValue = (e, index) => {
        list[index].value = e.target.value
    }
    //改变奖品权重等级
    const handleChangeWeight = (e, index) => {
        list[index].weight = Number(e.target.value)
    }
    const [isClick, setIsClick] =useState(false)
    const handleClick = () => {
        setIsClick(true)
        // console.log(list)
        axios.post('/api/live',{list: list}).then((res) => {
            console.log(res.data)
        })
    }
  return (
    <div>
        {
            list.map((item,index) =>{
                return <li key={item.id} className="list">
                        <div>第{item.id}格修改：</div>
                        奖品名称：<input type="text" defaultValue={item.value} disabled={ isClick} onChange={e=>handleChangeValue(e, index)}/>
                        奖品权重：<select defaultValue={item.weight} disabled={isClick} onChange={e=>handleChangeWeight(e, index)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    </li>

            })
        }
        <button onClick={()=>handleClick(true)}>上传</button>
    </div>
  );
}

export default App;
