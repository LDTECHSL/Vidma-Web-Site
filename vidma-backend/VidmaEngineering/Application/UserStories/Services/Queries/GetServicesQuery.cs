using System.ComponentModel.DataAnnotations;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Services.Queries;

public class GetServicesQuery : IRequest<List<ServiceResponse>>
{
}


public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, List<ServiceResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetServicesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ServiceResponse>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
    {
        var services = await _context.Service
            .Select(svc => new ServiceResponse
            {
                ServiceName = svc.ServiceName,
                EnglishTitle = svc.EnglishTitle,
                SinhalaTitle = svc.SinhalaTitle,
                TamilTitle = svc.TamilTitle,
                EnglishDesc = svc.EnglishDesc,
                SinhalaDesc = svc.SinhalaDesc,
                TamilDesc = svc.TamilDesc
            })
            .ToListAsync(cancellationToken);

        return services;
    }
}



public class ServiceResponse
{
    [MaxLength(50)] public required string ServiceName { get; set; }

    [MaxLength(100)] public required string EnglishTitle { get; set; }

    [MaxLength(100)] public required string SinhalaTitle { get; set; }

    [MaxLength(100)] public required string TamilTitle { get; set; }

    [MaxLength(1000)] public required string EnglishDesc { get; set; }

    [MaxLength(1000)] public required string SinhalaDesc { get; set; }

    [MaxLength(1000)] public required string TamilDesc { get; set; }
}