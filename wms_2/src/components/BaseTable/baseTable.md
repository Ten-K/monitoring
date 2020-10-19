## 基础列表组件 BaseTableCom
基础列表组件，暂时包含的表单元素有文字、开关、普通输入框、普通选择器、图片      

说明：
1. 组件内部根据 `${comData.id}Page` 到 sessionStorage 中获取查询条件     

### BaseTableCom 可传参数：
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
tableData | 是 | [] | Array | table 数据
tableHeader | 是 | [] | Array | table 配置数组
getTableData | 是 | () => {} | Function | 获取数据的函数，data 包含了请求需要传递的参数，包括了页码和条数
comData | 是 | {} | Object | 组件相关信息；支持 id 属性，用来存储搜索条件时使用 key
canSelect | 否 | false | Boolean | 是否可选列表中的数据
hasOperationBtn | 否 | false | Boolean | 是否有操作的按钮
handleDataSelect | 否 | () => {} | Function | 选择数据后的处理函数
totalItems | 否 | 0 | Number | 数据总条数
tableStyle | 否 | {} | Object | table样式
operationWidth | 否 | 150 | Number | 操作栏宽度
showPage | 否 | true | Boolean | 是否显示分页
checkSelectable | 否 | () => true | Function | 控制table的行是否可选，默认全部可选
formSize | 否 | mini | String | 控制表单元素的size
tableBorder | 否 | false | Boolean | elementui table的border属性值   
isExpand | 否 | false | Boolean | 表格是否有扩展行，插槽名为 rowExpand
hasRowHeaderExpand | 否 | false | Boolean | 表格是否有行的头部的扩展，插槽名为 rowHeader


<!-- 
canChangeCell |  否 | false | Boolean | 是否可以通过单元格修改值  
handleSaveCellChange |  否 | (data, resolve, reject) => {} | Function | 保存单元格的修改，data 是返回用于保留操作的有关数据
-->

### 表单元素及属性描述
<table>
  <tr>
    <th>名称</th>
    <th>type 的值</th>
    <th>属性</th>
    <th>属性描述</th>
  </tr>
  <tr>
    <td rowspan="8">文本元素</td>
    <td rowspan="8">word</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String；必需；列的表头名称</td>
  </tr>
  <tr>
    <td>width</td>
    <td>String；非必需；列的固定宽度</td>
  </tr>
  <tr>
    <td>minWidth</td>
    <td>String；非必需；列的最小宽度</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊元素</td>
  </tr>
  <tr>
    <td>textRight</td>
    <td>String；非必需；文本偏向，默认为'left'</td>
  </tr>
  <tr>
    <td>iconArr</td>
    <td>Array；非必需；文本前的图标，将根据文本来匹配图标，有两个属性，一是value，图标的class名字，二是label，图标对应的文本</td>
  </tr>

  <tr>
    <td rowspan="11">开关</td>
    <td rowspan="11">switch</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String；必需；列的表头名称</td>
  </tr>
  <tr>
    <td>columnOperable</td>
    <td>String；必需；列的类型，取值：none/all。none为只需显示为文本，若type是有options的表单元素，内部会根据options显示值；all为一整列都是可操作的表单元素；</td>
    <!-- part 为该列的单元格会在文本和某表单元素之间切换，可修改某个单元格的值-->
  </tr>
  <tr>
    <td>width</td>
    <td>String；非必需；列的固定宽度</td>
  </tr>
  <tr>
    <td>minWidth</td>
    <td>String；非必需；列的最小宽度</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊元素</td>
  </tr>
  <tr>
    <td>textRight</td>
    <td>String；非必需；文本偏向，默认为'left'</td>
  </tr>
  <tr>
    <td>showWord</td>
    <td>Object；非必需；是否将值显示在开关的右侧</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数，监听函数会传入3个参数，分别是value（值），config（列的相关信息）, data（包含其他信息的对象）</td>
  </tr>

  <tr>
    <td rowspan="7">图片</td>
    <td rowspan="7">image</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String；必需；列的表头名称</td>
  </tr>
  <tr>
    <td>width</td>
    <td>String；非必需；列的固定宽度</td>
  </tr>
  <tr>
    <td>minWidth</td>
    <td>String；非必需；列的最小宽度</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊元素</td>
  </tr>
  <tr>
    <td>textRight</td>
    <td>String；非必需；文本偏向，默认为'left'</td>
  </tr>

  
  <tr>
    <td rowspan="12">普通输入框</td>
    <td rowspan="12">input</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String；必需；列的表头名称</td>
  </tr>
  <tr>
    <td>columnOperable</td>
    <td>String；必需；列的类型，取值：none/all。none为只需显示为文本，若type是有options的表单元素，内部会根据options显示值；all为一整列都是可操作的表单元素；</td>
    <!-- part 为该列的单元格会在文本和某表单元素之间切换，可修改某个单元格的值-->
  </tr>
  <tr>
    <td>width</td>
    <td>String；非必需；列的固定宽度</td>
  </tr>
  <tr>
    <td>minWidth</td>
    <td>String；非必需；列的最小宽度</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊元素</td>
  </tr>
  <tr>
    <td>textRight</td>
    <td>String；非必需；文本偏向，默认为'left'</td>
  </tr>
  <tr>
    <td>clearable</td>
    <td>Boolean；非必需；是否可清空值</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean；非必需；是否禁用</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数，监听函数会传入3个参数，分别是value（值），config（列的相关信息）, data（包含其他信息的对象）</td>
  </tr>

  <tr>
    <td rowspan="11">普通选择器</td>
    <td rowspan="11">select</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>label</td>
    <td>String；必需；列的表头名称</td>
  </tr>
  <tr>
    <td>columnOperable</td>
    <td>String；必需；列的类型，取值：none/all。none为只需显示为文本，若type是有options的表单元素，内部会根据options显示值；all为一整列都是可操作的表单元素；</td>
    <!-- part 为该列的单元格会在文本和某表单元素之间切换，可修改某个单元格的值-->
  </tr>
  <tr>
    <td>width</td>
    <td>String；非必需；列的固定宽度</td>
  </tr>
  <tr>
    <td>minWidth</td>
    <td>String；非必需；列的最小宽度</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊元素</td>
  </tr>
  <tr>
    <td>textRight</td>
    <td>String；非必需；文本偏向，默认为'left'</td>
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
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数，监听函数会传入3个参数，分别是value（值），config（列的相关信息）, data（包含其他信息的对象）</td>
  </tr>

</table>
