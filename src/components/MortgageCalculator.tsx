'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  Download,
  Share2,
  Info
} from 'lucide-react';

interface MortgageCalculatorProps {
  onClose: () => void;
  initialPrice?: number;
}

interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPaymentAmount: number;
  loanAmount: number;
}

const MortgageCalculator = ({ onClose, initialPrice = 1000000 }: MortgageCalculatorProps) => {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(25); // percentage
  const [interestRate, setInterestRate] = useState(3.5); // annual percentage
  const [loanTerm, setLoanTerm] = useState(25); // years
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const downPaymentAmount = (propertyPrice * downPayment) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPaymentAmount,
      loanAmount
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-AE').format(num);
  };

  const getAffordabilityColor = () => {
    if (!result) return 'text-gray-600';
    const monthlyIncome = result.monthlyPayment * 3; // Assuming 33% debt-to-income ratio
    if (monthlyIncome < 15000) return 'text-green-600';
    if (monthlyIncome < 30000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const generatePaymentSchedule = () => {
    if (!result) return [];
    
    const schedule = [];
    let remainingBalance = result.loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    
    for (let month = 1; month <= Math.min(12, loanTerm * 12); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = result.monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: result.monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }
    
    return schedule;
  };

  const exportCalculation = () => {
    if (!result) return;
    
    const data = {
      propertyPrice: formatCurrency(propertyPrice),
      downPayment: `${downPayment}% (${formatCurrency(result.downPaymentAmount)})`,
      loanAmount: formatCurrency(result.loanAmount),
      interestRate: `${interestRate}%`,
      loanTerm: `${loanTerm} years`,
      monthlyPayment: formatCurrency(result.monthlyPayment),
      totalPayment: formatCurrency(result.totalPayment),
      totalInterest: formatCurrency(result.totalInterest)
    };
    
    const text = Object.entries(data)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`)
      .join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mortgage-calculation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareCalculation = async () => {
    if (!result) return;
    
    const text = `Mortgage Calculation:
Property Price: ${formatCurrency(propertyPrice)}
Monthly Payment: ${formatCurrency(result.monthlyPayment)}
Down Payment: ${downPayment}% (${formatCurrency(result.downPaymentAmount)})
Loan Term: ${loanTerm} years
Interest Rate: ${interestRate}%

Calculate your mortgage with JAY Real Estate: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mortgage Calculation - JAY Real Estate',
          text: text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Calculation copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mortgage Calculator</h2>
                <p className="text-gray-600">Calculate your monthly mortgage payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={exportCalculation}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Export calculation"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={shareCalculation}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Share calculation"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Input Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Loan Details</h3>
                
                {/* Property Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Property Price (AED)
                  </label>
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="100000"
                    step="10000"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Percent className="w-4 h-4 inline mr-1" />
                    Down Payment ({downPayment}%)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>50%</span>
                  </div>
                  {result && (
                    <p className="text-sm text-gray-600 mt-2">
                      Amount: {formatCurrency(result.downPaymentAmount)}
                    </p>
                  )}
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Interest Rate ({interestRate}% per year)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Loan Term ({loanTerm} years)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 years</span>
                    <span>30 years</span>
                  </div>
                </div>

                {/* UAE Mortgage Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">UAE Mortgage Guidelines</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• UAE residents: Up to 80% financing</li>
                        <li>• Non-residents: Up to 75% financing</li>
                        <li>• Minimum salary: AED 15,000/month</li>
                        <li>• Maximum debt-to-income: 50%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Calculation Results</h3>
                
                {result && (
                  <>
                    {/* Monthly Payment */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <h4 className="text-lg font-medium mb-2">Monthly Payment</h4>
                      <p className="text-3xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
                      <p className="text-blue-100 text-sm mt-2">
                        Recommended monthly income: {formatCurrency(result.monthlyPayment * 3)}
                      </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-1">Loan Amount</h5>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.loanAmount)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-1">Total Interest</h5>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.totalInterest)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-1">Total Payment</h5>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-1">Down Payment</h5>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(result.downPaymentAmount)}</p>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div>
                      <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <h4 className="font-medium text-gray-900">
                          Payment Breakdown (First Year) {showBreakdown ? '−' : '+'}
                        </h4>
                      </button>
                      
                      <AnimatePresence>
                        {showBreakdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="text-left p-2">Month</th>
                                    <th className="text-right p-2">Payment</th>
                                    <th className="text-right p-2">Principal</th>
                                    <th className="text-right p-2">Interest</th>
                                    <th className="text-right p-2">Balance</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {generatePaymentSchedule().map((payment) => (
                                    <tr key={payment.month} className="border-b border-gray-200">
                                      <td className="p-2">{payment.month}</td>
                                      <td className="p-2 text-right">{formatNumber(Math.round(payment.payment))}</td>
                                      <td className="p-2 text-right">{formatNumber(Math.round(payment.principal))}</td>
                                      <td className="p-2 text-right">{formatNumber(Math.round(payment.interest))}</td>
                                      <td className="p-2 text-right">{formatNumber(Math.round(payment.balance))}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Affordability Indicator */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Affordability Assessment</h4>
                      <p className={`text-sm ${getAffordabilityColor()}`}>
                        Based on the 33% debt-to-income rule, you should earn at least{' '}
                        <span className="font-semibold">{formatCurrency(result.monthlyPayment * 3)}</span> per month.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                * This is an estimate. Actual rates and terms may vary. Consult with a mortgage advisor for accurate information.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Close Calculator
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MortgageCalculator;
