## 搜索条件组件 BaseSearchCom
搜索条件的组件，暂时包含的表单元素有普通输入框、普通选择器、日期范围选择、日期选择、选择省市区     

说明：     
1. 日期范围选择通过拼接的方式来设置属性名，如一个日期范围选择的 prop 属性值为 'date'，组件会自动拼接新的属性名，可根据具体的项目要求修改 dateParamName 函数，来修改拼接规则。
2. 组件内部将查询条件存储在 sessionStorage，key 为 `${comData.id}Page`  

### BaseSearchCom 可传参数：
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
formLabel | 是 | [] | Array | 决定表单元素的数组
getData | 是 | (data) => {} | Function | 获取数据的函数，data 包含了请求需要传递的参数，包括了页码和条数
comData | 是 | {} | Object | 组件相关信息；支持 id 属性，用来存储搜索条件时使用 key
labelWidth | 否 | 60 | Number | 表单label的宽度
showResetBtn | 否 | true | Boolean | 是否显示重置按钮
formSize | 否 | mini | String | 表单元素size
areaLabelParams | 否 | name | String | 省市区选择器显示选项的属性名
areaValueParams | 否 | id | String | 省市区选择器取值的属性名


### 表单元素及属性描述

<table>
  <tr>
    <th>名称</th>
    <th>type 的值</th>
    <th>属性</th>
    <th>属性描述</th>
  </tr>
  <tr>
    <td rowspan="3">普通输入框</td>
    <td rowspan="3">input</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>

  <tr>
    <td rowspan="5">日期范围选择</td>
    <td rowspan="5">datePicker</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>format</td>
    <td>String；必需；日期的格式</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>
  <tr>
    <td>itemType</td>
    <td>String；非必需；日期选择器的类型</td>
  </tr>

  <tr>
    <td rowspan="4">选择器</td>
    <td rowspan="4">select</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>

  <tr>
    <td rowspan="5">选择省市区</td>
    <td rowspan="5">area</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>width</td>
    <td>String；必需；选框宽度</td>
  </tr>
  <tr>
    <td>limit</td>
    <td>Number；非必需；省市区时取值表示为：省->1，省市->2，省市区->3；level 和 limit 必传其一</td>
  </tr>
  <tr>
    <td>level</td>
    <td>Number；非必需；省市区时取值表示为：省->1，市->2，区->3；level 和 limit 必传其一</td>
  </tr>

</table>



