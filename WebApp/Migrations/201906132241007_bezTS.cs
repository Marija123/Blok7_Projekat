namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bezTS : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Lines", "RowVersion");
            DropColumn("dbo.Stations", "RowVersion");
            DropColumn("dbo.Timetables", "RowVersion");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Timetables", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Stations", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Lines", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
    }
}
