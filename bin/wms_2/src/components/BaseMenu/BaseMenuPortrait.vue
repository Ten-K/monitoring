<template>
  <div class="portrait">
    <div class="wrap"
      v-if="menuType=='el-menu'">
      <!-- el-menu菜单 -->
      <el-menu
        router
        :background-color="elMenuStyle.backgroundColor"
        :text-color="elMenuStyle.textColor"
        :active-text-color="elMenuStyle.activeTextColor"
        :default-active="$route.path">
        <template v-for="(mItm, mIdx) in menuData">
          <el-submenu
            v-if="mItm.children && permissionsArray.includes(mItm.code)"
            :key="mIdx"
            :index="mItm.href"
            >
            <template slot="title">
              <i :class="mItm.icon"></i>
              <span>{{mItm.label}}</span>
            </template>
            <template v-for="(cItm, cIdx) in mItm.children">
              <el-submenu v-if="cItm.children && (permissionSetting!='firstLevel'?permissionsArray.includes(cItm.code):true)"
                :index="cItm.href"
                :key="cIdx">
                <template slot="title">{{cItm.label}}</template>
                <template v-for="(itm, idx) in cItm.children">
                  <el-menu-item v-if="permissionSetting=='thirdLevel'?permissionsArray.includes(itm.code):true"
                    :index="itm.href"
                    :key="idx">
                    {{itm.label}}
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item
                v-else-if="permissionSetting!='firstLevel'?permissionsArray.includes(cItm.code):true"
                :index="cItm.href"
                :key="cIdx"
                >{{cItm.label}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-else-if="permissionsArray.includes(mItm.code)"
            :key="mIdx"
            :index="mItm.href"
            >
            <i :class="mItm.icon"></i>
            <span slot="title">{{mItm.label}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
      <!-- custom-menu菜单 -->
    <div 
      v-if="menuType=='custom-menu'"
      class="portrait-menu-wrap">
      <template v-for="(mItm,mIdx) in menuData">
        <div :class="{'menu-item':true,'is-active':currentPath&&isCurrentMenu(mItm.value)}"
              v-if="permissionsArray.includes(mItm.code)"
              :key="mIdx"
              @click.stop="mItm.children?'':onClickMenu(mItm)">
          <span>
            <i :class="mItm.icon"></i>
            <span>{{mItm.label}}</span>
          </span>
          <div class="second-box" v-if="mItm.children">
            <template v-for="(ctm,cdx) in mItm.children">
              <div :class="{'box-item':true,'is-active':currentPath&&isCurrentMenu(ctm.value)}"
                    v-if="permissionSetting!='firstLevel'?permissionsArray.includes(ctm.code):true"
                    :key="cdx"
                    @click.stop="ctm.children?'':onClickMenu(ctm)">
                <span>
                  <i :class="ctm.icon"></i>
                  <span>{{ctm.label}}</span>
                </span>
                <div class="third-box" v-if="ctm.children">
                  <template v-for="(cctm,ccdx) in ctm.children">
                    <div :class="{'third-box-item':true,'is-active':currentPath&&isCurrentMenu(cctm.value)}" 
                          v-if="permissionSetting=='thirdLevel'?permissionsArray.includes(cctm.code):true"
                          :key="ccdx"
                          @click.stop="onClickMenu(cctm)">
                      <span>
                        <i :class="cctm.icon"></i>
                        <span>{{cctm.label}}</span>
                      </span>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    menuData:{
      type:Array,
      required:true,
      default:()=>[]
    },
    permissionsArray:{
      type:Array,
      required:true,
      default:()=>[]
    },
    menuType:{
      type:String,
      required:false,
      default:'el-menu' //element-ui菜单【el-menu】、自定义菜单【custom-menu】
    },
    elMenuStyle:{
      type:Object,
      required:false,
      default:()=>{//element-ui菜单默认的样式
        return {
          backgroundColor:'#27303f',
          textColor:'#ffffff',
          activeTextColor:'#d73131'
        }
      }
    },
    permissionSetting:{
      type:String,
      required:false,
      default:'firstLevel',//权限设置：一级权限【firstLevel】、二级权限【secondLevel】、三级权限【thirdLevel】
    }
  },
  data(){
    return {
      currentPath:null//当前路由路径
    }
  },
  methods:{
    isCurrentMenu(value){
      let menus=this.currentPath?this.currentPath.split('/'):[]
      return menus.some(item => {
        return item===value
      });
    },
    onClickMenu(menuItem){
      this.currentPath=menuItem.href
      if(this.$route.path!==menuItem.href){
        this.$router.replace(menuItem.href)
      }
    }
  },
  watch: {
    $route(toRouter) {
      this.currentPath = toRouter.path;
    }
  },
  beforeMount(){
      this.currentPath=this.$route.path;
  }
}
</script>

