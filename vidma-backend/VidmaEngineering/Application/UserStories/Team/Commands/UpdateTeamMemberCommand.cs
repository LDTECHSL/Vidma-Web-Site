using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Team.Commands;

public class UpdateTeamMemberCommand : IRequest<Result>
{

    public int MemberId { get; set; }
    
    public required string Name { get; set; }
    
    public string? Position { get; set; }

    public IFormFile? ImageUrl { get; set; }
}


public class UpdateTeamMemberCommandHandler : IRequestHandler<UpdateTeamMemberCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public UpdateTeamMemberCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(UpdateTeamMemberCommand request, CancellationToken cancellationToken)
    {
        var teamMember = await _context.Team
            .Where(x=> x.Id == request.MemberId)
            .FirstOrDefaultAsync(cancellationToken);
      
        teamMember.ThrowIfNull("Team member not found.");
        
        teamMember.Name = request.Name;
        teamMember.Position = request.Position;

        if (request.ImageUrl != null)
        {
            
           // await _dropBoxService.DeleteImageAsync(teamMember.ImageUrl);
            var imageUrl = await _dropBoxService.UploadImageAsync(request.ImageUrl, "team");
            teamMember.ImageUrl = imageUrl;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success("Team member updated successfully.");
    }
}