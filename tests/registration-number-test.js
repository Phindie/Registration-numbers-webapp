
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
    await pool.query('delete from registry');
  });
  
it('should return empty users data ', async function() {
    var services = Services(pool);
    let results = await services.selectAlldata();
    assert.strictEqual(results.length, 0);
  });

it('Should return the greet in English ', async function() {
    var services = Services(pool);
    await services.addUsersOrIncrement('Phindi', 'Hello');
    let results = await services.selectAlldata();
    assert.strictEqual(results.length, 1);
  });

  after(function() {
    pool.end();
  });
});