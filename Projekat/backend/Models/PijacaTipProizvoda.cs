using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;

namespace Models{

    public class PijacaTipProizvoda{

        [Key]
        public int Id {get; set; }

        public Pijaca Pijaca {get; set; }

        public TipProizvoda TipProizvoda {get; set; }
    }

}