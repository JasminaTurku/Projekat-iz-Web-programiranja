using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;

namespace Models{

    public class Proizvod{

        [Key]
        public int Id {get; set;}

        [Required]
        [MaxLength(50)]
        public string Naziv {get; set; }

        [JsonIgnore]
        public TipProizvoda TipProizvoda {get; set; }

        [JsonIgnore]
        public Pijaca Pijaca {get; set; }

        public int Cena {get; set; }

        public bool Dostupan {get; set; }

        public string Putanja {get; set;}
        
    }
}