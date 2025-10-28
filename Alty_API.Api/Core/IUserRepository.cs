using Core.Entities;
using Core.Requests;
using Core.Responses;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core;
public interface IUserRepository : IBaseRepository<ApplicationUser>
{
	Task<UserProfileResponse?> GetProfile(string id);
	Task<Guid?> UploadProfileImage(string userId,IFormFile file);
	Task<bool> UpdateProfile(string id,UserProfileRequest model);
}
