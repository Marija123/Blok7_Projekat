namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KreiranjeModelaSaDayType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Timetables", "Day", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Timetables", "Day");
        }
    }
}
