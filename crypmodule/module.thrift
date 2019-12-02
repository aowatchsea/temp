struct InitParame {
  1: string L
}

struct GetKeypairs {
  1: string g1,
  2: string g2,
  3: string z,
  4: string u1,
  5: string u2,
  6: string x1,
  7: string x2,
  8: string y1,
  9: string y2
}

struct Enc {
  1: string g1,
  2: string g2,
  3: string z,
  4: string u1,
  5: string u2,
  6: string tag
}

struct RetEnc {
  1: string symkey
  2: string ctx
}

struct Dec {
  1: string x1,
  2: string x2,
  3: string y1,
  4: string y2,
  5: string tag,
  6: string ctx
}

struct RetDec {
  1: string symkey
}

service setup {
  GetKeypairs init(1: InitParame initParame)
  RetEnc execEnc(1: Enc enc)
  RetDec execDec(1: Dec dec)
}