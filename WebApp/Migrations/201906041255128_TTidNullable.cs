namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TTidNullable : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Tickets", name: "TicketType_Id", newName: "TicketTypeId");
            RenameIndex(table: "dbo.Tickets", name: "IX_TicketType_Id", newName: "IX_TicketTypeId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Tickets", name: "IX_TicketTypeId", newName: "IX_TicketType_Id");
            RenameColumn(table: "dbo.Tickets", name: "TicketTypeId", newName: "TicketType_Id");
        }
    }
}
