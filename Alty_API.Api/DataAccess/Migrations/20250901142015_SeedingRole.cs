using Core.Helpers;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SeedingRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          migrationBuilder.InsertData(
            table: "AspNetRoles",
            columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
            values: new object[] {Guid.NewGuid().ToString(),Consts.UserRole,Consts.UserRole.ToUpper(),Guid.NewGuid().ToString()}
          );
			migrationBuilder.InsertData(
			    table: "AspNetRoles",
			    columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
		      values: new object[] { Guid.NewGuid().ToString(), Consts.AdminRole, Consts.AdminRole.ToUpper(), Guid.NewGuid().ToString() }
		    );
		}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
      migrationBuilder.Sql("DELETE FROM [AspNetRoles]");
        }
    }
}
