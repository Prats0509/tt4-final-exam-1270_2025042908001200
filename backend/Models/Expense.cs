using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Expense
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string? Category { get; set; }
    }
}
