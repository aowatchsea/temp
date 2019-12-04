<template>
  <div id="app">
    <h1>DEMO</h1>
    <center>This is a demo</center>
    <br/>
    <hr/>
    <br/>
    <v-row style="background-color: #f7f7f7;">

    <sender name="Sender" :g1= "g1" :g2= "g2" :z= "z" :u1= "u1" :u2="u2" :kappa="kappa" :flag_s="flag_s" @updateCT="updateCT" @switchAll="switchAll" />
    <receiver name="Receiver" @updatePK="updatePK" :C1= "C1" :C2= "C2" :D1= "D1" :D2= "D2" :E= "E" :C= "C" :flag_r="flag_r" @switchS="switchS" @switchAll="switchAll" />

    </v-row>
    
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
  data () {
    return {
      kappa: '',
      g1: '',
      g2: '',
      z: '',
      u1: '',
      u2: '',
      C1: '',
      C2: '',
      D1: '',
      D2: '',
      E: '',
      C: '',
      flag_s: true,
      flag_r: false,
    }
  },
  methods: {
    updatePK(pk) {
      this.g1 = pk.g1;      
      this.g2 = pk.g2;
      this.z = pk.z;
      this.u1 = pk.u1;
      this.u2 = pk.u2;
      this.kappa = pk.L;
    },
    updateCT(ct) {
      this.C1 = ct.C1;
      this.C2 = ct.C2;
      this.D1 = ct.D1;
      this.D2 = ct.D2;
      this.E = ct.E;
      this.C = ct.C;
    },
    switchAll(){
      this.flag_s = !this.flag_s;
      this.flag_r = !this.flag_r;
    },
  }
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
.block_message {
  margin-bottom: 30px;
  overflow: hidden;
}
</style>
