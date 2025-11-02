using System.ComponentModel.DataAnnotations;
using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.Team.Commands;

public class CreateTeamMemberCommand : IRequest<Result>
{
        [MaxLength(300)]
        public required string Name { get; set; }
        
        [MaxLength(500)]
        public string? Position { get; set; }

        public required IFormFile ImageUrl { get; set; }
}


public class CreateTeamMemberCommandHandler : IRequestHandler<CreateTeamMemberCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateTeamMemberCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }


    public async Task<Result> Handle(CreateTeamMemberCommand request, CancellationToken cancellationToken)
    {
        var imageLink = await _dropBoxService.UploadImageAsync(request.ImageUrl, "team");

        var teamMember = new Domain.Entities.Teams.Team
        {
            Name = request.Name,
            Position = request.Position,    
            ImageUrl = imageLink
        };

        _context.Team.Add(teamMember);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Team member created successfully.");
       
    }
}