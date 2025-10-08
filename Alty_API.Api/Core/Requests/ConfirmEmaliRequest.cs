using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Requests;
public class ConfirmEmailRequest
{
	[Required]
	public string UserId { get; set; } = string.Empty;
	public string Code { get; set; } = string.Empty;

}
