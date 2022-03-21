using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;

namespace Models{

    public class Pijaca{

        [Key]
        public int Id {get; set; }

        public string Naziv {get; set; }
        public List<PijacaTipProizvoda> PijacaTipProizvoda {get; set; }

        public List<Proizvod> Proizvodi {get; set; }
    }

}