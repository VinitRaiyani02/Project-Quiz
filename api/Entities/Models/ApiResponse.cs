using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class ApiResponse<T> where T : class

    {

        public bool success { get; set; }
        public string? message { get; set; }
        public int statusCode { get; set; }

        public T? data { get; set; }

        public ApiResponse(int statusCode, bool success, string? message, T data )
        {
            this.success = success;
            this.message = message;
            this.statusCode = statusCode;
            this.data = data;
        }

        public ApiResponse(int statusCode, bool success, string? message)
        {
            this.success = success;
            this.message = message;
            this.statusCode = statusCode;
            this.data = null;
        }
    }


}
