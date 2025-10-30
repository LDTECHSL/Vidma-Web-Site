using Application.Common;
using Application.Common.Interfaces;
using Domain.Entities.VideoSection.Videos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.UserStories.VideoSection.Video.Commands;

public class CreateVideoCommand : IRequest<Result>
{
    public required IFormFile Video { get; set; }
}

public class CreateVideoCommandHandler : IRequestHandler<CreateVideoCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDropBoxService _dropBoxService;

    public CreateVideoCommandHandler(IApplicationDbContext context, IDropBoxService dropBoxService)
    {
        _context = context;
        _dropBoxService = dropBoxService;
    }

    public async Task<Result> Handle(CreateVideoCommand request, CancellationToken cancellationToken)
    {
        await _dropBoxService.UploadImageAsync(request.Video, "Videos");

        return Result.Success("Video created successfully.");
    }
}