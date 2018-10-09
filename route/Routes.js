module.exports = function(service){

    // selecting data from home
    async function home(req,res){

        try{
        let Numbers = await service.selectInTown();  
        let regPlates = await service.platesName();
           //console.log(regPlates)
            res.render('home', {Numbers,regPlates});
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
                let town_list = await service.selectTown(initial)
                console.log(town_list);
            
                if(town_list.length != 0){
                    let flag = await service.tryAddPlate(plate,town_list[0].id);
                    if(!flag){
                        req.flash('info', 'Oops registration number already exist')
                    }
                }
                else {
                    req.flash('info', 'Oops Invalid Plate num')
                }
             }
            res.redirect('/');
     
        } catch (err){
            res.send(err.stack)}
     }
    //    filtering towns
     async function reportFilter (req, res) {
        try{
            let initial = req.params.towns;
            let Numbers = await service.selectInTown();
            let regPlates;
            if(initial === 'All'){
                
                regPlates = await service.platesName();
               
            }else{
                regPlates = await service.filterBytown(initial);
            }
            for (let index = 0; index < Numbers.length; index++) {
                const currentTown = Numbers[index];
                if (currentTown.town_id === initial) {
                    currentTown.selected = 'selected';
                    break;
                }
            }
            // if (displayRegNum.length === 0) {
            //     req.flash('error', 'No Resgistrations Entered For Town Selected');
            // } 

            res.render('home', {initial, regPlates, Numbers})
       } catch (err) { 
           res.send(err.stack)
   
        }
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


