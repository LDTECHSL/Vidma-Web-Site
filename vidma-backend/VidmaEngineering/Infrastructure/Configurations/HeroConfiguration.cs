using Domain.Entities.Common;
using Domain.Entities.Sections;
using Infrastructure.Persistence.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class HeroConfiguration : AuditableEntityConfiguration<Hero>
{
    public override void Configure(EntityTypeBuilder<Hero> b)
    {
        b.ToTable("Hero");

        // FirstHero owned config
        b.OwnsOne(h => h.FirstHero, fb =>
        {
            fb.OwnsOne(f => f.English, eb =>
            {
                eb.Property(e => e.Title).HasMaxLength(150).HasColumnName("FirstHeroEnglishTitle");
                eb.Property(e => e.Text).HasMaxLength(500).HasColumnName("FirstHeroEnglishText");
            });

            fb.OwnsOne(f => f.Sinhala, sb =>
            {
                sb.Property(s => s.Title).HasMaxLength(150).HasColumnName("FirstHeroSinhalaTitle");
                sb.Property(s => s.Text).HasMaxLength(500).HasColumnName("FirstHeroSinhalaText");
            });

            fb.OwnsOne(f => f.Tamil, tb =>
            {
                tb.Property(t => t.Title).HasMaxLength(150).HasColumnName("FirstHeroTamilTitle");
                tb.Property(t => t.Text).HasMaxLength(500).HasColumnName("FirstHeroTamilText");
            });

            fb.Property(f => f.Image).HasColumnName("FirstHeroImage");
        });

        // SecondHero owned config
        b.OwnsOne(h => h.SecondHero, fb =>
        {
            fb.OwnsOne(f => f.English, eb =>
            {
                eb.Property(e => e.Title).HasMaxLength(150).HasColumnName("SecondHeroEnglishTitle");
                eb.Property(e => e.Text).HasMaxLength(500).HasColumnName("SecondHeroEnglishText");
            });

            fb.OwnsOne(f => f.Sinhala, sb =>
            {
                sb.Property(s => s.Title).HasMaxLength(150).HasColumnName("SecondHeroSinhalaTitle");
                sb.Property(s => s.Text).HasMaxLength(500).HasColumnName("SecondHeroSinhalaText");
            });

            fb.OwnsOne(f => f.Tamil, tb =>
            {
                tb.Property(t => t.Title).HasMaxLength(150).HasColumnName("SecondHeroTamilTitle");
                tb.Property(t => t.Text).HasMaxLength(500).HasColumnName("SecondHeroTamilText");
            });

            fb.Property(f => f.Image).HasColumnName("SecondHeroImage");
        });

        // ThirdHero owned config
        b.OwnsOne(h => h.ThirdHero, fb =>
        {
            fb.OwnsOne(f => f.English, eb =>
            {
                eb.Property(e => e.Title).HasMaxLength(150).HasColumnName("ThirdHeroEnglishTitle");
                eb.Property(e => e.Text).HasMaxLength(500).HasColumnName("ThirdHeroEnglishText");
            });

            fb.OwnsOne(f => f.Sinhala, sb =>
            {
                sb.Property(s => s.Title).HasMaxLength(150).HasColumnName("ThirdHeroSinhalaTitle");
                sb.Property(s => s.Text).HasMaxLength(500).HasColumnName("ThirdHeroSinhalaText");
            });

            fb.OwnsOne(f => f.Tamil, tb =>
            {
                tb.Property(t => t.Title).HasMaxLength(150).HasColumnName("ThirdHeroTamilTitle");
                tb.Property(t => t.Text).HasMaxLength(500).HasColumnName("ThirdHeroTamilText");
            });

            fb.Property(f => f.Image).HasColumnName("ThirdHeroImage");
        });
    }
}