namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class KreiranjeModelaSaDateTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "DateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tickets", "DateTime");
        }
    }
}
