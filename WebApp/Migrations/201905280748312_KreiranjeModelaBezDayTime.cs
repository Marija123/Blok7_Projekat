namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KreiranjeModelaBezDayTime : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Timetables", "Day");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Timetables", "Day", c => c.Int(nullable: false));
        }
    }
}
