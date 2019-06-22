namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PokusajResavanjaKonflikta : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Lines", "Version", c => c.Int(nullable: false));
            AddColumn("dbo.Stations", "Version", c => c.Int(nullable: false));
            AddColumn("dbo.Pricelists", "Version", c => c.Int(nullable: false));
            AddColumn("dbo.TicketPrices", "Version", c => c.Int(nullable: false));
            AddColumn("dbo.Timetables", "Version", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Timetables", "Version");
            DropColumn("dbo.TicketPrices", "Version");
            DropColumn("dbo.Pricelists", "Version");
            DropColumn("dbo.Stations", "Version");
            DropColumn("dbo.Lines", "Version");
        }
    }
}
