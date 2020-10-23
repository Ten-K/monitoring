## 文件路径选择对话框
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
title | 是 | - | String | 对话框标题
visible.sync | 是 | - | Boolean | 控制显示对话框
@ensure | 是 | - | Function | 确定按钮触发方法
@cancel | 是 | - | Function | 取消按钮触发方法
#### 调用例子
```
<BaseFileList 
  title="选择程序" 
  :visible.sync="dialogVisible" 
  @ensure='ensure' 
  @cancel='dialogVisible=false'>
</BaseFileList>
```
#### ensure触发的方法可接受选中文件的参数，没选择为{}
```
{
  path:文件/文件夹绝对路径,
  name:文件/文件夹名称,
  isDirectory:是否为文件夹
}
```