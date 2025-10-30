using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Services.Commands;

public class CreateServicesCommand : IRequest<Result>
{

    [MaxLength(50)]
    public required string ServiceName { get; set; }

    [MaxLength(100)]
    public required string EnglishTitle { get; set; }
    
    [MaxLength(100)]
    public required string SinhalaTitle { get; set; }
    
    [MaxLength(100)]
    public required string TamilTitle { get; set; }
    
    [MaxLength(1000)]
    public required string EnglishDesc { get; set; }
    
    [MaxLength(1000)]
    public required string SinhalaDesc { get; set; }
    
    [MaxLength(1000)]
    public required string TamilDesc { get; set; }
}


public class CreateServicesCommandHandler : IRequestHandler<CreateServicesCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateServicesCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    
    public async Task<Result> Handle(CreateServicesCommand request, CancellationToken cancellationToken)
    {
        var existingService =
            await _context.Service.FirstOrDefaultAsync
                (s => s.ServiceName == request.ServiceName, cancellationToken);
        
        existingService.ThrowIfNull("Service not found.");
        
        
        existingService.EnglishTitle = request.EnglishTitle;
        existingService.SinhalaTitle = request.SinhalaTitle;
        existingService.TamilTitle = request.TamilTitle;
        existingService.EnglishDesc = request.EnglishDesc;
        existingService.SinhalaDesc = request.SinhalaDesc;
        existingService.TamilDesc = request.TamilDesc;
        _context.Service.Update(existingService);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success("Service updated successfully.");
    }
}