## 消息提示弹窗 BaseMessageCom	

消息提示弹窗

说明：

1、通过调用全局方法$selfMessage()显示message提示弹窗

2、方法接受一个对象作为参数

```
<template>
	<button @click="showSelfMessage">
		点击显示提示弹窗
	</button>
</template>

<script>
	export default{
		methods: {
			showSelfMessage (){
				this.$selfMessage({
					text: '这是一个消息提示',
					duration: 5,
					icon: '#icon-guanbi'
				})
			}
		}
	}
</script>
```

### BaseMessageCom对象中可传参数：

| 参数名    | 是否必传 | 默认值          | 参数类型 | 描述             |        可选值         |
| --------- | -------- | --------------- | -------- | ---------------- | :-------------------: |
| text      | 否       | '这是一个提示'  | String   | 提示的文本内容   |           —           |
| type      | 否       | 'default'       | String   | 主题             | success/warning/error |
| showClose | 否       | false           | Boolean  | 是否显示关闭按钮 |      true/false       |
| duration  | 否       | 4               | Number   | 动画时间         |           —           |
| icon      | 否       | '#icon-message' | String   | 左侧显示的icon   |           —           |
| vNode     | 否       | —               | String   | 自定义html       |           —           |

注意：

1、属性duration动画时间不能超过10s

2、属性icon必须要使用iconfont的图标的名字，并且要带上"#"

3、vNode的优先级高于text，如果都写上text和vNode属性，则只显示vNode的内容