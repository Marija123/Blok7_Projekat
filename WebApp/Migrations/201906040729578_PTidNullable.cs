namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PTidNullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            AlterColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            AlterColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id", cascadeDelete: true);
        }
    }
}
