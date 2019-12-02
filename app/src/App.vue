<template>
  <div id="app">
    <h1>DEMO #1</h1>
    <center>Secret Sharing via block chain</center>
    <br/>
    <hr/>
    <br/>

    <sender name="Sender"/>
    <receiver name="Receiver"/>

  </div>
</template>

<script>

import sender from './components/sender.vue'
import receiver from './components/receiver.vue'

export default {
  name: 'app',
  components: {
    sender,
    receiver,
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.explain_panel {
  font-weight: bold;
  font-size: 14px;
  border: 2px;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  /*margin-left: 100px;*/
  padding: 20px;
  position: relative;
}
.explain_panel:before {
    border-bottom: 10px solid transparent;
    border-left: 10px solid #ccc;
    border-right: 0px solid #ccc;
    border-top: 10px solid transparent;
    content: " ";
    display: inline-block;
    position: absolute;
    left: auto;
    right: -10px;
    top: 10px;
}
.explain_panel:after {
    border-bottom: 9px solid transparent;
    border-left: 9px solid #fff;
    border-right: 0 solid #fff;
    border-top: 9px solid transparent;
    content: " ";
    display: inline-block;
    position: absolute;
    left: auto;
    right: -9px;
    top: 11px;
}
.line_button {
  position: relative;
  top: 15px;
}
.block_message {
  margin-bottom: 30px;
}

.lines-horizontal {
  position: relative;
  top: 25px;
  border-top: 1px dashed black;
  left: -10px;
}
.ant-alert {
  font-size: 14px;
  overflow: auto;
}
</style>
