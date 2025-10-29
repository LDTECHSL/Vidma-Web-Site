using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class _ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AboutUsImage_Image_AllowedValues",
                table: "AboutUsImage");

            migrationBuilder.AddCheckConstraint(
                name: "CK_AboutUsImage_Image_AllowedValues",
                table: "AboutUsImage",
                sql: "ImageNumber IN ('Image1','Image2','Image3','Image4','Image5')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_AboutUsImage_Image_AllowedValues",
                table: "AboutUsImage");

            migrationBuilder.AddCheckConstraint(
                name: "CK_AboutUsImage_Image_AllowedValues",
                table: "AboutUsImage",
                sql: "[Image] IN ('Image1','Image2','Image3','Image4','Image5')");
        }
    }
}
