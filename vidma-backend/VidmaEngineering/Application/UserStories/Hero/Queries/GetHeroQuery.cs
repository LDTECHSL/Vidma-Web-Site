using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.Sections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserStories.Hero.Queries;

public class GetHeroQuery : IRequest<HeroResponse>
{
    public string LanguageCode { get; set; } = string.Empty;
}

public class GetHeroQueryHandler : IRequestHandler<GetHeroQuery, HeroResponse>
{
    private readonly IApplicationDbContext _context;

    public GetHeroQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<HeroResponse> Handle(GetHeroQuery request, CancellationToken cancellationToken)
    {
        var hero = await _context.Hero
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        if (hero == null)
            return new HeroResponse();

        LocalizedContent SelectLocalized(HeroContent content)
        {
            var code = (request.LanguageCode ?? string.Empty).ToLowerInvariant();

            if (code.StartsWith("si"))
                return content.Sinhala;

            if (code.StartsWith("ta"))
                return content.Tamil;

            // default to English
            return content.English;
        }

        var slides = new List<SlideDto>();

        if (hero.FirstHero != null)
        {
            var c = SelectLocalized(hero.FirstHero);
            slides.Add(new SlideDto
            {
                Image = hero.FirstHero.Image ?? string.Empty,
                Title = c?.Title ?? string.Empty,
                Text = c?.Text ?? string.Empty
            });
        }

        if (hero.SecondHero != null)
        {
            var c = SelectLocalized(hero.SecondHero);
            slides.Add(new SlideDto
            {
                Image = hero.SecondHero.Image ?? string.Empty,
                Title = c?.Title ?? string.Empty,
                Text = c?.Text ?? string.Empty
            });
        }

        if (hero.ThirdHero != null)
        {
            var c = SelectLocalized(hero.ThirdHero);
            slides.Add(new SlideDto
            {
                Image = hero.ThirdHero.Image ?? string.Empty,
                Title = c?.Title ?? string.Empty,
                Text = c?.Text ?? string.Empty
            });
        }

        return new HeroResponse { Slides = slides };
    }
}



public class HeroResponse
{
    public List<SlideDto> Slides { get; set; } = new();
}

public class SlideDto
{
    public string Image { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
}