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
  6: string L,
  7: string M
}

struct RetEnc {
  1: string C1,
  2: string C2,
  3: string D1,
  4: string D2,
  5: string E,
  6: string symkey,
  7: string tag,
  8: string C
}

struct Dec {
  1: string x1,
  2: string x2,
  3: string y1,
  4: string y2,
  5: string tag,
  6: string C1,
  7: string C2,
  8: string D1,
  9: string D2,
  10: string E,
  11: string L,
  12: string C
}

struct RetDec {
  1: string M,
  2: string ok
}

service setup {
  GetKeypairs init(1: InitParame initParame)
  RetEnc execEnc(1: Enc enc)
  RetDec execDec(1: Dec dec)
}