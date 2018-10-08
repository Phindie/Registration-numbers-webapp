let numberServices = require('../services/numberServices');
const assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_registration';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

describe('Registration number WeApp test for both front-end and back-ends', function() {

  beforeEach(async function(){
    await pool.query('delete from registry;');
  });
  

  it('it should return the Cape town registration number ', async function () {
    let service = numberServices(pool);
    await service.tryAddPlate('CA 321-123',1);
    await service.tryAddPlate('CY 321-123',2);
    await service.tryAddPlate('CW 123-321',3);
    await service.tryAddPlate('CAW 321-123',4);
  
    let plateData = await service.filterBytown('CA');
    assert.strictEqual(plateData[0].town_name, 'CA 321-123');
});

it('it should return length zero because CK is not in the database', async function () {
  let service = numberServices(pool);
  await service.tryAddPlate('CA 321-123',1);
  await service.tryAddPlate('CY 321-123',2);
  await service.tryAddPlate('CAW 123-321',1);
  await service.tryAddPlate('CL 321-123',3);
  await service.tryAddPlate('CW 321-123',4);


  let result = await service.selectPlate('CK 321-123');
  let plateData = result.length;
  assert.strictEqual(plateData, 0);
});

it('it should return the Worcester registration number ', async function () {
  let service = numberServices(pool);
  await service.tryAddPlate('CA 321-123',1);
  await service.tryAddPlate('CY 321-123',2);
  await service.tryAddPlate('CW 123-321',3);
  await service.tryAddPlate('CAW 321-123',4);

  let plateData = await service.filterBytown('CW');
  assert.strictEqual(plateData[0].town_name, 'CW 123-321');
});

it('it should return Bellville registration number ', async function () {
  let service = numberServices(pool);
  await service.tryAddPlate('CA 321-123',1);
  await service.tryAddPlate('CY 321-123',2);
  await service.tryAddPlate('CW 123-321',3);
  await service.tryAddPlate('CAW 321-123',4);

  let plateData = await service.filterBytown('CY');
  assert.strictEqual(plateData[0].town_name, 'CY 321-123');
});


it('it should return George registration number ', async function () {
  let service = numberServices(pool);
  await service.tryAddPlate('CA 321-123',1);
  await service.tryAddPlate('CY 321-123',2);
  await service.tryAddPlate('CW 123-321',3);
  await service.tryAddPlate('CAW 321-123',4);

  let plateData = await service.filterBytown('CAW');
  assert.strictEqual(plateData[0].town_name, 'CAW 321-123');
});

// it('Should return an empty list',async function() {
//   // var registration = await  Reg(pool);
//   let service = numberServices(pool);
//   await service.tryAddPlate('CJ 123-664')
//   await service.tryAddPlate('CY 543-542')
//   await service.deleteReg()

//    assert.strictEqual(await service.filterBytown(), [])
// });


  after(function() {
    pool.end();
  });
});