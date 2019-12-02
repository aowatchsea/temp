<template>
  <v-col class="receiver" :xs="24" :sm="24" :md="24" :lg="12">
    <h1>{{ name }}</h1>
    <br/>
    <v-row class="block_message">
      <v-col span="3">
      </v-col>
      <v-col span="8">
        <div class="explain_panel">Step 1. Connect</div>
      </v-col>
      <v-col span="2">
        <v-button class="line_button" type="primary" shape="circle" icon="link" v-on:click="connectToOasis"></v-button>
      </v-col>
      <v-col span="2">
        <div v-if="flag_connect" class="lines-horizontal">
        </div>
      </v-col>
      <v-col span="8">
        <v-alert v-if="flag_connect" type="success" show-icon>
          Connected to <u>{{ local_gateway }}</u>
        </v-alert>
      </v-col>
      
    </v-row>

    <v-row class="block_message">
      <v-col span="3">
      </v-col>
      <v-col span="8">
        <div class="explain_panel">Step 2. Load<v-input v-model="block_address" type="text" placeholder="Please input the address"></v-input></div>
      </v-col>
      <v-col span="2">
        <v-button class="line_button" type="primary" shape="circle" icon="reload" v-on:click="loadService"></v-button>
      </v-col>
      <v-col span="2">
        <div v-if="flag_load" class="lines-horizontal">
        </div>
      </v-col>
      <v-col span="8">
        <v-alert v-if="flag_load" type="success" show-icon>
          Load at <u>{{ block_address }}</u>
        </v-alert>
      </v-col>
      
    </v-row>

    <v-row class="block_message">
      <v-col span="3">        
      </v-col>
      <v-col span="8">
        <div class="explain_panel">Step 3. Recover<v-input v-model="public_value" type="text" placeholder="Please input the public value"></v-input></div>
      </v-col>
      <v-col span="2">
        <v-button class="line_button" type="primary" shape="circle" icon="download" v-on:click="fetch"></v-button>
      </v-col>
      <v-col span="2">
        <div v-if="fetch_result" class="lines-horizontal">
        </div>
      </v-col>      
      <v-col span="8">
        <v-alert v-if="fetch_result" type="success" show-icon>
          Result is <u>{{ fetch_result }}</u>
        </v-alert>
      </v-col>
    </v-row>

    <br/>
    
  </v-col>
</template>

<script>

import oasis from '@oasislabs/client';

export default {
  name: 'receiver',
  props: {
    name: String,
  },
  data () {
    return {
      flag_connect: false,
      flag_load: false,
      flag_upload: false,
      fetch_result: false,
      blackbox: null,
      secret: 'no secret',
      block_address: null,
      address: null,
      public_value: null,
      local_gateway: 'ws://localhost:8546',
      public_gateway: 'https://gateway.devnet.oasiscloud.io',
      public_credential: '',
    }
  },
  methods: {
    async connectToOasis() {
      const wallet = new oasis.Wallet('0x7ec6102f6a2786c03b3daf6ac4772491f33925902326a0d2d83521b964a87402');
      const gateway = new oasis.gateways.Web3Gateway(this.local_gateway, wallet);
      // const headers = new Map();
      // headers.set('X-OASIS-SESSION-KEY', 'Ssharing-session');
      // let gateway = new oasis.gateways.Gateway(this.public_gateway, this.public_credential, { headers });
      oasis.setGateway(gateway);
      this.flag_connect = true;
    },    

    async loadService() {
      if(!this.flag_connect){
        await this.connectToOasis();
      }
      const blackbox = await oasis.Service.at(new oasis.Address(this.block_address));
      this.blackbox = blackbox;
      this.flag_load = true;
    },

    async fetch(){
      this.secret = await this.blackbox.fetch();
      // this.fetch_result = await this.blackbox.fetch();      
      const sss = require('shamirs-secret-sharing');
      const temp_buff = await this.blackbox.fetch();
      this.fetch_result= sss.combine([new Buffer(this.public_value, 'hex'), new Buffer(temp_buff, 'hex')]);      
    }
  }
}
</script>