<template>
  <div class="qutos">
    <h1>{{ quto }}</h1>
    <p>User {{ name }}</p>
    <span>私钥：</span>
    <input v-model="sk">
    <v-button v-on:click="connectToOasis">Connect</v-button>
    <v-button v-on:click="deployService">Deploy</v-button>
    <hr>
    <v-button v-on:click="store">Store</v-button>
    <v-button v-on:click="fetch">Fetch</v-button>
    <p> {{ secret }} </p>
    <p class="danger-region" >It works? {{ sk }}</p>


    <span>公钥：</span>
    <input v-model="pk">
    <p class="danger-region">It works? {{ pk }}</p>

    <span>SECRET:</span>
    
  </div>
</template>

<script>

import oasis from '@oasislabs/client';

export default {
  name: 'simstore',
  props: {
    quto: String,
    name: String
  },
  data () {
    return {
      sk: null,
      pk: null,
      bytecode: 'simstore.wasm',
      flag_connect: null,
      deployLocally: process.env.NODE_ENV === 'development',
      blackbox: null,
      secret: 'no secret',
    }
  },
  methods: {
    async connectToOasis() {
      let gateway = new oasis.gateways.Web3Gateway('ws://localhost:8546', oasis.Wallet.fromMnemonic('range drive remove bleak mule satisfy mandate east lion minimum unfold ready'));
      oasis.setGateway(gateway);
      this.flag_connect = true;
    },

    async deployService() {
      if(!this.flag_connect){
        await this.connectToOasis();
      }
      const bytecode = await fetch(this.bytecode).then((response) => response.body)
      .then((stream) => new Response(stream))
      .then(async (response) => {
        const serviceBinary = await response.arrayBuffer();
        return new Uint8Array(serviceBinary);
      });

      const blackbox =  await oasis.deploy('hello world!',{
        bytecode,
        header: { confidential: !this.deployLocally },
        gasLimit: '0xf42400'
      });

      this.blackbox = blackbox;
    },

    async loadService(address) {
      // 还是需要先连接
      if(!this.flag_connect){
        await this.connectToOasis();
      }
      const blackbox = await oasis.Service.at(new oasis.Address(address));
      this.blackbox = blackbox;
    },

    async store(){
      this.blackbox.store('this works!@@@');
    },

    async fetch(){
      this.secret = await this.blackbox.fetch();
    }

  }
}
</script>