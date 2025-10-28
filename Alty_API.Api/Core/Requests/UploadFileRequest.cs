using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Core.Requests;
public class UploadFileRequest
{
	[Required]
	public required IFormFile File { get; set; }
}