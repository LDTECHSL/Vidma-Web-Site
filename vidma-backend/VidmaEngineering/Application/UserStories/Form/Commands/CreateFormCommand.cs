using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;

namespace Application.UserStories.Form;

public class CreateFormCommand : IRequest<Result>
{
    [MaxLength(200)] public required string Name { get; set; }

    [MaxLength(1000)]
    public string? Comment { get; set; }

    public string? Reaction { get; set; }

    [RegularExpression(@".+@.+", ErrorMessage = "Email must contain '@'.")]
    public string Email { get; set; }
}

public class CreateFormCommandHandler : IRequestHandler<CreateFormCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateFormCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateFormCommand request, CancellationToken cancellationToken)
    {
        var form = new Domain.Entities.Form.Form
        {
            Name = request.Name,
            Comment = request.Comment,
            Email = request.Email,
            Reaction = request.Reaction
        };

        await _context.Form.AddAsync(form, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Form created successfully.");
    }
}