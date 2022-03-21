using Microsoft.EntityFrameworkCore.Migrations;

namespace Proba.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Lozinka = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pijaca",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pijaca", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TipProizvoda",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipProizvoda", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PijacaTipProizvoda",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PijacaId = table.Column<int>(type: "int", nullable: true),
                    TipProizvodaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PijacaTipProizvoda", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PijacaTipProizvoda_Pijaca_PijacaId",
                        column: x => x.PijacaId,
                        principalTable: "Pijaca",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PijacaTipProizvoda_TipProizvoda_TipProizvodaId",
                        column: x => x.TipProizvodaId,
                        principalTable: "TipProizvoda",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Proizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TipProizvodaId = table.Column<int>(type: "int", nullable: true),
                    PijacaId = table.Column<int>(type: "int", nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Dostupan = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Proizvod_Pijaca_PijacaId",
                        column: x => x.PijacaId,
                        principalTable: "Pijaca",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Proizvod_TipProizvoda_TipProizvodaId",
                        column: x => x.TipProizvodaId,
                        principalTable: "TipProizvoda",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PijacaTipProizvoda_PijacaId",
                table: "PijacaTipProizvoda",
                column: "PijacaId");

            migrationBuilder.CreateIndex(
                name: "IX_PijacaTipProizvoda_TipProizvodaId",
                table: "PijacaTipProizvoda",
                column: "TipProizvodaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_PijacaId",
                table: "Proizvod",
                column: "PijacaId");

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_TipProizvodaId",
                table: "Proizvod",
                column: "TipProizvodaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "PijacaTipProizvoda");

            migrationBuilder.DropTable(
                name: "Proizvod");

            migrationBuilder.DropTable(
                name: "Pijaca");

            migrationBuilder.DropTable(
                name: "TipProizvoda");
        }
    }
}
