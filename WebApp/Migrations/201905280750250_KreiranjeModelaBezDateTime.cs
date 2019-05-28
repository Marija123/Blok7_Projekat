namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KreiranjeModelaBezDateTime : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Tickets", "DateTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tickets", "DateTime", c => c.DateTime(nullable: false));
        }
    }
}
