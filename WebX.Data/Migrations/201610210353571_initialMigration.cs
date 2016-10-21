namespace WebX.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AuditLogs",
                c => new
                    {
                        AuditLogId = c.Long(nullable: false, identity: true),
                        UserName = c.String(),
                        EventDateUTC = c.DateTime(nullable: false),
                        EventType = c.Int(nullable: false),
                        TypeFullName = c.String(nullable: false, maxLength: 512),
                        RecordId = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.AuditLogId);
            
            CreateTable(
                "dbo.AuditLogDetails",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        PropertyName = c.String(nullable: false, maxLength: 256),
                        OriginalValue = c.String(),
                        NewValue = c.String(),
                        AuditLogId = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AuditLogs", t => t.AuditLogId, cascadeDelete: true)
                .Index(t => t.AuditLogId);
            
            CreateTable(
                "dbo.LogMetadata",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        AuditLogId = c.Long(nullable: false),
                        Key = c.String(),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AuditLogs", t => t.AuditLogId, cascadeDelete: true)
                .Index(t => t.AuditLogId);
            
            CreateTable(
                "dbo.setting",
                c => new
                    {
                        settingId = c.Int(nullable: false, identity: true),
                        settingKey = c.String(nullable: false),
                        settingValue = c.String(),
                    })
                .PrimaryKey(t => t.settingId);
            
            CreateTable(
                "dbo.userActionLog",
                c => new
                    {
                        userActionLogId = c.Int(nullable: false, identity: true),
                        body = c.String(nullable: false),
                        date = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        typeFullName = c.String(),
                        recordId = c.Int(nullable: false),
                        eventType = c.Int(nullable: false),
                        eventTypeDisplay = c.String(),
                    })
                .PrimaryKey(t => t.userActionLogId);
            
            CreateTable(
                "dbo.user",
                c => new
                    {
                        userId = c.Int(nullable: false, identity: true),
                        name = c.String(nullable: false, maxLength: 255),
                        phoneNumber = c.String(nullable: false, maxLength: 50),
                        emailAddress = c.String(nullable: false, maxLength: 255),
                        sectionId = c.Int(),
                        userName = c.String(),
                    })
                .PrimaryKey(t => t.userId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.LogMetadata", "AuditLogId", "dbo.AuditLogs");
            DropForeignKey("dbo.AuditLogDetails", "AuditLogId", "dbo.AuditLogs");
            DropIndex("dbo.LogMetadata", new[] { "AuditLogId" });
            DropIndex("dbo.AuditLogDetails", new[] { "AuditLogId" });
            DropTable("dbo.user");
            DropTable("dbo.userActionLog");
            DropTable("dbo.setting");
            DropTable("dbo.LogMetadata");
            DropTable("dbo.AuditLogDetails");
            DropTable("dbo.AuditLogs");
        }
    }
}
