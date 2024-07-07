using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ReimbursementMod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reimbursement_Claims_ClaimId",
                table: "Reimbursement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reimbursement",
                table: "Reimbursement");

            migrationBuilder.DropIndex(
                name: "IX_Reimbursement_ClaimId",
                table: "Reimbursement");

            migrationBuilder.RenameTable(
                name: "Reimbursement",
                newName: "Reimbursements");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reimbursements",
                table: "Reimbursements",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reimbursements_ClaimId",
                table: "Reimbursements",
                column: "ClaimId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reimbursements_Claims_ClaimId",
                table: "Reimbursements",
                column: "ClaimId",
                principalTable: "Claims",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reimbursements_Claims_ClaimId",
                table: "Reimbursements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reimbursements",
                table: "Reimbursements");

            migrationBuilder.DropIndex(
                name: "IX_Reimbursements_ClaimId",
                table: "Reimbursements");

            migrationBuilder.RenameTable(
                name: "Reimbursements",
                newName: "Reimbursement");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reimbursement",
                table: "Reimbursement",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reimbursement_ClaimId",
                table: "Reimbursement",
                column: "ClaimId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reimbursement_Claims_ClaimId",
                table: "Reimbursement",
                column: "ClaimId",
                principalTable: "Claims",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
