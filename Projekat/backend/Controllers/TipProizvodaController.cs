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

    public class TipProizvodaController: ControllerBase {

        private Context Context {get; set; }

        public TipProizvodaController(Context context){
            Context=context;
        }

        [Route("DodajTipProizvoda")]
        [HttpPost]

        public async Task<ActionResult> DodajTipProizvoda([FromBody] TipProizvoda tipProizvoda){

            if(string.IsNullOrWhiteSpace(tipProizvoda.Naziv))
                return BadRequest("Ne validan naziv");
            try{

                Context.TipProizvoda.Add(tipProizvoda);
                await Context.SaveChangesAsync();
                return Ok(tipProizvoda);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("VratiTipoveProizvoda")]
        [HttpGet]

        public async Task<ActionResult> VratiTipoveProizvoda(){

            try{

                var proizvodi=await Context.TipProizvoda
                .Select(p => 
                new{
                    ID=p.Id,
                    Naziv=p.Naziv

                }).ToListAsync();

                return Ok(proizvodi);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("VratiTipProizvoda")]
        [HttpGet]

        public async Task<ActionResult> VratiTipProizvoda([FromQuery] TipProizvoda tipProizvoda){

            try{

                var tip=await Context.TipProizvoda
                .Where(p => p.Naziv==tipProizvoda.Naziv)
                .FirstOrDefaultAsync();

                if(tip != null){
                    return Ok(tipProizvoda);
                }
                else{
                    return BadRequest("Tip proizvoda ne postoji");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

/*********************Potreban**********************************************/
        [Route("VratiTipoveProizvoda/idPijace")]
        [HttpGet]
        public async Task<ActionResult> VratiTipoveProizvoda(int idPijace){

            if(idPijace<=0)
                return BadRequest("Pogresan ID");
            try{

                var tipovi=await Context.PijacaTipProizvoda
                .Include(p => p.Pijaca)
                .Include(p=>p.TipProizvoda)
                .Where(p=> p.Pijaca.Id==idPijace)
                .Select( p => new {
                    p.TipProizvoda.Id,
                    p.TipProizvoda.Naziv
                }).ToListAsync();

                return Ok(tipovi);

            }
            catch(Exception e){
                return  BadRequest(e.Message);
            }
        }
    }
}