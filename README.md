# simstore

---

## To-do

- [x] Deployed at local chain
- [x] Secret Sharing implementation
- [ ] Deployed at public chain
- [ ] Fix bugs
- [ ] logs

## Usage

**Install the Oasis Toolchain**

```{Shell}
curl --proto '=https' --tlsv1.2 -sSL https://get.oasis.dev | python
```

**Compile**

```{Shell}
cd service && oasis build
```

**Start local chain**

```{Shell}
oasis chain --interface 0.0.0.0
```

**Start Demo**

```{Shell}
cd app && yarn serve
```
