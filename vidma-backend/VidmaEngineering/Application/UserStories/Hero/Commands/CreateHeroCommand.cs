using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Domain.Entities.Sections;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Hero.Commands;

public class CreateHeroCommand : IRequest<Result>
{
    // FirstHero
    public string? FirstHeroEnglishTitle { get; set; }
    public string? FirstHeroEnglishText { get; set; }
    public string? FirstHeroSinhalaTitle { get; set; }
    public string? FirstHeroSinhalaText { get; set; }
    public string? FirstHeroTamilTitle { get; set; }
    public string? FirstHeroTamilText { get; set; }
    public IFormFile? FirstHeroImage { get; set; }

    // SecondHero
    public string? SecondHeroEnglishTitle { get; set; }
    public string? SecondHeroEnglishText { get; set; }
    public string? SecondHeroSinhalaTitle { get; set; }
    public string? SecondHeroSinhalaText { get; set; }
    public string? SecondHeroTamilTitle { get; set; }
    public string? SecondHeroTamilText { get; set; }
    public IFormFile? SecondHeroImage { get; set; }

    // ThirdHero
    public string? ThirdHeroEnglishTitle { get; set; }
    public string? ThirdHeroEnglishText { get; set; }
    public string? ThirdHeroSinhalaTitle { get; set; }
    public string? ThirdHeroSinhalaText { get; set; }
    public string? ThirdHeroTamilTitle { get; set; }
    public string? ThirdHeroTamilText { get; set; }
    public IFormFile? ThirdHeroImage { get; set; }
}

public class CreateCommandHandler : IRequestHandler<CreateHeroCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateHeroCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingHero = await _context.Hero.FirstOrDefaultAsync(cancellationToken);

            if (existingHero != null)
            {
                _context.Hero.Remove(existingHero);
                await _context.SaveChangesAsync(cancellationToken);
            }


            var hero = new Domain.Entities.Sections.Hero
            {
                FirstHero = new FirstHero
                {
                    English = new LocalizedContent
                    {
                        Title = request.FirstHeroEnglishTitle ?? string.Empty,
                        Text = request.FirstHeroEnglishText
                    },
                    Sinhala = new LocalizedContent
                    {
                        Title = request.FirstHeroSinhalaTitle ?? string.Empty,
                        Text = request.FirstHeroSinhalaText
                    },
                    Tamil = new LocalizedContent
                    {
                        Title = request.FirstHeroTamilTitle ?? string.Empty,
                        Text = request.FirstHeroTamilText
                    }
                },

                SecondHero = new SecondHero
                {
                    English = new LocalizedContent
                    {
                        Title = request.SecondHeroEnglishTitle ?? string.Empty,
                        Text = request.SecondHeroEnglishText
                    },
                    Sinhala = new LocalizedContent
                    {
                        Title = request.SecondHeroSinhalaTitle ?? string.Empty,
                        Text = request.SecondHeroSinhalaText
                    },
                    Tamil = new LocalizedContent
                    {
                        Title = request.SecondHeroTamilTitle ?? string.Empty,
                        Text = request.SecondHeroTamilText
                    }
                },

                ThirdHero = new ThirdHero
                {
                    English = new LocalizedContent
                    {
                        Title = request.ThirdHeroEnglishTitle ?? string.Empty,
                        Text = request.ThirdHeroEnglishText
                    },
                    Sinhala = new LocalizedContent
                    {
                        Title = request.ThirdHeroSinhalaTitle ?? string.Empty,
                        Text = request.ThirdHeroSinhalaText
                    },
                    Tamil = new LocalizedContent
                    {
                        Title = request.ThirdHeroTamilTitle ?? string.Empty,
                        Text = request.ThirdHeroTamilText
                    }
                }
            };

            // Upload images if provided and set URLs on the hero
            if (request.FirstHeroImage != null)
            {
                var url = await _dropBoxService.UploadImageAsync(request.FirstHeroImage, "hero/first");
                hero.FirstHero.Image = url;
            }

            if (request.SecondHeroImage != null)
            {
                var url = await _dropBoxService.UploadImageAsync(request.SecondHeroImage, "hero/second");
                hero.SecondHero.Image = url;
            }

            if (request.ThirdHeroImage != null)
            {
                var url = await _dropBoxService.UploadImageAsync(request.ThirdHeroImage, "hero/third");
                hero.ThirdHero.Image = url;
            }

            // Persist
            _context.Hero.Add(hero);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure(ex.Message);
        }
    }
}