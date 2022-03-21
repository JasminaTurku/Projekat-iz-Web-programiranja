using Microsoft.EntityFrameworkCore.Migrations;

namespace Proba.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Putanja",
                table: "Proizvod",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Putanja",
                table: "Proizvod");
        }
    }
}
