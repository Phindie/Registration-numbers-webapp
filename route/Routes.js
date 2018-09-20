module.exports = function(service){

    // selecting data from home
    async function home(req,res){

        try{
        let Numbers = await service.platesName();  
            res.render('home', {Numbers});
        }catch(err){

        }
        
    }
    // displaying or reporting what on my registrations
    async function reporting(req,res) {
        try{
            let plate = req.body.nums;
            if (plate === '' || plate === undefined){
                req.flash('info', "Please Enter a valid registration number: eg CA,CAW,CY,CJ,CW")
            }else{
                let list = plate.split(' ');
                let  initial = list[0];
                let town_list = await service.selectTown(initial);
                if(town_list.lenght != 0){
                    let flag = await service.tryAddPlate(plate,town_list[0].id);
                    if(!flag){
                        req.flash('info', 'Oops number plate already exist')
                    }
                }
            
            }
            res.redirect('/');
     
        } catch (err){
            res.send(err.stack)}
     }
    //    filtering towns
     async function reportFilter (req, res) {
        try{
            let regPlates = req.params.town;
            let Numbers;
            
            console.log(regPlates);
            if(regPlates === 'All'){
                
                Numbers = await service.platesName();
            } else {
                
                Numbers = await service.filterBytown(regPlates);
                
            }
         res.render('home', {regPlates,Numbers})

        } catch (err) { res.send(err.stack)}

        
    }
    //  clear my table
     async function deleteReg(req, res) {
        try{
            await service.remove();
            res.redirect('/');
        } catch (err) {
            res.send(err.stack)
        }
    }

   
     return {
        reporting,
        home,
        deleteReg,
        reportFilter,
        
    
     }
}

