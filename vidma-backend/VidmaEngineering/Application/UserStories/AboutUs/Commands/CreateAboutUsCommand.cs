using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.AboutUs.Commands;

public class CreateAboutUsCommand : IRequest<Result>
{
    public string EnglishDesc { get; set; }
    public string SinhalaDesc { get; set; }
    public string TamilDesc { get; set; }
}

public class CreateAboutUsCommandHandler : IRequestHandler<CreateAboutUsCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateAboutUsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateAboutUsCommand request, CancellationToken cancellationToken)
    {
        //if an About Us entry already exists, return failure
        var existingAboutUs = await _context.AboutUs.FirstOrDefaultAsync(cancellationToken);
        if (existingAboutUs != null)
        {
            _context.AboutUs.Remove(existingAboutUs);
            await _context.SaveChangesAsync(cancellationToken);
        }


        var aboutUs = new Domain.Entities.AboutUs.AboutUs
        {
            EnglishDesc = request.EnglishDesc,
            SinhalaDesc = request.SinhalaDesc,
            TamilDesc = request.TamilDesc
        };

        _context.AboutUs.Add(aboutUs);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("About Us created successfully.");
    }
}