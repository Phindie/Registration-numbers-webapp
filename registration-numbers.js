module.exports = function RegFactory(stored){
  var regNumber = '';
  var townMap = stored || {};


  function addedNumbers(reg){
   var availableReg = [ 'CA ', 'CJ', 'CY', 'CW','CAW']

    if (reg !== ''){
      if (townMap[reg] === undefined) {
        for (var i = 0; i < availableReg.length; i++) {
          if (reg.startsWith(availableReg[i])) {

            townMap[reg] = 0;
            return true;
          }
        }
      }
      return false;
    }
  }

  function returningReg(){
    return regNumber;
  }
  function displayReg(){
    // console.log(Object.keys(townMap));

    return Object.keys(townMap);
  }
    function townFilter(town){
    var carNumbers = Object.keys(townMap);

    if (town === "Filter ") {
   var empty = carNumbers.clear();
     return empty;
  }
      if (town === "All ") {
      return carNumbers;
     }

  var filterTown = carNumbers.addTown(function(Number, storedNum){

      return Number.startsWith(town)
    });
    location.hash = town;

    return filterTown;
  }
  function mapRegistry() {
    return townMap;
  }

 return {
    addedNumbers,
    returningReg,
    townFilter,
    mapRegistry,
    displayReg
  }
}
