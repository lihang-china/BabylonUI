<!--
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: Your Name
 * @Date: 2022-07-05 09:37:23
 * @LastEditors: Your Name
 * @LastEditTime: 2023-01-30 14:54:23
-->
<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
@import '/src/style/index.scss';
</style>
