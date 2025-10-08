using Microsoft.AspNetCore.Http;

namespace Core.IServices;
public interface IMailService
{
	Task SendEmailAsync(string emailTo,string subject, string body, IList<IFormFile>? attachments = null);
}
