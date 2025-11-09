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
                //update the existing hero details if each image check it its null or not
                if (request.FirstHeroImage != null)
                {
                    if (existingHero.FirstHero.Image != null)
                    {
                        //await _dropBoxService.DeleteImageAsync(existingHero.FirstHero.Image);
                        var url = await _dropBoxService.UploadImageAsync(request.FirstHeroImage, "hero/first");
                        existingHero.FirstHero.Image = url;
                    }
                }

                if (request.SecondHeroImage != null)
                {
                    if (existingHero.SecondHero.Image != null)
                    {
                        //await _dropBoxService.DeleteImageAsync(existingHero.SecondHero.Image);
                        var url = await _dropBoxService.UploadImageAsync(request.SecondHeroImage, "hero/second");
                        existingHero.SecondHero.Image = url;
                    }
                }

                if (request.ThirdHeroImage != null)
                {
                    if (existingHero.ThirdHero.Image != null)
                    {
                        //await _dropBoxService.DeleteImageAsync(existingHero.ThirdHero.Image);
                        var url = await _dropBoxService.UploadImageAsync(request.ThirdHeroImage, "hero/third");
                        existingHero.ThirdHero.Image = url;
                    }
                }

                existingHero.FirstHero.English.Title = request.FirstHeroEnglishTitle ?? string.Empty;
                existingHero.FirstHero.English.Text = request.FirstHeroEnglishText;
                existingHero.FirstHero.Sinhala.Title = request.FirstHeroSinhalaTitle ?? string.Empty;
                existingHero.FirstHero.Sinhala.Text = request.FirstHeroSinhalaText;
                existingHero.FirstHero.Tamil.Title = request.FirstHeroTamilTitle ?? string.Empty;
                existingHero.FirstHero.Tamil.Text = request.FirstHeroTamilText;
                existingHero.SecondHero.English.Title = request.SecondHeroEnglishTitle ?? string.Empty;
                existingHero.SecondHero.English.Text = request.SecondHeroEnglishText;
                existingHero.SecondHero.Sinhala.Title = request.SecondHeroSinhalaTitle ?? string.Empty;
                existingHero.SecondHero.Sinhala.Text = request.SecondHeroSinhalaText;
                existingHero.SecondHero.Tamil.Title = request.SecondHeroTamilTitle ?? string.Empty;
                existingHero.SecondHero.Tamil.Text = request.SecondHeroTamilText;
                existingHero.ThirdHero.English.Title = request.ThirdHeroEnglishTitle ?? string.Empty;
                existingHero.ThirdHero.English.Text = request.ThirdHeroEnglishText;
                existingHero.ThirdHero.Sinhala.Title = request.ThirdHeroSinhalaTitle ?? string.Empty;
                existingHero.ThirdHero.Sinhala.Text = request.ThirdHeroSinhalaText;
                existingHero.ThirdHero.Tamil.Title = request.ThirdHeroTamilTitle ?? string.Empty;
                existingHero.ThirdHero.Tamil.Text = request.ThirdHeroTamilText;
                _context.Hero.Update(existingHero);
                await _context.SaveChangesAsync(cancellationToken);
                return Result.Success();
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