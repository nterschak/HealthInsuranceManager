using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ClaimEntityExpanded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AmountPaidAtVisit",
                table: "Claims",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AmountPlanDiscount",
                table: "Claims",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AmountPlanPaid",
                table: "Claims",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AmountYourResponsibility",
                table: "Claims",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "VisitedProvider",
                table: "Claims",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountPaidAtVisit",
                table: "Claims");

            migrationBuilder.DropColumn(
                name: "AmountPlanDiscount",
                table: "Claims");

            migrationBuilder.DropColumn(
                name: "AmountPlanPaid",
                table: "Claims");

            migrationBuilder.DropColumn(
                name: "AmountYourResponsibility",
                table: "Claims");

            migrationBuilder.DropColumn(
                name: "VisitedProvider",
                table: "Claims");
        }
    }
}
