from charm.toolbox.pairinggroup import PairingGroup, ZR, G1, G2, pair, pairing, extract_key
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction

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


def execEncHandler():
  pass


def execDecHandler():
  pass