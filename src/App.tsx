import React, { useState, useEffect } from 'react';
import './App.css';
import IncomeInput from './components/inputs/incomeInput';
import DownPaymentInput from './components/inputs/downPaymentInput';
import InterestRateInput from './components/inputs/interestRateInput';
import MonthlyDebtsInput from './components/inputs/monthlyDepts';
import PropertyTaxInput from './components/inputs/propertyTaxInput';
import HomeInsuranceInput from './components/inputs/homeInsuranceInput';
import HoaFeesInput from './components/inputs/hoaFeesInput';
import LoanTermInput from './components/inputs/LoanTermInput';

interface Results {
  maxMonthlyPayment: string;
  housePrice: string;
}

const App: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(75000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(500);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(100);
  const [hoaFees, setHoaFees] = useState<number>(50);
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    calculate();
  }, [
    annualIncome,
    downPayment,
    loanTerm,
    interestRate,
    monthlyDebts,
    propertyTaxRate,
    homeInsurance,
    hoaFees,
  ]);

  const calculate = () => {
    const income = parseFloat(annualIncome.toString());
    const downPaymentAmount = parseFloat(downPayment.toString());
    const loanTermYears = parseInt(loanTerm.toString());
    const interestRateAnnual = parseFloat(interestRate.toString()) / 100;
    const monthlyDebtsAmount = parseFloat(monthlyDebts.toString());
    const propertyTaxRateAnnual = parseFloat(propertyTaxRate.toString()) / 100;
    const homeInsuranceMonthly = parseFloat(homeInsurance.toString());
    const hoaFeesMonthly = parseFloat(hoaFees.toString());

    const monthlyIncome = income / 12;
    const monthlyInterestRate = interestRateAnnual / 12;
    const numberOfPayments = loanTermYears * 12;

    const principal = monthlyIncome * 0.28;
    const DTI = monthlyIncome * 0.36;
    const maxMonthlyPayment = Math.min(
      principal,
      DTI - monthlyDebtsAmount - homeInsuranceMonthly - hoaFeesMonthly
    );

    const loanAmount =
      maxMonthlyPayment /
      ((monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments) /
        ((1 + monthlyInterestRate) ** numberOfPayments - 1));
    const housePrice = loanAmount + downPaymentAmount;

    setResults({
      maxMonthlyPayment: maxMonthlyPayment.toFixed(0),
      housePrice: housePrice.toFixed(0),
    });
  };

  return (
    <div className="App">
      <h1>Home Buying Calculator</h1>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculate();
          }}
        >
          <IncomeInput value={annualIncome} onChange={setAnnualIncome} />
          <DownPaymentInput value={downPayment} onChange={setDownPayment} />
          <LoanTermInput value={loanTerm} onChange={setLoanTerm} />
          <InterestRateInput value={interestRate} onChange={setInterestRate} />
          <MonthlyDebtsInput value={monthlyDebts} onChange={setMonthlyDebts} />
          <PropertyTaxInput
            value={propertyTaxRate}
            onChange={setPropertyTaxRate}
          />
          <HomeInsuranceInput
            value={homeInsurance}
            onChange={setHomeInsurance}
          />
          <HoaFeesInput value={hoaFees} onChange={setHoaFees} />
          <button type="submit">Calculate</button>
        </form>
      </div>
      {results && (
        <div>
          <h2>Results</h2>
          <p>
            Max Monthly Payment: $
            {results.maxMonthlyPayment.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p>
            Ideal House Price Range: $
            {results.housePrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
