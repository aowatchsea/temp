<template>
  <v-col class="sender" :xs="24" :sm="24" :md="24" :lg="12">
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
        <div class="explain_panel">Step 2. Deploy</div>
      </v-col>
      <v-col span="2">
        <v-button class="line_button" type="primary" shape="circle" icon="cloud-upload-o" v-on:click="deployService"></v-button>
      </v-col>
      <v-col span="2">
        <div v-if="flag_deploy" class="lines-horizontal">
        </div>
      </v-col>
      <v-col span="8">
        <v-alert v-if="flag_deploy" type="success" show-icon>
          Deploy at <u>{{ address }}</u>
        </v-alert>
      </v-col>
      
    </v-row>

    <v-row class="block_message">
      <v-col span="3">
      </v-col>
      <v-col span="8">
        <div class="explain_panel">Step 3. Store<v-input v-model="store_secret" type="textarea" placeholder="Please enter the message you need to store in the blockchain"></v-input></div>

      </v-col>
      <v-col span="2">
        <v-button class="line_button" type="primary" shape="circle" icon="save" v-on:click="store"></v-button>
      </v-col>
      <v-col span="2">
        <div v-if="flag_upload" class="lines-horizontal">
        </div>
      </v-col>
      <v-col span="8">
        <v-alert v-if="flag_upload" type="success" show-icon>
          Store successfully! Public value is <v-input :value="public_value"></v-input>
        </v-alert>
      </v-col>      
    </v-row>

    <v-row class="block_message">
      <v-col span="3">        
      </v-col>
      <v-col span="8">
        <div class="explain_panel">Step 4. Fetch</div>
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
  name: 'sender',
  props: {
    name: String,
  },
  data () {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 10
      },
      bytecode: 'simstore.wasm',
      flag_connect: false,
      flag_deploy: false,
      flag_upload: false,
      fetch_result: false,
      store_secret: '',
      blackbox: null,
      secret: 'no secret',
      public_value: '',
      address: null,
      local_gateway: 'ws://localhost:8546',
      public_gateway: 'https://gateway.devnet.oasiscloud.io',
      public_credential: '',
    }
  },
  methods: {
    async connectToOasis() {
      const wallet = new oasis.Wallet('0xb5144c6bda090723de712e52b92b4c758d78348ddce9aa80ca8ef51125bfb308');
      const gateway = new oasis.gateways.Web3Gateway(this.local_gateway, wallet);
      // const headers = new Map();
      // headers.set('X-OASIS-SESSION-KEY', 'ballot-session');
      // let gateway = new oasis.gateways.Gateway(this.public_gateway, this.public_credential, { headers });
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
        // header: { confidential: !this.deployLocally },
        header: { confidential: false },
        gasLimit: '0xf42400'
      });

      this.blackbox = blackbox;
      this.flag_deploy = true;
      this.address = blackbox.address.hex;
    },

    async store(){
      const sss = require('shamirs-secret-sharing');
      this.secret = sss.split(this.store_secret?this.store_secret:"no secret", {shares: 3, threshold: 2});
      this.blackbox.store(this.secret[0].toString('hex'));
      this.public_value = this.secret[1].toString('hex');
      this.flag_upload = true;
    },

    async fetch(){
      const sss = require('shamirs-secret-sharing');
      // this.secret = await this.blackbox.fetch();
      const hint = await this.blackbox.fetch();
      // window.console.log(hint);
      // window.console.log(this.secret[0].toString('base64'));
      this.fetch_result = sss.combine([this.secret[1], new Buffer(hint, 'hex')]);
    }
  }
}
</script>