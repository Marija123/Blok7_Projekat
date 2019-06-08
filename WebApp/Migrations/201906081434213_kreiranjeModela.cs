namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class kreiranjeModela : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DayTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LineNumber = c.String(),
                        ColorLine = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PassengerTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Coefficient = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartOfValidity = c.DateTime(),
                        EndOfValidity = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SerialNumberSLs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.Int(nullable: false),
                        LineId = c.Int(nullable: false),
                        StationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.StationId, cascadeDelete: true)
                .Index(t => t.LineId)
                .Index(t => t.StationId);
            
            CreateTable(
                "dbo.TicketPrices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        PricelistId = c.Int(nullable: false),
                        TicketTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Pricelists", t => t.PricelistId, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeId, cascadeDelete: true)
                .Index(t => t.PricelistId)
                .Index(t => t.TicketTypeId);
            
            CreateTable(
                "dbo.TicketTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        PurchaseTime = c.DateTime(),
                        TicketTypeId = c.Int(),
                        TicketPricesId = c.Int(nullable: false),
                        ApplicationUserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .ForeignKey("dbo.TicketPrices", t => t.TicketPricesId, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeId)
                .Index(t => t.TicketTypeId)
                .Index(t => t.TicketPricesId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Departures = c.String(),
                        LineId = c.Int(nullable: false),
                        DayTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DayTypes", t => t.DayTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .Index(t => t.LineId)
                .Index(t => t.DayTypeId);
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.Line_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.VehicleTimetables",
                c => new
                    {
                        Vehicle_Id = c.Int(nullable: false),
                        Timetable_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Vehicle_Id, t.Timetable_Id })
                .ForeignKey("dbo.Vehicles", t => t.Vehicle_Id, cascadeDelete: true)
                .ForeignKey("dbo.Timetables", t => t.Timetable_Id, cascadeDelete: true)
                .Index(t => t.Vehicle_Id)
                .Index(t => t.Timetable_Id);
            
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "Surname", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "Birthday", c => c.DateTime());
            AddColumn("dbo.AspNetUsers", "Image", c => c.String());
            AddColumn("dbo.AspNetUsers", "Activated", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "Role", c => c.String());
            AddColumn("dbo.AspNetUsers", "PassengerTypeId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "PassengerTypeId");
            AddForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VehicleTimetables", "Timetable_Id", "dbo.Timetables");
            DropForeignKey("dbo.VehicleTimetables", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Timetables", "LineId", "dbo.Lines");
            DropForeignKey("dbo.Timetables", "DayTypeId", "dbo.DayTypes");
            DropForeignKey("dbo.Tickets", "TicketTypeId", "dbo.TicketTypes");
            DropForeignKey("dbo.Tickets", "TicketPricesId", "dbo.TicketPrices");
            DropForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUsers", "PassengerTypeId", "dbo.PassengerTypes");
            DropForeignKey("dbo.TicketPrices", "TicketTypeId", "dbo.TicketTypes");
            DropForeignKey("dbo.TicketPrices", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.SerialNumberSLs", "StationId", "dbo.Stations");
            DropForeignKey("dbo.SerialNumberSLs", "LineId", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.VehicleTimetables", new[] { "Timetable_Id" });
            DropIndex("dbo.VehicleTimetables", new[] { "Vehicle_Id" });
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.Timetables", new[] { "DayTypeId" });
            DropIndex("dbo.Timetables", new[] { "LineId" });
            DropIndex("dbo.AspNetUsers", new[] { "PassengerTypeId" });
            DropIndex("dbo.Tickets", new[] { "ApplicationUserId" });
            DropIndex("dbo.Tickets", new[] { "TicketPricesId" });
            DropIndex("dbo.Tickets", new[] { "TicketTypeId" });
            DropIndex("dbo.TicketPrices", new[] { "TicketTypeId" });
            DropIndex("dbo.TicketPrices", new[] { "PricelistId" });
            DropIndex("dbo.SerialNumberSLs", new[] { "StationId" });
            DropIndex("dbo.SerialNumberSLs", new[] { "LineId" });
            DropColumn("dbo.AspNetUsers", "PassengerTypeId");
            DropColumn("dbo.AspNetUsers", "Role");
            DropColumn("dbo.AspNetUsers", "Activated");
            DropColumn("dbo.AspNetUsers", "Image");
            DropColumn("dbo.AspNetUsers", "Birthday");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "Surname");
            DropColumn("dbo.AspNetUsers", "Name");
            DropTable("dbo.VehicleTimetables");
            DropTable("dbo.StationLines");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Timetables");
            DropTable("dbo.Tickets");
            DropTable("dbo.TicketTypes");
            DropTable("dbo.TicketPrices");
            DropTable("dbo.SerialNumberSLs");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PassengerTypes");
            DropTable("dbo.Stations");
            DropTable("dbo.Lines");
            DropTable("dbo.DayTypes");
        }
    }
}
