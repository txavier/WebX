namespace WebX.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBlogModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.authors",
                c => new
                    {
                        authorId = c.Int(nullable: false, identity: true),
                        authorFirstName = c.String(),
                        authorLastName = c.String(),
                        authorUsername = c.String(),
                        aboutTheAuthorHtml = c.String(),
                    })
                .PrimaryKey(t => t.authorId);
            
            CreateTable(
                "dbo.blogEntries",
                c => new
                    {
                        blogEntryId = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        authorId = c.Int(nullable: false),
                        publishedDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        imageBase64String = c.String(),
                        blogBodyHtml = c.String(),
                        blogBodySummaryHtml = c.String(),
                    })
                .PrimaryKey(t => t.blogEntryId)
                .ForeignKey("dbo.authors", t => t.authorId, cascadeDelete: true)
                .Index(t => t.authorId);
            
            CreateTable(
                "dbo.blogTags",
                c => new
                    {
                        blogTagId = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        blogEntry_blogEntryId = c.Int(),
                    })
                .PrimaryKey(t => t.blogTagId)
                .ForeignKey("dbo.blogEntries", t => t.blogEntry_blogEntryId)
                .Index(t => t.blogEntry_blogEntryId);
            
            CreateTable(
                "dbo.blogCategories",
                c => new
                    {
                        blogCategoryId = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        blogEntry_blogEntryId = c.Int(),
                    })
                .PrimaryKey(t => t.blogCategoryId)
                .ForeignKey("dbo.blogEntries", t => t.blogEntry_blogEntryId)
                .Index(t => t.blogEntry_blogEntryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.blogCategories", "blogEntry_blogEntryId", "dbo.blogEntries");
            DropForeignKey("dbo.blogTags", "blogEntry_blogEntryId", "dbo.blogEntries");
            DropForeignKey("dbo.blogEntries", "authorId", "dbo.authors");
            DropIndex("dbo.blogCategories", new[] { "blogEntry_blogEntryId" });
            DropIndex("dbo.blogTags", new[] { "blogEntry_blogEntryId" });
            DropIndex("dbo.blogEntries", new[] { "authorId" });
            DropTable("dbo.blogCategories");
            DropTable("dbo.blogTags");
            DropTable("dbo.blogEntries");
            DropTable("dbo.authors");
        }
    }
}
