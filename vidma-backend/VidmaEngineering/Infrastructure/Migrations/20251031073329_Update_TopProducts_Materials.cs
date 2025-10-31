using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Update_TopProducts_Materials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Materials",
                table: "TopProducts",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Experience = table.Column<int>(type: "int", nullable: false),
                    Dealers = table.Column<int>(type: "int", nullable: false),
                    Projects = table.Column<int>(type: "int", nullable: false),
                    Points = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 1,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 2,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 3,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 4,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 5,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 6,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 7,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 8,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 9,
                column: "Materials",
                value: "Material1");

            migrationBuilder.UpdateData(
                table: "TopProducts",
                keyColumn: "Id",
                keyValue: 10,
                column: "Materials",
                value: "Material1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropColumn(
                name: "Materials",
                table: "TopProducts");
        }
    }
}
