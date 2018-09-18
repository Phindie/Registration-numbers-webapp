module.exports = function(pool){
  
async function platesName(){
    let result = await pool.query('select * from registry');
    return result.rows;
}

async function filterBytown(town){
    let filtered = await pool.query('select * from registry where town_id LIKE $1',['%'+town+'%']);
    return filtered.rows;
}

async function selectTown(name){
    let town = await pool.query('select * from towns where town_id = $1',[name]);
    return town.rows;
}
async function selectPlate(plate){
   let result = await pool.query('select * from registry where town_id = $1', [plate]);
   return result.rows; 
}
  
async function insertPlate(number, regNum){
    await pool.query('insert into registry (town_name,town_id) value ($1,$2)',[number, regNum]);

}

async function tryAddPlate(plate,id){
    let result = await selectPlate(plate);
    if (result.length !=0){
        return false;
    }
    else{
        await insertPlate(plate,id);
        return true;
    }
}

return {
    platesName,
    filterBytown,
    selectTown,
    selectPlate,
    insertPlate,
    tryAddPlate
}
}