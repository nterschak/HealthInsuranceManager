using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;

        public PaymentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetAllPayments()
        {
            return await _context.Payments
                .Include(p => p.PaymentMethod)
                .ToListAsync();
        }

        public async Task<Payment> GetPaymentById(int id)
        {
            return await _context.Payments
                .Include(p => p.PaymentMethod)
                .SingleOrDefaultAsync(p => p.Id == id);
        }        

        public async Task<List<PaymentMethod>> GetAllPaymentMethods()
        {
            return await _context.PaymentMethods.ToListAsync();
        }

        public async Task<PaymentMethod> GetPaymentMethodById(int id)
        {
            return await _context.PaymentMethods.FindAsync(id);
        }

        public async Task<PaymentMethod> GetPaymentMethodByLastFourDigits(string lastFourDitis)
        {
            return await _context.PaymentMethods
                .SingleOrDefaultAsync(p => p.LastFourDigits == lastFourDitis);
        }    

        public void AddPaymentMethod(PaymentMethod paymentMethod)
        {
            _context.PaymentMethods.Add(paymentMethod);
        }

        public void RemovePaymentMethod(PaymentMethod paymentMethod)
        {
            _context.PaymentMethods.Remove(paymentMethod);
        }

        public async Task<List<PaymentRule>> GetAllPaymentRules()
        {
            return await _context.PaymentRules.ToListAsync();
        }

        public async Task<PaymentRule> GetPaymentRuleById(int id)
        {
            return await _context.PaymentRules
                .Include(p => p.PaymentMethod)
                .SingleOrDefaultAsync(p => p.Id == id);        
        }

        public void AddPaymentRule(PaymentRule paymentRule)
        {
            _context.PaymentRules.Add(paymentRule);
        }

        public void RemovePaymentRule(PaymentRule paymentRule)
        {
            _context.PaymentRules.Remove(paymentRule);
        }
    }
}