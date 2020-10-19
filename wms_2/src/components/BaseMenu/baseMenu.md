## 横向菜单 BaseMenuTransverse
#### 可传参数：
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
menuData | 是 | [] | Array | 菜单数组
permissionsArray | 是 | [] | Array | 菜单权限的数组
menuType | 否 | 'el-menu' | String | 定义是显示element-ui的导航菜单，还是自定义的导航菜单，可取值【'el-menu' | 'custom-menu' 】
elMenuStyle | 否 | {backgroundColor:'#27303f',textColor:'#ffffff',activeTextColor:'#d73131'} | Object | 当menuType为el-menu时，可设置该值更改导航栏的背景色、字体颜色、当前active菜单字体颜色
permissionSetting | 否 | | 'firstLevel' | String | 导航菜单的权限级别：一级权限【firstLevel】、二级权限【secondLevel】、三级权限【thirdLevel】
#### 待优化data属性
showIcon:false,//是否显示图标,适用于custom-menu
showLogout:false,//是否显示退出登录,适用于custom-menu
#### 自定义导航菜单的样式
可在BaseMenuTransverse.vue文件中的style修改对应的背景颜色，字体颜色，高亮颜色，高度等属性

## 纵向菜单 BaseMenuPortrait
#### 可传参数：
参数名 | 是否必传 | 默认值 | 参数类型 | 描述
:-: | :-: | :-: | :-: | :-:
menuData | 是 | [] | Array | 菜单数组
permissionsArray | 是 | [] | Array | 菜单权限的数组
menuType | 否 | 'el-menu' | String | 定义是显示element-ui的导航菜单，还是自定义的导航菜单，可取值【'el-menu' | 'custom-menu' 】
elMenuStyle | 否 | {backgroundColor:'#27303f',textColor:'#ffffff',activeTextColor:'#d73131'} | Object | 当menuType为el-menu时，可设置该值更改导航栏的背景色、字体颜色、当前active菜单字体颜色
permissionSetting | 否 | | 'firstLevel' | String | 导航菜单的权限级别：一级权限【firstLevel】、二级权限【secondLevel】、三级权限【thirdLevel】
#### 自定义导航菜单的样式
可在BaseMenuTransverse.vue文件中的style修改对应的背景颜色，字体颜色，高亮颜色，宽度等属性

## *注意：横向菜单组件和纵向菜单组件适用于一般的情况，具体项目使用时仍需要注意是否存在问题，可针对性修改内容*