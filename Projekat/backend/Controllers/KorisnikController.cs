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

    public class KorisnikController : ControllerBase{

        private Context Context {get; set; }

        public KorisnikController(Context context){
            Context=context;
        }

        [Route("DodajKorisnika")]
        [HttpPost]

        public async Task<ActionResult> DodajKorisnika([FromBody] Korisnik korisnik){
            if(string.IsNullOrWhiteSpace(korisnik.KorisnickoIme))
                return BadRequest("Ne validno korisnicko ime");
            if(string.IsNullOrWhiteSpace(korisnik.Lozinka))
                return BadRequest("Pogresana lozinka");
        
            
            try{
                var k = await Context.Korisnik
                .Where( p => p.KorisnickoIme==korisnik.KorisnickoIme)
                .FirstOrDefaultAsync();

                if(k==null){
                    Context.Korisnik.Add(korisnik);
                    await Context.SaveChangesAsync();
                    return Ok(korisnik);
                }
                else{
                    return BadRequest("Korisnik vec postoji");
                }

           
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }

        }

        /*----------------------Potreban Za Login---------------------------------*/
        [Route("VratiKorisnika")]
        [HttpGet]

        public async Task<ActionResult> VratiKorisnika([FromQuery] string korisnickoIme, [FromQuery] string lozinka){

            if(string.IsNullOrWhiteSpace(korisnickoIme) || string.IsNullOrWhiteSpace(lozinka))
                return BadRequest("Nevalidni podaci");
            
            try{

                var korisnik=await Context.Korisnik
                .Where(p => p.KorisnickoIme==korisnickoIme && p.Lozinka==lozinka)
                .FirstOrDefaultAsync();

                if(korisnik!=null){
                    return Ok(korisnik);
                }
                else{
                    return BadRequest("Korisnik ne postoji");
                }
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("VratiKorisnike")]
        [HttpGet]

        public async Task<ActionResult> VratiKorisnike(){

            try{

                var korisnici=await Context.Korisnik
                .Select(korisnik => 
                new {

                    ID=korisnik.Id,
                    KorisnickoIme=korisnik.KorisnickoIme,
                    Lozinka= korisnik.Lozinka

                }).ToListAsync();

                return Ok(korisnici);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("Promeni")]
        [HttpPut]

        public async Task<ActionResult> Promeni([FromBody] Korisnik korisnik){

            if(string.IsNullOrWhiteSpace(korisnik.KorisnickoIme))
                return BadRequest("Ne validno kolrisnicko ime");
            
            if(string.IsNullOrWhiteSpace(korisnik.Lozinka))
                return BadRequest("Ne validna loznika");
            
            
            try{
                 Context.Korisnik.Update(korisnik);
                 await Context.SaveChangesAsync();
                 return Ok("Uspesno ste promenili korisnika");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
            
        }

        [Route("IzbrisiKorisnika")]
        [HttpDelete]

        public async Task<ActionResult> IzbrisiKorisnika(int id){

            if(id <=0){
                return BadRequest("Pogresan Id");
            }
            try{

                var korisnik=await Context.Korisnik.FindAsync(id);
                Context.Korisnik.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izbrisan korisnik");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }


}