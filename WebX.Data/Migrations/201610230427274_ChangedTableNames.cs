namespace WebX.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedTableNames : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.authors", newName: "author");
            RenameTable(name: "dbo.blogEntries", newName: "blogEntry");
            RenameTable(name: "dbo.blogTags", newName: "blogTag");
            RenameTable(name: "dbo.blogCategories", newName: "blogCategory");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.blogCategory", newName: "blogCategories");
            RenameTable(name: "dbo.blogTag", newName: "blogTags");
            RenameTable(name: "dbo.blogEntry", newName: "blogEntries");
            RenameTable(name: "dbo.author", newName: "authors");
        }
    }
}
