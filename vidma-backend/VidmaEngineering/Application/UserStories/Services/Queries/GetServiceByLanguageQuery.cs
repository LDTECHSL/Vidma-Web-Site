using System.ComponentModel.DataAnnotations;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Services.Queries;

public class GetServiceByLanguageQuery : IRequest<List<ServiceLanguageResponse>>
{
    public string LanguageCode { get; set; }
}



public class GetServiceByLanguageQueryHandler : IRequestHandler<GetServiceByLanguageQuery, List<ServiceLanguageResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetServiceByLanguageQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ServiceLanguageResponse>> Handle(GetServiceByLanguageQuery request, CancellationToken cancellationToken)
    {
      var  services = await _context.Service
            .ToListAsync(cancellationToken);
      var response = services.Select(service => new ServiceLanguageResponse
      {
          ServiceName = service.ServiceName,
          Title = request.LanguageCode switch
          {
              "en" => service.EnglishTitle,
              "si" => service.SinhalaTitle,
              "ta" => service.TamilTitle,
              _ => service.EnglishTitle
          },
          Description = request.LanguageCode switch
          {
              "en" => service.EnglishDesc,
              "si" => service.SinhalaDesc,
              "ta" => service.TamilDesc,
              _ => service.EnglishDesc
          }
      }).ToList();

        return response;

      
    }
}

public class ServiceLanguageResponse
{
    [MaxLength(50)]
    public required string ServiceName { get; set; }

    [MaxLength(100)]
    public required string Title { get; set; }
    
    
    [MaxLength(1000)]
    public required string Description { get; set; }

}