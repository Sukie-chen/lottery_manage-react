<!--
 * @Author: Sukie-Chen
 * @Description: 幸运抽奖的后台管理----》react 版
 * @Date: 2021-09-14 16:09:29
-->
### 功能

 - [x] 加载页面从后台获取数据
 - [x] 点击上传 `上传` 按钮有弹出框
 - [x] 点击确定，上传服务器更新数据
  
### 攻克点
  1. 数据首次请求
   ```JavaScript
   useEffect(()=>{
    axios.get('/api/live').then((res) => {
      // console.log(res.data)
      setList(res.data)
    })
  }, [])
   ```
  2. 奖品名称、权重修改绑定，获得 `新数据`
   ```JavaScript
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
   ```
  3. 父组件传值子组件
   ```JavaScript
   //父组件的方法
   const isCheck = ()=> {
    console.log('ischeck',upload) //为空
    axios.post('/api/live', { upload }).then((res) => {
      console.log(res.data)
    })
  }
  ```
  ```html
  <Click isHidden={hidden} isCheck={isCheck} setHidden={setHidden}/>
  ```
  ```JavaScript
  //子组件使用
  const {isHidden, isCheck, setHidden} = props
  const [hiddened] = useState(true)
  const isClick = () => {
    isCheck(); 
    setHidden(true)
  }
   ```

  4. 子组件执行父组件的方法，发现newList为空数组，无法获取新数据，以至于上传空数据
  ```JavaScript
  //使用useSate， 上传useState的值
  const newList = []
  const [upload, setUpload] = useState([])
  const handleClick = () => {
    setUpload(newList)
    setIsClick(true)
    setHidden(false)
  }
  ```
  5. 设置代理
  ```JavaScript
  const {createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/api',{
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
    ))
}
  ```
   
