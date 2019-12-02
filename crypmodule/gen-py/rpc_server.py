import json

from module import setup

# from charm.toolbox.eccurve import secp256k1, secp192k1, secp160k1
from charm.toolbox.pairinggroup import PairingGroup, ZR, G1, G2, pair, pairing, extract_key
from collections import namedtuple
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction




from thrift.protocol import TJSONProtocol
from thrift.server import THttpServer

class TestHandler:
  def init(self, initParame):
    handret = initHandler(initParame.L)
    return setup.GetKeypairs(*handret)


    # group = PairingGroup(kappa)
    # p, g1 = (group.order(), group.random(G1))
    # x1, x2, y1, y2 = [group.random(ZR) for i in range(4)]
    # g2 = g1 ** (x1 / x2)
    # z = g1 ** x1
    # u1 = g1 ** y1
    # u2 = g2 ** y2
    # setup.GetKeypairs()

  def execEnc(self):
    pass

  def execDec(self):
    pass

processor = setup.Processor(TestHandler())
pfactory = TJSONProtocol.TJSONProtocolFactory()
server = THttpServer.THttpServer(processor, ("127.0.0.1", 2333), pfactory)
print("Starting thrift server in python...")
server.serve()