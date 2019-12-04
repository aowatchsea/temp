<template>

  <v-col class="receiver" :xs="24" :sm="24" :md="24" :lg="12">
    <h1>{{ name }}</h1>
    <br/>

    <v-row style="text-align: left;" class="block_message">
      <v-col span="4"></v-col>

      <v-col span="16">
        <v-steps :current="flag - 1">
            <v-step title="Setup" description="Init parameters" ></v-step>
            <v-step title="Connect" description="Connect to blockchain" ></v-step>
            <v-step title="Fetch" description="Fetch a tag" ></v-step>
            <v-step title="Dec" description="Decryption" ></v-step>
        </v-steps>
      </v-col>

      <v-col span="1"></v-col>

      <v-col span="3">
        <v-button type="primary" @click="next" :disabled="flag_r">
          next <v-icon type="right"></v-icon>
        </v-button>        
      </v-col>
    </v-row>

    <v-row style="text-align: left;" class="block_message">
      <v-col span="4"></v-col>
      <v-col span="16">
        <v-card title="Public Key" class="block_message">
          g1 = {{ g1 }} <br>
          g2 = {{ g2 }} <br>
          z =  {{ z }} <br>
          u1 = {{ u1 }} <br>
          u2 = {{ u2 }} <br>
        </v-card>

        <v-card title="Private Key" class="block_message">
          x1 = {{ x1 }} <br>
          x2 = {{ x2 }} <br>
          y1 = {{ y1 }} <br>
          y2 = {{ y2 }} <br>
        </v-card>

        <v-card title="Cryptext" class="block_message">
          C1: {{ C1 }} <br>
          C2: {{ C2 }} <br>
          D1: {{ D1 }} <br>
          D2: {{ D2 }} <br>
          E: {{ E }} <br>
          C: {{ C }} <br>
        </v-card>        

        <v-card title="Blockchain Information" class="block_message">
          
          <v-tag v-for="statu in status" :color="statu.C" v-bind:key="statu.C">
            {{ statu.T }}
          </v-tag>
          <br/><br/>

          Address is at {{ address }} <br>
          Tag = {{ tag }} <br/>
        </v-card>

        <v-card title="Decryption Result" class="block_message">
          Message = {{ message }} <br>
        </v-card>
      </v-col>      
    </v-row>

    <v-modal title="Choose a group type"
             :visible="visible_init"
             @ok="handleOk_init"
             @cancel="handleCancel"
             :confirm-loading="asyncConfirmLoading">
        <div class="block_message">
          <v-radio v-model="kappa" label="SS512">SS512</v-radio>
          <v-radio v-model="kappa" label="SS1024" >SS1024</v-radio>
        </div>
    </v-modal>

    <v-modal title="Please input the address"
             :visible="visible_addre"
             @ok="handleOk_addre"
             @cancel="handleCancel"
             :confirm-loading="asyncConfirmLoading">
        <div class="block_message">
          <v-input v-model="address" type="textarea" placeholder="Please enter the address"></v-input>
        </div>
    </v-modal>
  </v-col>
</template>

<script>

import oasis from '@oasislabs/client';

export default {
  name: 'receiver',
  props: {
    name: String,
    C1: {
      type: String,
      default: ''
    },
    C2: {
      type: String,
      default: ''
    },
    D1: {
      type: String,
      default: ''
    },
    D2: {
      type: String,
      default: ''
    },
    E: {
      type: String,
      default: ''
    },
    C: {
      type: String,
      default: ''
    },
    flag_r: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      asyncConfirmLoading: false,
      flag: 0,
      visible_init: false,
      visible_addre: false,
      flag_init: false,
      flag_connect: false,
      flag_load: false,
      flag_dec: false,
      kappa: "SS512",
      g1: null,
      g2: null,
      z: null,
      u1: null,
      u2: null,
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      tag: null,
      message: null,
      address: null,
      local_gateway: 'ws://localhost:8546',
      public_gateway: 'https://gateway.devnet.oasiscloud.io',
      public_credential: '',
      status: [],
    }
  },
  methods: {
    handleCancel(){
      this.visible_init = false;
      this.visible_addre = false;
    },
    async handleOk_init() {
      this.asyncConfirmLoading = true;
      this.flag_r = true;
      this.$emit('switchAll');
      this.$http.post('/setup', {'L': this.kappa}).then((res) => {
        let jdict = JSON.parse(res.body);
        this.g1 = jdict.g1;
        this.g2 = jdict.g2;
        this.z = jdict.z;
        this.u1 = jdict.u1;
        this.u2 = jdict.u2;
        this.x1 = jdict.x1;
        this.x2 = jdict.x2;
        this.y1 = jdict.y1;
        this.y2 = jdict.y2;
        this.$emit('updatePK', {
          'g1': this.g1,
          'g2': this.g2,
          'z': this.z,
          'u1': this.u1,
          'u2': this.u2,
          'L': this.kappa,
          'C': this.C
        });
        // this.flag_r = true;
        this.visible_init = false;
        this.asyncConfirmLoading = false;
        this.flag++;
      }, (err) => {
        window.console.log(err);
      });
    },
    handleCancel_init() {
      this.visible_init = false;
    },
    async next(){
      switch(this.flag) {
        case 0:
          this.visible_init = true;
          break;
        case 1:
          this.handleConnect();
          break;
        case 2:
          this.handleFetch();
          break;
        case 3:
          this.handleDec();
          break;
        default:
          alert('You opened the Stein Gate!');
      }
    },
    async handleConnect() {
      const wallet = new oasis.Wallet('0x7ec6102f6a2786c03b3daf6ac4772491f33925902326a0d2d83521b964a87402');
      const gateway = new oasis.gateways.Web3Gateway(this.local_gateway, wallet);
      oasis.setGateway(gateway);
      this.status.push({
        'C': 'red',
        'T': 'Connected'
      });
      this.flag++;
    },
    async handleFetch() {
      this.visible_addre = true;
    },
    async handleOk_addre() {
      if( this.address == null ){
        this.$message['error']("Please check the address");
      }else{
        this.asyncConfirmLoading = true;
        const blackBox = await oasis.Service.at(new oasis.Address(this.address));
        const tag = await blackBox.fetch();
        this.tag = tag;
        this.visible_addre = false;
        this.asyncConfirmLoading = false;
        this.flag++;
      }
    },
    async handleDec() {
      this.$http.post('/dec', {
        'x1': this.x1,
        'x2': this.x2,
        'y1': this.y1,
        'y2': this.y2,
        'tag': this.tag,
        'C1': this.C1,
        'C2': this.C2,
        'D1': this.D1,
        'D2': this.D2,
        'E': this.E,
        'L': this.kappa,
        'C': this.C
      })
      .then((res) => {
        let jdict = JSON.parse(res.body);
        this.message = jdict.M;
        this.flag_r = true;
        this.flag ++;
      }, (err) => {
        window.console.log(err);
      });
    },
  }
}
</script>