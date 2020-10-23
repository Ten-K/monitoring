<template>
  <div id="index-wrap">
    <div class="index-header">
      <div class="header-title">
        <img src="../assets/logo.png" alt="wanhua_logo">
        <span>版权在线登记系统管理平台</span>
      </div>
      <div class="header-message">
        <div class="logout" @click="logout">
          <i class="iconfont icon-Group"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
    <div class="index-container">
      <BaseMenuPortrait 
        :menuData='menu' 
        :permissionsArray='permissionsArr' 
        menuType='el-menu'
        :elMenuStyle="{backgroundColor:'#f5f5f5',textColor:'#333',activeTextColor:'#d73131'}">
      </BaseMenuPortrait>

      <!-- <div class="menu">
        <el-menu
          router
          background-color="#f5f5f5"
          text-color="#333"
          :default-active="$route.path">
          <template v-for="(mItm, mIdx) in menu">
            <el-submenu
              v-if="mItm.children && permissionsArr.includes(mItm.code)"
              :key="mIdx"
              :index="mItm.href"
              >
              <template slot="title">
                <i :class="mItm.icon"></i>
                <span>{{mItm.label}}</span>
              </template>
              <template v-for="(cItm, cIdx) in mItm.children">
                <el-submenu v-if="cItm.children"
                  :index="cItm.href"
                  :key="cIdx">
                  <template slot="title">{{cItm.label}}</template>
                  <el-menu-item v-for="(itm, idx) in cItm.children"
                    :index="itm.href"
                    :key="idx">
                    {{itm.label}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item
                  v-else
                  :index="cItm.href"
                  :key="cIdx"
                  >{{cItm.label}}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item
              v-else-if="permissionsArr.includes(mItm.code)"
              :key="mIdx"
              :index="mItm.href"
              >
              <i :class="mItm.icon"></i>
              <span slot="title">{{mItm.label}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div> -->
      <div class="content">
        <span @click="dialogVisible=true">打开文件</span>
        <BaseFileList 
          title="选择程序" 
          :visible.sync="dialogVisible" 
          @ensure='ensure' 
          @cancel='dialogVisible=false'>
        </BaseFileList>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/common/configMenu'

let self

export default {
  data () {
    return {
      menu: [ ...menu ],
      permissionsArr: [
        'INDEX', 
        'TEST', 
        'SEVERITYLEVEL', 
        'SOFTWARELIST',
        'SEVERITYLEVEL',
        'PROCESSLIST'
      ],
      dialogVisible:false,
    }
  },
  created () {
    self = this
    // self.getIdentity()
  },
  mounted () {
  },
  methods: {
    ensure(item){
      console.log(item);
      this.dialogVisible=false
    },
    logout () {
      self.$confirm('是否确认退出登录')
        .then(() => {
          this.$http({
            url: this.$api.adminLogout
          }).then((r) => {
            r.code === '0' && this.$router.push('/login')
          })
        })
        .catch(() => {})
    },
    getIdentity () {
      self.$http({
        url: self.$api.adminAdminIdentity,
        method: 'GET',
        loading: true
      }).then((r) => {
        if (r.code === '0' && r.data) {
          localStorage.setItem('identity', JSON.stringify(r.data))
          if (r.data.roles && r.data.roles.length) {
            r.data.roles.forEach((item) => {
              self.permissionsArr = self.permissionsArr.concat(item.permissions)
            })
            self.permissionsArr = Array.from(new Set(self.permissionsArr))
          }
        } else {
          localStorage.setItem('identity', null)
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
#index-wrap {
  // width: 100vw;
  min-width: 1000px;
  height: 100vh;
  background-color: #F9F9F9;
  .index-header {
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    background-color: #171e49;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-title {
      min-width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 36px;
        height: 40px;
        object-fit: cover;
        margin-right: 10px;
      }
      span {
        color: #FFF;
        font-size: 14px;
      }
    }
    .header-message {
      width: 200px;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 14px;
      color: #FFF;
      .logout {
        cursor: pointer;
      }
    }
  }
  .index-container {
    width: 100%;
    height: calc(~"100% - 64px");
    display: flex;
    justify-content: space-between;
    .menu {
      width: 200px;
      height: 100%;
      background-color: #f5f5f5;
      overflow: scroll;
      .el-menu {
        border: 0;
      }
    }
    .menu::-webkit-scrollbar {
      display: none;
    }
    .content {
      box-sizing: border-box;
      width: calc(~"100% - 200px");
      overflow: auto;
      height: 100%;
      padding: 10px;
      background: #f9f9f9;
    }
  }
}
</style>
