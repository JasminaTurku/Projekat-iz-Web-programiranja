using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;


namespace Moja_Aplikacija.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class ProizvodController : ControllerBase {

        private Context Context {get; set; }

        public ProizvodController(Context context){
            Context=context;
        }

        /*************************Potreban********************************************/
        [Route("DodajProizvod/idTipaProizvoda/idPijace")]
        [HttpPost]

        public async Task<ActionResult> DodajProizvod([FromBody] Proizvod proizvod, int idTipaProizvoda, int  idPijace){

            if(idTipaProizvoda<=0 && idPijace<=0)
                return BadRequest("Nevalidan ID");
            try{
                /*provera da li mozda takav proizvod vec postoji*/
                var postoji = await Context.Proizvod
                                .Include(p => p.Pijaca)
                                .Include(p => p.TipProizvoda)
                                .Where(p => p.Pijaca.Id==idPijace)
                                .Where(p => p.TipProizvoda.Id==idTipaProizvoda)
                                .Where(p => p.Naziv==proizvod.Naziv)
                                .FirstOrDefaultAsync(); 

                if(postoji!=null)
                    return BadRequest("Proizvod sa takvim imenom vec postoji!");


                var tipProizvoda=await Context.TipProizvoda 
                .Where(p => p.Id==idTipaProizvoda)
                .FirstOrDefaultAsync();

                proizvod.TipProizvoda=tipProizvoda;

                var pijaca= await Context.Pijaca
                .Where(p => p.Id==idPijace)
                .FirstOrDefaultAsync();

                proizvod.Pijaca=pijaca;

                Context.Proizvod.Add(proizvod);
                await Context.SaveChangesAsync();
                return Ok(new {

                    ID=proizvod.Id,
                    Naziv=proizvod.Naziv,
                    Cena=proizvod.Cena,
                    Dostupan=proizvod.Dostupan,
                    Putanja=proizvod.Putanja,
                    IdTipaProizvoda = proizvod.TipProizvoda.Id

                });
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }


        [Route("VratiProizvode")]
        [HttpGet]

        public async Task<ActionResult> VratiProizvode(){
            try{

                var proizvodi=await Context.Proizvod
                .Select(p => 
                new {
                    ID=p.Id,
                    Naziv=p.Naziv,
                    Cena=p.Cena,
                    Dostupan=p.Dostupan,
                    Putanja=p.Putanja,
                    IdTipaProizvoda = p.TipProizvoda.Id

                }).ToListAsync();

                return Ok(proizvodi);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("VratiProizvod")]
        [HttpGet]

        public async Task<ActionResult> VratiProizvod([FromQuery] Proizvod proizvod){

            try{

                var p=await Context.Proizvod
                .Where(p => p.Naziv==proizvod.Naziv)
                .FirstOrDefaultAsync();

                if(p !=null){
                    return Ok(proizvod);
                }
                else{
                    return BadRequest("Ne postoji proizvod");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        /**************************Potreban***************************************/

        [Route("VratiProizvodePijace")]
        [HttpGet]

        public async Task<ActionResult> VratiProizvodePijace([FromQuery] int idPijace, [FromQuery] int idTipaProizvoda, [FromQuery] int? cenaOd, [FromQuery] int? cenaDo){

            if(idPijace<=0 || idTipaProizvoda<=0){
                return BadRequest("Nevalidan ID");
            }
            try{
                var tipProizvoda = await Context.TipProizvoda.FindAsync(idTipaProizvoda);
                
                var proizvodi= Context.Proizvod
                .Include(p => p.Pijaca)
                .Where(p=> p.Pijaca.Id==idPijace);

                if(!tipProizvoda.Naziv.Equals("Sve"))
                    proizvodi = proizvodi
                                .Include(p => p.TipProizvoda)
                                .Where(p=> p.TipProizvoda.Id==idTipaProizvoda);

                if(cenaOd!=null)
                    proizvodi=proizvodi.Where(p => p.Cena >=cenaOd);

                if(cenaDo!=null)
                    proizvodi=proizvodi.Where(p => p.Cena <=cenaDo);

                var pom = await  proizvodi.Select(p => 
                new {
                    ID=p.Id,
                    Naziv=p.Naziv,
                    Cena=p.Cena,
                    Dostupan=p.Dostupan,
                    Putanja=p.Putanja,
                    IdTipaProizvoda = p.TipProizvoda.Id

                }).ToListAsync();

                return Ok(pom);
                
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    /*******************************************Potreban************************/
        [Route("IzmeniProizvod/idTipaProizvoda/idProizvoda/naziv/cena/dostupan/putanja/idPijace")]
        [HttpPut]

        public async Task<ActionResult> IzmeniProizvod(int idTipaProizvoda, int idProizvoda, string naziv, int cena, bool dostupan, string putanja, int idPijace){

            if(idTipaProizvoda <=0 || idProizvoda<=0 || cena <= 0){
                return BadRequest("Pogresni podaci");
            }
            if(string.IsNullOrWhiteSpace(naziv) || string.IsNullOrWhiteSpace(putanja))
                return BadRequest("Pogresni podaci");
            try{
                
                /*proveravamo da li postoji drugi proizvod koji se isto zove*/   
                var postoji = await Context.Proizvod
                .Include(p => p.Pijaca)
                .Include(p => p.TipProizvoda)
                .Where(p => p.Pijaca.Id==idPijace)
                .Where(p => p.TipProizvoda.Id==idTipaProizvoda)
                .Where(p => p.Naziv==naziv)
                .Where(p => p.Id!=idProizvoda)
                .FirstOrDefaultAsync(); 

                if(postoji!=null)
                    return BadRequest("Proizvod sa takvim imenom vec postoji!");


                var proizvod=await Context.Proizvod.Where(p => p.Id==idProizvoda).FirstOrDefaultAsync();
                proizvod.Naziv=naziv;
                proizvod.Cena=cena;
                proizvod.Dostupan=dostupan; 
                proizvod.Putanja=putanja;

                var tipProizvoda=await Context.TipProizvoda.FindAsync(idTipaProizvoda);
                proizvod.TipProizvoda=tipProizvoda;

                Context.Proizvod.Update(proizvod);
                await Context.SaveChangesAsync();
                return Ok(proizvod); 

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    /**************************Potreban***********************************/
        [Route("ObrisiProizvod/idProizvoda")]
        [HttpDelete]

        public async Task<ActionResult> ObrisiProizvod(int idProizvoda){
            if(idProizvoda<=0)
                return BadRequest("Uneli ste pogresan Id");

            try{

                var proizvod=await Context.Proizvod.Where(p => p.Id==idProizvoda).FirstOrDefaultAsync();

                if(proizvod==null)
                    return BadRequest("Proizvod ne postoji");

                Context.Proizvod.Remove(proizvod);
                await Context.SaveChangesAsync();

                return Ok(proizvod);

            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    /*************************Potreban za PonudaProizvoda***********************************************/
        [Route("VratiPonuduProizvoda")]
        [HttpGet]

        public async Task<ActionResult> VratiPonuduProizvoda([FromQuery] int idPijace, [FromQuery] int idTipaProizvoda, [FromQuery] string nazivProizvoda){

            try{
                var tipProizvoda = await Context.TipProizvoda.FindAsync(idTipaProizvoda);

                var res= Context.Proizvod
                .Include(p => p.Pijaca)
                .Include(p => p.TipProizvoda)
                .Where(p => p.Pijaca.Id==idPijace);
                
                if(!tipProizvoda.Naziv.Equals("Sve"))
                    res = res.Where(p => p.TipProizvoda.Id==idTipaProizvoda);

                if(nazivProizvoda!=null){
                    res=res.Where(p => p.Naziv.Contains(nazivProizvoda));
                }
                
                var proizvodi= await res.Select(p => 
                new{
                    ID=p.Id,
                    Naziv=p.Naziv,
                    Cena=p.Cena,
                    Dostupan=p.Dostupan,
                    Putanja=p.Putanja,
                    IdTipaProizvoda = p.TipProizvoda.Id
                })
                .ToListAsync();

                return Ok(proizvodi);


            }
            catch(Exception e){
                return BadRequest(e.StackTrace);
            }
        }
    }

}