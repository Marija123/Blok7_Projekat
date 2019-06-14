namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class kreiranjeModela : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Lines", "RowVersion");
            DropColumn("dbo.Stations", "RowVersion");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stations", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Lines", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
    }
}
