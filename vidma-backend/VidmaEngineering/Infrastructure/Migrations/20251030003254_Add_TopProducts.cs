using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Add_TopProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ServiceName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EnglishTitle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SinhalaTitle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TamilTitle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EnglishDesc = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SinhalaDesc = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TamilDesc = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                    table.CheckConstraint("CK_Service_Name_AllowedValues", "ServiceName IN ('Service1','Service2','Service3','Service4','Service5','Service6')");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TopProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Colors = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageLink = table.Column<string>(type: "varchar(2000)", maxLength: 2000, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopProducts", x => x.Id);
                    table.CheckConstraint("CK_TopProducts_ProductName", "ProductName IN ('Product1','Product2','Product3','Product4','Product5','Product6','Product7','Product8','Product9','Product10')");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Service",
                columns: new[] { "Id", "EnglishDesc", "EnglishTitle", "ServiceName", "SinhalaDesc", "SinhalaTitle", "TamilDesc", "TamilTitle" },
                values: new object[,]
                {
                    { 1, "Description1", "EnTitle1", "Service1", "Description1", "SiTitle1", "Description1", "TaTitle1" },
                    { 2, "Description2", "EnTitle1", "Service2", "Description2", "SiTitle1", "Description2", "TaTitle1" },
                    { 3, "Description3", "Title1", "Service3", "Description3", "Title1", "Description3", "Title1" },
                    { 4, "Description4", "Title1", "Service4", "Description4", "Title1", "Description4", "Title1" },
                    { 5, "Description5", "Title1", "Service5", "Description5", "Title1", "Description5", "Title1" },
                    { 6, "Description5", "Title1", "Service6", "Description5", "Title1", "Description5", "Title1" }
                });

            migrationBuilder.InsertData(
                table: "TopProducts",
                columns: new[] { "Id", "Colors", "Description", "ImageLink", "Name", "ProductName" },
                values: new object[,]
                {
                    { 1, "Red,Blue", "Dummy description for product 1", null, "Top Product 1", "Product1" },
                    { 2, "Green,White", "Dummy description for product 2", null, "Top Product 2", "Product2" },
                    { 3, "Black,Gray", "Dummy description for product 3", null, "Top Product 3", "Product3" },
                    { 4, "Blue,Yellow", "Dummy description for product 4", null, "Top Product 4", "Product4" },
                    { 5, "Orange,White", "Dummy description for product 5", null, "Top Product 5", "Product5" },
                    { 6, "Purple,Black", "Dummy description for product 6", null, "Top Product 6", "Product6" },
                    { 7, "Brown,Beige", "Dummy description for product 7", null, "Top Product 7", "Product7" },
                    { 8, "Silver,Gray", "Dummy description for product 8", null, "Top Product 8", "Product8" },
                    { 9, "Gold,White", "Dummy description for product 9", null, "Top Product 9", "Product9" },
                    { 10, "Teal,Black", "Dummy description for product 10", null, "Top Product 10", "Product10" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TopProducts_ProductName",
                table: "TopProducts",
                column: "ProductName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "TopProducts");
        }
    }
}