<style lang="less" scoped>
@navWrapWidth:200px;//导航条整个宽度
@themeColor: #27303f;//导航条背景色
@themeActiveColor:#344157;//导航条当前选中背景色
@themeHoverColor:#344157;//导航条hover背景色
@fontColor:#ffffff;//导航条字体颜色
@fontActiveColor:#d73131;//导航条当前选中字体颜色
@fontHoverColor:#d73131;//导航条hover字体颜色
@navHeight:60px;//导航条高度
@navWidth:105px;//导航条最小宽度
@navItemPadding:15px;//导航条的左右内边距

@themeBoxColor: #344157;//导航条box背景色
@themeBoxActiveColor:@themeActiveColor;//导航条Box当前选中背景色
@themeBoxHoverColor:@themeHoverColor;//导航条Box hover背景色
@fontBoxColor:@fontColor;//导航条Box字体颜色
@fontBoxActiveColor:@fontActiveColor;//导航条Box当前选中字体颜色
@fontBoxHoverColor:@fontHoverColor;//导航条Box hover字体颜色
@navBoxHeight:@navHeight;//导航条Box高度
@navBoxWidth:195px;//导航条Box宽度
@navBoxItemPadding:@navItemPadding;//导航条Box的左右内边距

@fontSize:14px;//字体大小
@iconTitleWidth:105px;//图标加文字最小宽度
.portrait{
  height: 100%;
  width:@navWrapWidth;
  background-color: @themeColor;
  .wrap{
    overflow:scroll;
    height: 100%;
    .el-menu{
      border-right-width: 0px;
    }
  }
  .wrap::-webkit-scrollbar {
    display: none;
  }
  .portrait-menu-wrap{
    background-color: @themeColor;
    color: @fontColor;
    display: flex;
    flex-direction: column;
    width:@navWrapWidth;
    line-height: @navHeight;
    box-sizing: border-box;
    .menu-item{
      padding:0 @navItemPadding;
      cursor: pointer;
      position: relative;
      font-size: @fontSize;
      box-sizing: border-box;
      background-color: @themeColor;
      min-width: @navWidth;
      .second-box{
        position: absolute;
        top: 0;
        left: @navWrapWidth;
        z-index: 1;
        background-color: @themeBoxColor;
        color:@fontBoxColor;
        line-height: @navBoxHeight;
        box-sizing: border-box;
        width: @navBoxWidth;
        opacity: 0;
        visibility: hidden;
        .box-item{
          padding:0 @navBoxItemPadding;
          cursor: pointer;
          font-size: @fontSize;
          position: relative;
          .third-box{
            position: absolute;
            top:0;
            left:@navBoxWidth;
            width: @navBoxWidth;
            background-color: @themeBoxColor;
            color:@fontBoxColor;
            line-height: @navBoxHeight;
            box-sizing: border-box;
            opacity: 0;
            visibility: hidden;
            .third-box-item{
              padding:0 @navBoxItemPadding;
              cursor: pointer;
              font-size: @fontSize;
            }
            .third-box-item.is-active{
              background-color: @themeBoxActiveColor;
              color:@fontBoxActiveColor;
            }
            .third-box-item:hover{
              background-color: @themeBoxHoverColor;
              color: @fontBoxHoverColor;
            }
          }
        }
        .box-item.is-active{
          background-color: @themeBoxActiveColor;
          color:@fontBoxActiveColor;
        }
        .box-item:hover{
          background-color: @themeBoxHoverColor;
          color: @fontBoxHoverColor;
          .third-box{
            visibility: visible;
            opacity: 1;
            transition: all .5s ease;
          }
        }
      }
    }
    .menu-item.is-active{
      background-color: @themeActiveColor;
      color:@fontActiveColor;
    }
    .menu-item:hover{
      background-color: @themeHoverColor;
      color: @fontHoverColor;
      .second-box{
        visibility: visible;
        opacity: 1;
        transition: all .5s ease;
      }
    }
  }
}
</style>