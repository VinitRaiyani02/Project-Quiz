﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class ResourceBase
    {
        public int CurrentPage { get; set; }

        public int PageSize { get; set; }
       
        public int TotalCount { get; set; }
    }
}
