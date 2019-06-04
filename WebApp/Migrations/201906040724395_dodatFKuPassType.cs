namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dodatFKuPassType : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "PassengerType_Id", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerType_Id" });
            RenameColumn(table: "dbo.AspNetUsers", name: "PassengerType_Id", newName: "PassengerTypeId");
            AlterColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            AlterColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int());
            RenameColumn(table: "dbo.AspNetUsers", name: "PassengerTypeId", newName: "PassengerType_Id");
            CreateIndex("dbo.AspNetUsers", "PassengerType_Id");
            AddForeignKey("dbo.AspNetUsers", "PassengerType_Id", "dbo.PassengerTypes", "Id");
        }
    }
}
