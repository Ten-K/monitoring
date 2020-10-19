
## 表单组件 BaseFormCom
基础表单组件，包含的表单元素有文本、普通输入框、输入框带搜索建议、多行文本、密码输入框、普通选择器、开关、单选框、多选框、日期选择、日期范围选择、图片上传、富文本编辑器、选择省市区    

说明：    
1. 支持简单的表单校验规则生成，特殊校验规则可通过formRule传入。若传入了formRule，组件表单校验将完全依赖传入的formRule
2. 表单类型：    
>>create: 适合空白的表单    
>>update: 适合有部分表单元素需要被赋值    
>>detail：适合纯显示图文的表单    
3. 如普通选择器等支持 options 属性的表单元素，在需要获取显示选项的时候，该组件会从提供的 options 中根据 value 获取对应的 label，因此在父组件中无需处理
4. 部分组件支持绑定监听事件，需要注意的是该组件内部会统一将监听函数的this指向该全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind
5. 该组件内部将表单分成三种情况处理（第2点），提供 showType 属性，可让某表单元素只在三种情况的某一种情况出现
6. 若需修改省市区的拼接符，只需要修改 data 中的 areaDelimiter 的值即可
7. 当需要向表单插入特殊表单元素时，设置 isSpecial 属性为 true，然后使用插槽插入即可，名字为 prop 属性的值
8. 部分表单元素支持正则表达式校验，设置 checkRegArr 属性
9. **该组件仅支持表单中含有一个省市区**

### BaseFormCom 可传参数：
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
labels | 是 | [] | Array | 决定表单元素的数组
comData | 是 | {} | Object | 组件相关信息；有两个属性，一是id，组件key，尽量唯一，二是type，表单类型，取值有：create/update/detail
formRule | 否 | {} | Object | 表单校验规则
handleCompleteData | 否 | (formData, comDataType, comDataId) => {} | Function | 数据校验通过后的处理函数
handleIncompleteData | 否 | (formData, comData) => {} | Function | 数据不校验通过后的处理函数
labelWidth | 否 | 120px | String | 表单label的宽度
originFormData | 否 | {} | Object | 表单数据源
isShowSumbitBtn | 否 | true | Boolean | 是否显示提交按钮
isShowLabel | 否 | true | Boolean | 是否显示表单的label


### 可操作表单元素及属性描述

<table>
  <tr>
    <th>名称</th>
    <th>type 的值</th>
    <th>属性</th>
    <th>属性描述</th>
  </tr>
  <tr>
    <td rowspan="5">文本</td>
    <td rowspan="5">word</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>

  <tr>
    <td rowspan="9">普通输入框</td>
    <td rowspan="9">input</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
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
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>checkRegArr</td>
    <td>Array；非必需；通过正则表达式校验该表单元素的值，是一个对象数组，对象有两个属性，一是pattern，校验的正则表达式，二是message，校验错误时的提示语</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="9">输入框带搜索建议</td>
    <td rowspan="9">autocomplete</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
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
    <td>checkRegArr</td>
    <td>Array；非必需；通过正则表达式校验该表单元素的值，是一个对象数组，对象有两个属性，一是pattern，校验的正则表达式，二是message，校验错误时的提示语</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="9">多行文本</td>
    <td rowspan="9">textarea</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>
  <tr>
    <td>rows</td>
    <td>Array；非必需；输入框行数</td>
  </tr>
  <tr>
    <td>checkRegArr</td>
    <td>Array；非必需；通过正则表达式校验该表单元素的值，是一个对象数组，对象有两个属性，一是pattern，校验的正则表达式，二是message，校验错误时的提示语</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="7">密码输入框</td>
    <td rowspan="7">password</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>String；非必需；提示文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>
  
  <tr>
    <td rowspan="8">普通选择器</td>
    <td rowspan="8">select</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
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
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="7">开关</td>
    <td rowspan="7">switch</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showWord</td>
    <td>Boolean；非必需；是否选择的值对应的label</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="7">单选框</td>
    <td rowspan="7">radio</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="7">多选框</td>
    <td rowspan="7">checkbox</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="8">日期</td>
    <td rowspan="8">date</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array；非必需；选项数组，有两个属性，一是value，取值，二是label，选项显示的文字</td>
  </tr>
  <tr>
    <td>format</td>
    <td>String；非必需；日期格式</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="8">日期范围选择</td>
    <td rowspan="8">datePicker</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>itemType</td>
    <td>String；非必需；日期表单元素的具体类型</td>
  </tr>
  <tr>
    <td>format</td>
    <td>String；非必需；日期格式</td>
  </tr>
  <tr>
    <td>fns</td>
    <td>Object；非必需；给表单元素绑定监听事件，{key: value}, key为事件类型，value为监听函数（注意：全局组件内部会将统一将监听函数的this指向全局组件，如果需this指向使用该全局组件的组件，可使用箭头函数或bind）</td>
  </tr>

  <tr>
    <td rowspan="8">图片上传</td>
    <td rowspan="8">photoUpload</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>
  <tr>
    <td>limit</td>
    <td>Number；非必需；上传文件时表示限制数量</td>
  </tr>
  <tr>
    <td>operations</td>
    <td>Array；非必需；包含可有操作按钮名称的数组，取值：查看->zoom，删除->delete</td>
  </tr>
  <tr>
    <td>action</td>
    <td>String；非必需；自动上传的url</td>
  </tr>

  <tr>
    <td rowspan="5">富文本</td>
    <td rowspan="5">richTextEditor</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
  </tr>

  <tr>
    <td rowspan="10">省市区</td>
    <td rowspan="10">area</td>
    <td>type</td>
    <td>String；必需；表单元素类型</td>
  </tr>
  <tr>
    <td>prop</td>
    <td>String；必需；字段名</td>
  </tr>
  <tr>
    <td>required<ytd>
    <td>Number；必需；是否是必填，取值：必填 -> 1，选填 -> 0</td>
  </tr>
  <tr>
    <td>width</td>
    <td>String；必需；选框宽度</td>
  </tr>
  <tr>
    <td>labelParamName</td>
    <td>String；必需；</td>
  </tr>
  <tr>
    <td>level</td>
    <td>String；必需；</td>
  </tr>
  <tr>
    <td>isSpecial</td>
    <td>Boolean；非必需；是否是特殊表单元素，设置了该属性为true后，组件将不会根据type渲染表单元素，需要自行使用插槽，名字为 prop 属性的值</td>
  </tr>
  <tr>
    <td>showType</td>
    <td>String；非必需；指定显示的表单类型，默认所有类型都显示，取值范围为 create/update/detail</td>
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
