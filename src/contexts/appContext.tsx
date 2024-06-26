import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { formatToWholeDollarAmount } from '../utils/utils';
import {
  AmortizationScheduleEntry,
  amortizationCalc,
} from '../utils/ammortizationCalc';

interface Results {
  downPayment: string;
  closingCost: string;
  maxMonthlyPayment: string;
  housePrice: string;
  totalInterest: string;
  totalCost: string;
}

interface MonthlyBreakdown {
  finances: {
    housing: number;
    debt: number;
    expenses: number;
    taxes: number;
  };
  payment: {
    mortgage: number;
    taxes: number;
    insurance: number;
    hoa: number;
  };
}

interface AmortizationSchedule {
  data: AmortizationScheduleEntry[];
  monthly_Mortgage: number;
  monthly_Fees: number;
}

const baseAS = {
  data: [],
  monthly_Mortgage: 0,
  monthly_Fees: 0,
};

interface AppContextProps {
  annualIncome: number;
  setAnnualIncome: React.Dispatch<React.SetStateAction<number>>;
  downPayment: number;
  setDownPayment: React.Dispatch<React.SetStateAction<number>>;
  loanTerm: number;
  setLoanTerm: React.Dispatch<React.SetStateAction<number>>;
  interestRate: number;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
  monthlyDebts: number;
  setMonthlyDebts: React.Dispatch<React.SetStateAction<number>>;
  propertyTaxRate: number;
  setPropertyTaxRate: React.Dispatch<React.SetStateAction<number>>;
  homeInsurance: number;
  setHomeInsurance: React.Dispatch<React.SetStateAction<number>>;
  hoaFees: number;
  setHoaFees: React.Dispatch<React.SetStateAction<number>>;
  closingCosts: number;
  setClosingCosts: React.Dispatch<React.SetStateAction<number>>;
  deductCCfromDP: boolean;
  setDeductCCfromDP: React.Dispatch<React.SetStateAction<boolean>>;
  incomeTaxRate: number;
  setIncomeTaxRate: React.Dispatch<React.SetStateAction<number>>;
  dtiPercentage: number;
  setDtiPercentage: React.Dispatch<React.SetStateAction<number>>;
  results: Results | null;
  monthlyBreakdown: MonthlyBreakdown | null;
  amortizationSchedule: AmortizationSchedule;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [annualIncome, setAnnualIncome] = useState<number>(100000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.9);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(250);
  const [propertyTax, setPropertyTax] = useState<number>(6000);
  const [homeInsurance, setHomeInsurance] = useState<number>(67);
  const [hoaFees, setHoaFees] = useState<number>(50);
  const [closingCosts, setClosingCosts] = useState<number>(2.35);
  const [deductCCfromDP, setDeductCCfromDP] = useState<boolean>(true);
  const [dtiPercentage, setDtiPercentage] = useState<number>(33);
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(32);

