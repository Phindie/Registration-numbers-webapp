
describe('The registration number Widget Function', function(){

it('should return true if registration matches the given regnumber for Cape town', function(){

  var selectPlate = RegFactory();
assert.equal(selectPlate.addedNumbers('CA 980 631'),true );
});

it('should return true if registration matches the given regnumber for Bellville', function(){
var selectPlate = RegFactory();

assert.equal(selectPlate.addedNumbers('CY 125 876'), true);
  });
it('should return true if registration matches the given regnumber for Paarl', function(){
var selectPlate = RegFactory();

assert.equal(selectPlate.addedNumbers('CJ 125 567'), true);
  })
  it('should return true if registration matches the given regnumber for Paarl', function(){
  var selectPlate = RegFactory();

  assert.equal(selectPlate.addedNumbers('CAW 125 567'), true);
    })

it('should return true if registration matches the given regnumber for Worcester', function(){
var selectPlate = RegFactory();

assert.equal(selectPlate.addedNumbers('CW 125 34'), true);
});

it('should return false if the registration does not match the given regnumber', function(){
var selectPlate = RegFactory();

assert.equal(selectPlate.addedNumbers('CAA 125 123'), false);
  });

it('should map registrations from the given regnumbers only', function(){
var selectPlate = RegFactory();

selectPlate.addedNumbers("CY 156 234");
selectPlate.addedNumbers("CK 124 873");
selectPlate.addedNumbers("CJ 432 23");
selectPlate.addedNumbers("LN 253 7754");

assert.deepEqual(selectPlate .mapRegistry(), { 'CY 156 234': 0, 'CJ 432 23': 0 })
});

it('should return CA registrations only, if filtered for Cape Town', function(){
var selectPlate = RegFactory();

selectPlate.addedNumbers("CA 754 342");
selectPlate.addedNumbers("CA 6734");
selectPlate.addedNumbers("CAW 2659");
assert.deepEqual(selectPlate.townFilter('CA '), ['CA 754 342','CA 6734'])
});
it('should take stored map and return it', function(){
var storage = {'CA 6734':0, 'CAW 2659':0,'CW 7653':0 }
var  selectPlate = RegFactory(storage);

assert.deepEqual(selectPlate.mapRegistry(), {'CA 6734':0, 'CAW 2659':0,'CW 7653':0 })
});
});
