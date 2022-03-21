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

    public class PijacaController : ControllerBase {

        private Context Context {get; set; }

        public PijacaController(Context context){
            Context=context;
        }

        [Route("DodajPijacu")]
        [HttpPost]

        public async Task<ActionResult> DodajPijacu([FromBody] Pijaca pijaca){

            if(string.IsNullOrWhiteSpace(pijaca.Naziv))
                return BadRequest("Ne validan naziv");
            try{

                Context.Pijaca.Add(pijaca);
                await Context.SaveChangesAsync();
                return Ok(pijaca);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

    /*********************************************Potreban*******************************************/
        [Route("VratiPijace")]
        [HttpGet]

        public async Task<ActionResult> VratiPijace(){

            try{

                var pijace=await Context.Pijaca
                .Select(p => 
                new{
                    ID=p.Id,
                    Naziv=p.Naziv

                }).ToListAsync();

                return Ok(pijace);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        /****************Potreban***************************/
        [Route("VratiPijaceSaTipovimaProizvoda")]
        [HttpGet]

        public async Task<ActionResult> VratiPijaceSaTipovimaProizvoda(){

            try{

                var pijace=await Context.Pijaca
                    .Include(p => p.PijacaTipProizvoda)
                    .ThenInclude(p => p.TipProizvoda)
                    .Select(p => 
                    new{
                        ID=p.Id,
                        Naziv=p.Naziv,
                        TipoviProizvoda = p.PijacaTipProizvoda
                                        .Where(q => q.Pijaca.Id==p.Id)
                                        .Select(q => 
                                        new {
                                            Id = q.TipProizvoda.Id,
                                            Naziv = q.TipProizvoda.Naziv
                                        }).ToList()

                    }).ToListAsync();
                return Ok(pijace);


                // var pijace=await Context.Pijaca
                //     .Select(p => 
                //     new{
                //         ID=p.Id,
                //         Naziv=p.Naziv,
                //     }).ToListAsync();
                
                // var tipovi= await Context.PijacaTipProizvoda
                //     .Include(p => p.Pijaca)
                //     .Include(p => p.TipProizvoda)
                //     .Select( p => new {
                //         IdPijace = p.Pijaca.Id,
                //         TipProizvoda = p.TipProizvoda
                //     })
                //     .ToListAsync();

                // var pijaceSaTipovimaProizvoda = pijace.Select(p => new {
                //     Id = p.ID,
                //     Naziv = p.Naziv,
                //     TipoviProizvoda = tipovi.Where(q => q.IdPijace==p.ID).ToList()
                // });

                // return Ok(new {
                //     pijaceSaTipovimaProizvoda
                // });
                
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("VratiPijacu")]
        [HttpGet]

        public async Task<ActionResult> VratiTipProizvoda([FromQuery] Pijaca pijacaDTO){

            try{

                var pijaca=await Context.Pijaca
                .Where(p => p.Naziv==pijacaDTO.Naziv)
                .FirstOrDefaultAsync();

                if(pijaca != null){
                    return Ok(pijaca);
                }
                else{
                    return BadRequest("Pijaca ne postoji");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}