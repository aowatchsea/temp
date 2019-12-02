//
// Autogenerated by Thrift Compiler (0.13.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
if (typeof Int64 === 'undefined' && typeof require === 'function') {
  var Int64 = require('node-int64');
}


InitParame = function(args) {
  this.L = null;
  if (args) {
    if (args.L !== undefined && args.L !== null) {
      this.L = args.L;
    }
  }
};
InitParame.prototype = {};
InitParame.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.L = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

InitParame.prototype.write = function(output) {
  output.writeStructBegin('InitParame');
  if (this.L !== null && this.L !== undefined) {
    output.writeFieldBegin('L', Thrift.Type.STRING, 1);
    output.writeString(this.L);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GetKeypairs = function(args) {
  this.g1 = null;
  this.g2 = null;
  this.z = null;
  this.u1 = null;
  this.u2 = null;
  this.x1 = null;
  this.x2 = null;
  this.y1 = null;
  this.y2 = null;
  if (args) {
    if (args.g1 !== undefined && args.g1 !== null) {
      this.g1 = args.g1;
    }
    if (args.g2 !== undefined && args.g2 !== null) {
      this.g2 = args.g2;
    }
    if (args.z !== undefined && args.z !== null) {
      this.z = args.z;
    }
    if (args.u1 !== undefined && args.u1 !== null) {
      this.u1 = args.u1;
    }
    if (args.u2 !== undefined && args.u2 !== null) {
      this.u2 = args.u2;
    }
    if (args.x1 !== undefined && args.x1 !== null) {
      this.x1 = args.x1;
    }
    if (args.x2 !== undefined && args.x2 !== null) {
      this.x2 = args.x2;
    }
    if (args.y1 !== undefined && args.y1 !== null) {
      this.y1 = args.y1;
    }
    if (args.y2 !== undefined && args.y2 !== null) {
      this.y2 = args.y2;
    }
  }
};
GetKeypairs.prototype = {};
GetKeypairs.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.g1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.g2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.z = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.u1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.u2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.x1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.x2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.y1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.y2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GetKeypairs.prototype.write = function(output) {
  output.writeStructBegin('GetKeypairs');
  if (this.g1 !== null && this.g1 !== undefined) {
    output.writeFieldBegin('g1', Thrift.Type.STRING, 1);
    output.writeString(this.g1);
    output.writeFieldEnd();
  }
  if (this.g2 !== null && this.g2 !== undefined) {
    output.writeFieldBegin('g2', Thrift.Type.STRING, 2);
    output.writeString(this.g2);
    output.writeFieldEnd();
  }
  if (this.z !== null && this.z !== undefined) {
    output.writeFieldBegin('z', Thrift.Type.STRING, 3);
    output.writeString(this.z);
    output.writeFieldEnd();
  }
  if (this.u1 !== null && this.u1 !== undefined) {
    output.writeFieldBegin('u1', Thrift.Type.STRING, 4);
    output.writeString(this.u1);
    output.writeFieldEnd();
  }
  if (this.u2 !== null && this.u2 !== undefined) {
    output.writeFieldBegin('u2', Thrift.Type.STRING, 5);
    output.writeString(this.u2);
    output.writeFieldEnd();
  }
  if (this.x1 !== null && this.x1 !== undefined) {
    output.writeFieldBegin('x1', Thrift.Type.STRING, 6);
    output.writeString(this.x1);
    output.writeFieldEnd();
  }
  if (this.x2 !== null && this.x2 !== undefined) {
    output.writeFieldBegin('x2', Thrift.Type.STRING, 7);
    output.writeString(this.x2);
    output.writeFieldEnd();
  }
  if (this.y1 !== null && this.y1 !== undefined) {
    output.writeFieldBegin('y1', Thrift.Type.STRING, 8);
    output.writeString(this.y1);
    output.writeFieldEnd();
  }
  if (this.y2 !== null && this.y2 !== undefined) {
    output.writeFieldBegin('y2', Thrift.Type.STRING, 9);
    output.writeString(this.y2);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Enc = function(args) {
  this.g1 = null;
  this.g2 = null;
  this.z = null;
  this.u1 = null;
  this.u2 = null;
  if (args) {
    if (args.g1 !== undefined && args.g1 !== null) {
      this.g1 = args.g1;
    }
    if (args.g2 !== undefined && args.g2 !== null) {
      this.g2 = args.g2;
    }
    if (args.z !== undefined && args.z !== null) {
      this.z = args.z;
    }
    if (args.u1 !== undefined && args.u1 !== null) {
      this.u1 = args.u1;
    }
    if (args.u2 !== undefined && args.u2 !== null) {
      this.u2 = args.u2;
    }
  }
};
Enc.prototype = {};
Enc.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.g1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.g2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.z = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.u1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.u2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Enc.prototype.write = function(output) {
  output.writeStructBegin('Enc');
  if (this.g1 !== null && this.g1 !== undefined) {
    output.writeFieldBegin('g1', Thrift.Type.STRING, 1);
    output.writeString(this.g1);
    output.writeFieldEnd();
  }
  if (this.g2 !== null && this.g2 !== undefined) {
    output.writeFieldBegin('g2', Thrift.Type.STRING, 2);
    output.writeString(this.g2);
    output.writeFieldEnd();
  }
  if (this.z !== null && this.z !== undefined) {
    output.writeFieldBegin('z', Thrift.Type.STRING, 3);
    output.writeString(this.z);
    output.writeFieldEnd();
  }
  if (this.u1 !== null && this.u1 !== undefined) {
    output.writeFieldBegin('u1', Thrift.Type.STRING, 4);
    output.writeString(this.u1);
    output.writeFieldEnd();
  }
  if (this.u2 !== null && this.u2 !== undefined) {
    output.writeFieldBegin('u2', Thrift.Type.STRING, 5);
    output.writeString(this.u2);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

RetEnc = function(args) {
  this.symkey = null;
  this.ctx = null;
  if (args) {
    if (args.symkey !== undefined && args.symkey !== null) {
      this.symkey = args.symkey;
    }
    if (args.ctx !== undefined && args.ctx !== null) {
      this.ctx = args.ctx;
    }
  }
};
RetEnc.prototype = {};
RetEnc.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.symkey = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.ctx = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

RetEnc.prototype.write = function(output) {
  output.writeStructBegin('RetEnc');
  if (this.symkey !== null && this.symkey !== undefined) {
    output.writeFieldBegin('symkey', Thrift.Type.STRING, 1);
    output.writeString(this.symkey);
    output.writeFieldEnd();
  }
  if (this.ctx !== null && this.ctx !== undefined) {
    output.writeFieldBegin('ctx', Thrift.Type.STRING, 2);
    output.writeString(this.ctx);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Dec = function(args) {
  this.x1 = null;
  this.x2 = null;
  this.y1 = null;
  this.y2 = null;
  this.tag = null;
  this.ctx = null;
  if (args) {
    if (args.x1 !== undefined && args.x1 !== null) {
      this.x1 = args.x1;
    }
    if (args.x2 !== undefined && args.x2 !== null) {
      this.x2 = args.x2;
    }
    if (args.y1 !== undefined && args.y1 !== null) {
      this.y1 = args.y1;
    }
    if (args.y2 !== undefined && args.y2 !== null) {
      this.y2 = args.y2;
    }
    if (args.tag !== undefined && args.tag !== null) {
      this.tag = args.tag;
    }
    if (args.ctx !== undefined && args.ctx !== null) {
      this.ctx = args.ctx;
    }
  }
};
Dec.prototype = {};
Dec.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.x1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.x2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.y1 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.y2 = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.tag = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.ctx = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Dec.prototype.write = function(output) {
  output.writeStructBegin('Dec');
  if (this.x1 !== null && this.x1 !== undefined) {
    output.writeFieldBegin('x1', Thrift.Type.STRING, 1);
    output.writeString(this.x1);
    output.writeFieldEnd();
  }
  if (this.x2 !== null && this.x2 !== undefined) {
    output.writeFieldBegin('x2', Thrift.Type.STRING, 2);
    output.writeString(this.x2);
    output.writeFieldEnd();
  }
  if (this.y1 !== null && this.y1 !== undefined) {
    output.writeFieldBegin('y1', Thrift.Type.STRING, 3);
    output.writeString(this.y1);
    output.writeFieldEnd();
  }
  if (this.y2 !== null && this.y2 !== undefined) {
    output.writeFieldBegin('y2', Thrift.Type.STRING, 4);
    output.writeString(this.y2);
    output.writeFieldEnd();
  }
  if (this.tag !== null && this.tag !== undefined) {
    output.writeFieldBegin('tag', Thrift.Type.STRING, 5);
    output.writeString(this.tag);
    output.writeFieldEnd();
  }
  if (this.ctx !== null && this.ctx !== undefined) {
    output.writeFieldBegin('ctx', Thrift.Type.STRING, 6);
    output.writeString(this.ctx);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

RetDec = function(args) {
  this.symkey = null;
  if (args) {
    if (args.symkey !== undefined && args.symkey !== null) {
      this.symkey = args.symkey;
    }
  }
};
RetDec.prototype = {};
RetDec.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.symkey = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

RetDec.prototype.write = function(output) {
  output.writeStructBegin('RetDec');
  if (this.symkey !== null && this.symkey !== undefined) {
    output.writeFieldBegin('symkey', Thrift.Type.STRING, 1);
    output.writeString(this.symkey);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

