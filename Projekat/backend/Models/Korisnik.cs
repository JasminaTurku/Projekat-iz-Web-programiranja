using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;



namespace Models
{

    public class Korisnik {

        [Key]
        public int Id {get; set; }

        [Required]
        [MaxLength(50)]
        public string KorisnickoIme{ get; set; }

        [Required]
        [MaxLength(50)]
        public string Lozinka {get; set; }

    }

}