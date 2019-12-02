import oasis from '@oasislabs/client';
const fs = require('fs');

jest.setTimeout(20000);

describe('Simstore', () => {
  let service;

  beforeAll(async () => {
    service = await oasis.workspace.Simstore.deploy('Here is a secret',{
      header: { confidential: false },
      gasLimit: '0xe79732',
    });
  });

  it('TEST #0', async () => {
    let ret = await service.fetch();
    fs.writeFile('./records.txt', ret, (err) => {
      console.log(err);
    });
    // console.log(ret);
  });

  it('TEST #1', async () => {
    expect(await service.store('233333'));
  });

  it('TEST #3', async () => {
    let ret = await service.fetch();
    console.log(ret);    
  });

  afterAll(() => {
    oasis.disconnect();
  });
});
