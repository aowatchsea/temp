from charm.toolbox.pairinggroup import PairingGroup, ZR, G1, G2, pair, pairing, extract_key
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction
import ast
import json

def initHandler(kappa):
  group = PairingGroup(kappa)
  p, g1 = (group.order(), group.random(G1))
  x1, x2, y1, y2 = [group.random(ZR) for i in range(4)]
  g2 = g1 ** (x1 / x2)
  z = g1 ** x1
  u1 = g1 ** y1
  u2 = g2 ** y2
  ret = [bytes.decode(group.serialize(g1)), bytes.decode(group.serialize(g2)),\
         bytes.decode(group.serialize(z)), bytes.decode(group.serialize(u1)),\
         bytes.decode(group.serialize(u2)), x1, x2, y1, y2]
  return (str(k) for k in ret)

def execEncHandler(encParame):
  group = PairingGroup(encParame.L)
  g1 = group.deserialize(str.encode(encParame.g1))
  g2 = group.deserialize(str.encode(encParame.g2))
  z = group.deserialize(str.encode(encParame.z))
  u1 = group.deserialize(str.encode(encParame.u1))
  u2 = group.deserialize(str.encode(encParame.u2))
  M = str(encParame.M)

  tag = group.random(ZR)
  r1, r2 = [group.random(ZR) for i in range(2)]
  C1 = g1 ** r1
  C2 = g2 ** r2
  D1 = (z ** (tag * r1)) * (u1 ** r1)
  D2 = (z ** (tag * r2)) * (u2 ** r2)
  K = z ** (r1 + r2)
  
  msg = group.random(G1)  
  E = msg * K
  symkey = extract_key(pair(msg, msg))  

  cipherRuner = AuthenticatedCryptoAbstraction(symkey)
  C = cipherRuner.encrypt(M)  

  ret = [bytes.decode(group.serialize(C1)), bytes.decode(group.serialize(C2)),\
         bytes.decode(group.serialize(D1)), bytes.decode(group.serialize(D2)),\
         bytes.decode(group.serialize(E)), symkey, tag, json.dumps(C)]
  return (str(k) for k in ret)
  


def execDecHandler(decParame):
  group = PairingGroup(decParame.L)
  x1 = group.init(ZR, int(decParame.x1))
  x2 = group.init(ZR, int(decParame.x2))
  y1 = group.init(ZR, int(decParame.y1))
  y2 = group.init(ZR, int(decParame.y2))
  tag = group.init(ZR, int(decParame.tag))

  C = json.loads(decParame.C)

  C1 = group.deserialize(str.encode(decParame.C1))
  C2 = group.deserialize(str.encode(decParame.C2))
  D1 = group.deserialize(str.encode(decParame.D1))
  D2 = group.deserialize(str.encode(decParame.D2))
  E = group.deserialize(str.encode(decParame.E))

  s1, s2 = [group.random(ZR) for i in range(2)]
  K = (C1 ** (x1 + s1 * (tag * x1 + y1)) * C2 ** (x2 + s2 * (tag * x2 + y2))) / (D1 ** s1 * D2 ** s2)
  msg = E / K  

  symkey = extract_key(pair(msg, msg))
  cipherRuner = AuthenticatedCryptoAbstraction(symkey)
  M = cipherRuner.decrypt(C)

  return (bytes.decode(M))