using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Throw;

namespace Application.UserStories.Team.Commands;

public class DeleteTeamMemberCommand : IRequest<Result>
{
    public int MemberId { get; set; }
}

public class DeleteTeamMemberCommandHandler : IRequestHandler<DeleteTeamMemberCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteTeamMemberCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<Result> Handle(DeleteTeamMemberCommand request, CancellationToken cancellationToken)
    {
        var member = await _context.Team
            .Where(t => t.Id == request.MemberId)
            .FirstOrDefaultAsync(cancellationToken);

        member.ThrowIfNull("Team member not found.");


        _context.Team.Remove(member);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success("Team member deleted successfully.");
    }
}