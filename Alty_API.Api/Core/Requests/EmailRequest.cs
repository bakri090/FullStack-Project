using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Requests;
public class EmailRequest
{
	public string EmailTo { get; set; } = string.Empty;
	public string EmailSubject { get; set; } = string.Empty;
	public string EmailBody { get; set; } = string.Empty;
	public IList<IFormFile>? Attachments { get; set; } = null;
}
