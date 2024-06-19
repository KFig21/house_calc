import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { formatToWholeDollarAmount } from '../utils/utils';

interface Results {
  maxMonthlyPayment: string;
  housePrice: string;
  totalInterest: string;
  closingCost: string;
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
  const [homeInsurance, setHomeInsurance] = useState<number>(0);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [closingCosts, setClosingCosts] = useState<number>(3.0);
  const [deductCCfromDP, setDeductCCfromDP] = useState<boolean>(true);
  const [dtiPercentage, setDtiPercentage] = useState<number>(36);
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(32);

  const [monthlyBreakdown, setMonthlyBreakdown] =
    useState<MonthlyBreakdown | null>(null);
  const [results, setResults] = useState<Results | null>(null);

  const calculate = () => {
    const income = parseFloat(annualIncome.toString());
    const loanTermYears = parseInt(loanTerm.toString());
    const interestRateAnnual = parseFloat(interestRate.toString()) / 100;
    const monthlyDebtsAmount = parseFloat(monthlyDebts.toString());
    const annual_PropertyTax = parseFloat(propertyTax.toString());
    const monthly_HomeInsurance = parseFloat(homeInsurance.toString());
    const monthly_HOA = parseFloat(hoaFees.toString());

    const monthlyIncome = income / 12;
    const monthlyInterestRate = interestRateAnnual / 12;
    const numberOfPayments = loanTermYears * 12;

    const maxDTI = monthlyIncome * (dtiPercentage / 100);
    let maxMonthlyPayment =
      maxDTI - monthlyDebtsAmount - monthly_HomeInsurance - monthly_HOA;

    // monthly breakdown variables
    const monthlyIncomeTax = monthlyIncome * (incomeTaxRate / 100);
    const monthlyPersonalExpenses =
      monthlyIncome - maxMonthlyPayment - monthlyDebtsAmount - monthlyIncomeTax;
    const monthly_PropertyTax = annual_PropertyTax / 12;
    const monthly_Mortgage =
      maxMonthlyPayment -
      monthly_PropertyTax -
      monthly_HomeInsurance -
      monthly_HOA;

    // full breakdown variables
    let housePrice = 400000;
    let loanAmount = 0;

    // Calculate closing costs based on percentage
    const closingCost =
      (parseFloat(closingCosts.toString()) / 100) * housePrice;
    const downPaymentAmount = deductCCfromDP
      ? parseFloat((downPayment - closingCost).toString())
      : parseFloat(downPayment.toString());

    console.log('downPayment', downPaymentAmount);

    // Calculate total interest paid
    const totalPaid = maxMonthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;

    const totalCost = totalPaid + downPaymentAmount + closingCost;

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
      maxMonthlyPayment: formatToWholeDollarAmount(maxMonthlyPayment),
      housePrice: formatToWholeDollarAmount(housePrice),
      totalInterest: formatToWholeDollarAmount(totalInterest),
      closingCost: formatToWholeDollarAmount(closingCost),
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
