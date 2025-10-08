using Core.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core;
public interface IBaseRepository<T> where T : class
{
	Task<IEnumerable<T>> GetAll();
	Task<T?> GetById(string id);
	Task<T?> Edit(string id, EditUser entity);
	Task<bool> Delete(string id);
}
