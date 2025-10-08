using Core.IServices;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Api.Services;

public class MailService : IMailService
{
	private readonly MailSettings _mailSettings;
	public MailService(IOptions<MailSettings> mailSettings)
	{
		_mailSettings = mailSettings.Value;
	}
	public async Task SendEmailAsync(string emailTo, string subject, string body, IList<IFormFile>? attachments = null)
	{
		var email = new MimeMessage
		{
			Sender = MailboxAddress.Parse(_mailSettings.Email),
			Subject = subject,
		};

		email.To.Add(MailboxAddress.Parse(emailTo));

		var builder = new BodyBuilder();

		if (attachments != null)
		{
			byte[] fileBytes;
			foreach (var file in attachments)
			{
				if(file.Length > 0)
				{
					using var ms = new MemoryStream();
					file.CopyTo(ms);
					fileBytes = ms.ToArray();
					builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
				}
			}
		}

		builder.HtmlBody = body;
		email.Body =builder.ToMessageBody();
		email.From.Add(MailboxAddress.Parse(_mailSettings.Email));

		using var smtp = new SmtpClient();
		smtp.Connect(_mailSettings.Host, _mailSettings.Port);
		smtp.Authenticate(_mailSettings.Email, _mailSettings.Password);
		await smtp.SendAsync(email);
		smtp.Disconnect(true);
		
	}
}
