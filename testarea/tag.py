from charm.toolbox.pairinggroup import PairingGroup, ZR, G1, G2, pair, pairing, extract_key
from collections import namedtuple
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction

PublicKeys = namedtuple('PublicKeys', ['group', 'p', 'g1', 'g2', 'z', 'u1', 'u2'])
PrivateKeys = namedtuple('PrivateKeys', ['x1', 'x2', 'y1', 'y2'])
Ciphertext = namedtuple('Ciphertext', ['C1', 'C2', 'D1', 'D2', 'E'])

class Setup:
  def __init__(self, kappa):
    group = PairingGroup(kappa)
    p, g1 = (group.order(), group.random(G1))
    x1, x2, y1, y2 = [group.random(ZR) for i in range(4)]
    g2 = g1 ** (x1 / x2)
    z = g1 ** x1
    u1 = g1 ** y1
    u2 = g2 ** y2
    self.pk = PublicKeys(group, p, g1, g2, z, u1, u2)
    self.sk = PrivateKeys(x1, x2, y1, y2)
  def get_pk(self):
    return self.pk
  def get_sk(self):
    return self.sk

class Entity:
  def __init__(self):
    pass

  def enc(self, pk, tag, msg):
    group = pk.group
    r1, r2 = [group.random(ZR) for i in range(2)]
    C1 = pk.g1 ** r1
    C2 = pk.g2 ** r2
    D1 = (pk.z ** (tag * r1)) * (pk.u1 ** r1)
    D2 = (pk.z ** (tag * r2)) * (pk.u2 ** r2)
    K = pk.z ** (r1 + r2)
    E = msg * K
    self.symkey = extract_key(pair(msg, msg))
    return Ciphertext(C1, C2, D1, D2, E)

  def dec(self, sk, tag, ctx, group):
    s1, s2 = [group.random(ZR) for i in range(2)]
    K = (ctx.C1 ** ( sk.x1 + s1 * (tag * sk.x1 + sk.y1)) * ctx.C2 ** (sk.x2 + s2 * (tag * sk.x2 + sk.y2))) / (ctx.D1 ** s1 * ctx.D2 ** s2)
    M = ctx.E / K
    self.symkey = extract_key(pair(M, M))
    return M

  def symEnc(self, message):
    try:
      cipher = AuthenticatedCryptoAbstraction(self.symkey)
      return cipher.encrypt(message)
    except AttributeError:
      print('Please init a symmetric key')
      raise

    # if not hasattr(self, 'symkey'):
  
  def symDec(self, ciphtext):
    try:
      cipher = AuthenticatedCryptoAbstraction(self.symkey)
      return cipher.decrypt(ciphtext)
    except AttributeError:
      print('Please init a symmetric key')
      raise

if __name__ == '__main__':
  runsetup = Setup('SS512')
  pk = runsetup.get_pk()
  sk = runsetup.get_sk()
  t = pk.group.random(ZR)
  M = pk.group.random(G1)
  # print(M)

  receiver = Entity()
  ctext = receiver.enc(pk, t, M)
  
  FFF = receiver.symEnc('hello world!')

  sender = Entity()
  sender.dec(sk, t, ctext, pk.group)
  DDD = sender.symDec(FFF)
  print(DDD)
  # print()


