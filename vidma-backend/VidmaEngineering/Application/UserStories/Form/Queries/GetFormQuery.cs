using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.UserStories.Form.Queries;

public record GetFormQuery : IRequest<List<FormResponse>>;


public class GetFormQueryHandler : IRequestHandler<GetFormQuery, List<FormResponse>>
{
    private readonly IApplicationDbContext _context;

    public GetFormQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<FormResponse>> Handle(GetFormQuery request, CancellationToken cancellationToken)
    {
        var forms = await _context.Form
            .ToListAsync(cancellationToken);

        return forms.Select(form => new FormResponse
        {
            Id = form.Id,
            Name = form.Name,
            Comment = form.Comment,
            Reaction = form.Reaction,
            Email = form.Email
        }).ToList();
    }
}

public class FormResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public string? Comment { get; set; }
    
    public string? Reaction { get; set; }

    public string Email { get; set; }
}