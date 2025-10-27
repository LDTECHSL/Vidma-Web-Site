using Application.Common.Interfaces;
using Domain.Entities.Sections;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Hero.Queries;

public record GetAllHeroQuery : IRequest<HeroResponseAll>;


public class GetAllHeroQueryHandler : IRequestHandler<GetAllHeroQuery, HeroResponseAll>
{
    private readonly IApplicationDbContext _context;

    public GetAllHeroQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<HeroResponseAll> Handle(GetAllHeroQuery request, CancellationToken cancellationToken)
    {
        var hero = await _context.Hero
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (hero == null)
            return new HeroResponseAll();

        var slides = new List<SlideAllDto>();

        void AddIfNotNull(HeroContent? content)
        {
            if (content == null) return;

            slides.Add(new SlideAllDto
            {
                Image = content.Image ?? string.Empty,
                English = new LocalizedDto
                {
                    Title = content.English?.Title ?? string.Empty,
                    Text = content.English?.Text ?? string.Empty
                },
                Sinhala = new LocalizedDto
                {
                    Title = content.Sinhala?.Title ?? string.Empty,
                    Text = content.Sinhala?.Text ?? string.Empty
                },
                Tamil = new LocalizedDto
                {
                    Title = content.Tamil?.Title ?? string.Empty,
                    Text = content.Tamil?.Text ?? string.Empty
                }
            });
        }

        AddIfNotNull(hero.FirstHero);
        AddIfNotNull(hero.SecondHero);
        AddIfNotNull(hero.ThirdHero);

        return new HeroResponseAll { Slides = slides };
    }
}


public class HeroResponseAll
{
    public List<SlideAllDto> Slides { get; set; } = new();
}


public class SlideAllDto
{
    public string Image { get; set; } = string.Empty;
    public LocalizedDto English { get; set; } = new LocalizedDto();
    public LocalizedDto Sinhala { get; set; } = new LocalizedDto();
    public LocalizedDto Tamil { get; set; } = new LocalizedDto();
}

public class LocalizedDto
{
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}
