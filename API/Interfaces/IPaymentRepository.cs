using API.Entities;

namespace API.Interfaces
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllPayments();
        Task<Payment> GetPaymentById(int id);
        Task<List<PaymentMethod>> GetAllPaymentMethods();
        Task<PaymentMethod> GetPaymentMethodById(int id);
        Task<PaymentMethod> GetPaymentMethodByLastFourDigits(string lastFourDitis);
        void AddPaymentMethod(PaymentMethod paymentMethod);
        void RemovePaymentMethod(PaymentMethod paymentMethod);
        Task<List<PaymentRule>> GetAllPaymentRules();
        Task<PaymentRule> GetPaymentRuleById(int id);
        void AddPaymentRule(PaymentRule paymentRule);
        void RemovePaymentRule(PaymentRule paymentRule);
    }
}