  const [monthlyBreakdown, setMonthlyBreakdown] =
    useState<MonthlyBreakdown | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] =
    useState<AmortizationSchedule>(baseAS);

  const calculate = () => {
    const income = parseFloat(annualIncome.toString());
    const loanTermYears = parseInt(loanTerm.toString());
    const interestRateAnnual = parseFloat(interestRate.toString()) / 100;
    const monthlyDebtsAmount = parseFloat(monthlyDebts.toString());
    const annual_PropertyTax = parseFloat(propertyTax.toString());
    const monthly_HomeInsurance = parseFloat(homeInsurance.toString());
    const monthly_HOA = parseFloat(hoaFees.toString());
    const annual_HomeInsurance = monthly_HomeInsurance * 12;
    const annual_HOA = monthly_HOA * 12;
    const full_HomeInsurance = annual_HomeInsurance * loanTermYears;
    const full_HOA = annual_HOA * loanTermYears;
    const full_PropertyTax = annual_PropertyTax * loanTermYears;

    const monthlyIncome = income / 12;
    const monthlyInterestRate = interestRateAnnual / 12;
    const numberOfPayments = loanTermYears * 12;

    const maxDTI = monthlyIncome * (dtiPercentage / 100);
    let maxMonthlyPayment = maxDTI - monthlyDebtsAmount;

    // monthly breakdown variables
    const monthlyIncomeTax = monthlyIncome * (incomeTaxRate / 100);
    const monthlyPersonalExpenses = monthlyIncome - maxDTI - monthlyIncomeTax;
    const monthly_PropertyTax = annual_PropertyTax / 12;
    const monthly_Mortgage =
      maxMonthlyPayment -
      monthly_PropertyTax -
      monthly_HomeInsurance -
      monthly_HOA;

    // full breakdown variables
    let loanAmount =
      monthly_Mortgage /
      ((monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments) /
        ((1 + monthlyInterestRate) ** numberOfPayments - 1));

    // FIX: loan amount does not change when deductCCfromDP changes

    // Calculate closing costs based on percentage
    const closingCost =
      (parseFloat(closingCosts.toString()) / 100) * (loanAmount + downPayment);
    const downPaymentAmount = deductCCfromDP
      ? parseFloat((downPayment - closingCost).toString())
      : parseFloat(downPayment.toString());
    let housePrice = loanAmount + downPaymentAmount;

    // Calculate total interest paid
    // move these calcs to the component so you can break down the details better
    const totalPaid = maxMonthlyPayment * numberOfPayments;
    const totalInterest =
      totalPaid - loanAmount - full_PropertyTax - full_HOA - full_HomeInsurance;
    const totalCost =
      loanAmount +
      totalInterest +
      downPaymentAmount +
      closingCost +
      full_PropertyTax +
      full_HOA +
      full_HomeInsurance;

    const monthly_Fees =
      monthly_PropertyTax + monthly_HomeInsurance + monthly_HOA;
    const annual_fees = monthly_Fees * 12;

    const amortizationScheduleCalc = amortizationCalc(
      loanAmount,
      interestRate,
      loanTerm,
      annual_fees
    );

    setAmortizationSchedule({
      data: amortizationScheduleCalc,
      monthly_Mortgage: monthly_Mortgage,
      monthly_Fees: monthly_Fees,
    });

    setMonthlyBreakdown({
      finances: {
        housing: maxMonthlyPayment,
        debt: monthlyDebtsAmount,
        expenses: monthlyPersonalExpenses,
        taxes: monthlyIncomeTax,
      },
      payment: {
        mortgage: monthly_Mortgage,
        taxes: monthly_PropertyTax,
        insurance: monthly_HomeInsurance,
        hoa: monthly_HOA,
      },
    });

    setResults({
      downPayment: formatToWholeDollarAmount(downPaymentAmount),
      closingCost: formatToWholeDollarAmount(closingCost),
      maxMonthlyPayment: formatToWholeDollarAmount(maxMonthlyPayment),
      housePrice: formatToWholeDollarAmount(housePrice),
      totalInterest: formatToWholeDollarAmount(totalInterest),
      totalCost: formatToWholeDollarAmount(totalCost),
    });
  };

  useEffect(() => {
    calculate();
  }, [
    annualIncome,
    downPayment,
    loanTerm,
    interestRate,
    monthlyDebts,
    propertyTax,
    homeInsurance,
    hoaFees,
    closingCosts,
    deductCCfromDP,
    incomeTaxRate,
    dtiPercentage,
  ]);

  return (
    <AppContext.Provider
      value={{
        annualIncome,
        setAnnualIncome,
        downPayment,
        setDownPayment,
        loanTerm,
        setLoanTerm,
        interestRate,
        setInterestRate,
        monthlyDebts,
        setMonthlyDebts,
        propertyTaxRate: propertyTax,
        setPropertyTaxRate: setPropertyTax,
        homeInsurance,
        setHomeInsurance,
        hoaFees,
        setHoaFees,
        closingCosts,
        setClosingCosts,
        deductCCfromDP,
        setDeductCCfromDP,
        incomeTaxRate,
        setIncomeTaxRate,
        dtiPercentage,
        setDtiPercentage,
        results,
        monthlyBreakdown,
        amortizationSchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
