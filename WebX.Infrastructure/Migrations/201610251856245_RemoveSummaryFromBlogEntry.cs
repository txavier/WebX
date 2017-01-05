namespace WebX.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveSummaryFromBlogEntry : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.blogEntry", "blogBodySummaryHtml");
        }
        
        public override void Down()
        {
            AddColumn("dbo.blogEntry", "blogBodySummaryHtml", c => c.String());
        }
    }
}
