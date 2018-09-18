module.exports = function(service){

    async function home(req,res){

        try{
        let Numbers = await service.platesName();  
            res.render('home', {Numbers});
        }catch(err){

        }
        
    }
    async function reporting(req,res) {
        try{
            let plate = req.body.nums;
            if (plate === '' || plate === undefined){
                req.flash('info', "Please Enter a valid registration number")
            }else{
                let list = plate.substring(0,3);
                let  initial = list[0];
                let town_list = await service.selectTown(initial);
                console.log(town_list)
                if(town_list.lenght != 0){
                    //let flag = await service.tryAddPlate(plate,town_list);

                    let flag = await service.tryAddPlate(plate,town_list[0].id);
                    if(!flag){
                        req.flash('info', 'cannot enter plate thar already exist')
                    }else {
                        req.flash('found',plate)
                    }
                }
                else{
                    req.flash('info',"Please does not exist")
                }
            }
            res.redirect('report');
     
        } catch (err){
            res.send(err.stack)}
     }
     return {
        reporting,
        home
     }
}

