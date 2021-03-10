using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;
      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _userAccessor = userAccessor;
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Id);

        if (activity == null) throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });
        var username = _userAccessor.GetCurrentUsername();
        var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);
        if (host?.AppUser?.UserName == username)
        {
            _context.Remove(activity);

            var succes = await _context.SaveChangesAsync() > 0;
            if (succes) return Unit.Value;
            throw new Exception("Problem deleting activity");
        }
        throw new RestException(HttpStatusCode.Forbidden, "You can't delete someone else's activity");
      }
    }
  }
}