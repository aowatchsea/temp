from module import setup
from tag_util import initHandler, execEncHandler, execDecHandler

from thrift.protocol import TJSONProtocol
from thrift.server import THttpServer

class TestHandler:
  def init(self, initParame):
    handret = initHandler(initParame.L)
    return setup.GetKeypairs(*handret)
    
  def execEnc(self, encParame):
    handret = execEncHandler(encParame)
    return setup.RetEnc(*handret)    

  def execDec(self, decParame):
    handret = execDecHandler(decParame)
    return setup.RetDec(handret)

processor = setup.Processor(TestHandler())
pfactory = TJSONProtocol.TJSONProtocolFactory()
server = THttpServer.THttpServer(processor, ("127.0.0.1", 2333), pfactory)
print("Starting thrift server in python...")
server.serve()