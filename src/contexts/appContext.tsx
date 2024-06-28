import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  AmortizationScheduleEntry,
  amortizationCalc,
} from '../utils/ammortizationCalc';

interface Results {
  downPayment: number;
  closingCost: number;
  maxMonthlyPayment: number;
  totalHOA: number;
  totalInsurance: number;
  totalPropertyTax: number;
  loanAmount: number;
  housePrice: number;
  totalInterest: number;
  totalCost: number;
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

const baseResults = {
  downPayment: 0,
  closingCost: 0,
  maxMonthlyPayment: 0,
  totalHOA: 0,
  totalInsurance: 0,
  totalPropertyTax: 0,
  loanAmount: 0,
  housePrice: 0,
  totalInterest: 0,
  totalCost: 0,
};

interface AppContextProps {
  calcType: boolean; // true = house budget, false = mortgage calc
  setCalcType: React.Dispatch<React.SetStateAction<boolean>>;
  houseValue: number;
  setHouseValue: React.Dispatch<React.SetStateAction<number>>;
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
  results: Results;
  monthlyBreakdown: MonthlyBreakdown | null;
  amortizationSchedule: AmortizationSchedule;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [calcType, setCalcType] = useState<boolean>(true);
  const [houseValue, setHouseValue] = useState<number>(376841);
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
  const [results, setResults] = useState<Results>(baseResults);
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
    const total_HomeInsurance = annual_HomeInsurance * loanTermYears;
    const total_HOA = annual_HOA * loanTermYears;
    const total_PropertyTax = annual_PropertyTax * loanTermYears;

    const monthlyIncome = income / 12;
    const monthlyInterestRate = interestRateAnnual / 12;
    const numberOfPayments = loanTermYears * 12;
    let maxDTI = monthlyIncome * (dtiPercentage / 100);
    let maxMonthlyPayment = maxDTI - monthlyDebtsAmount;

    // monthly breakdown variables
    const monthlyIncomeTax = monthlyIncome * (incomeTaxRate / 100);
    const monthlyPersonalExpenses = monthlyIncome - maxDTI - monthlyIncomeTax;
    const monthly_PropertyTax = annual_PropertyTax / 12;
    let monthly_Mortgage =
      maxMonthlyPayment -
      monthly_PropertyTax -
      monthly_HomeInsurance -
      monthly_HOA;

    let loanAmount, housePrice;
    let closingCost, downPaymentAmount;

    if (calcType) {
      // BUDGET CALC
      loanAmount =
        monthly_Mortgage /
        ((monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments) /
          ((1 + monthlyInterestRate) ** numberOfPayments - 1));
      closingCost =
        (parseFloat(closingCosts.toString()) / 100) *
        (loanAmount + downPayment);
      downPaymentAmount = deductCCfromDP
        ? parseFloat((downPayment - closingCost).toString())
        : parseFloat(downPayment.toString());
      housePrice = loanAmount + downPaymentAmount;
    } else {
      // MORTGAGE CALC
      housePrice = parseFloat(houseValue.toString());
      const estimatedClosingCost =
        (parseFloat(closingCosts.toString()) / 100) * housePrice;
      downPaymentAmount = deductCCfromDP
        ? parseFloat((downPayment - estimatedClosingCost).toString())
        : parseFloat(downPayment.toString());
      loanAmount = housePrice - downPaymentAmount;
      closingCost =
        (parseFloat(closingCosts.toString()) / 100) *
        (loanAmount + downPayment);

      // recalc
      monthly_Mortgage =
        (loanAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      maxMonthlyPayment =
        monthly_Mortgage +
        monthly_HOA +
        monthly_HomeInsurance +
        monthly_PropertyTax;

      maxDTI = ((maxMonthlyPayment + monthlyDebtsAmount) / monthlyIncome) * 100;
      setDtiPercentage(maxDTI);
    }

    const totalPaid = maxMonthlyPayment * numberOfPayments;
    const totalInterest =
      totalPaid -
      loanAmount -
      total_PropertyTax -
      total_HOA -
      total_HomeInsurance;
    const totalCost =
      housePrice +
      closingCost +
      totalInterest +
      total_PropertyTax +
      total_HOA +
      total_HomeInsurance;

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
      downPayment: downPaymentAmount,
      closingCost: closingCost,
      maxMonthlyPayment: maxMonthlyPayment,
      totalHOA: total_HOA,
      totalInsurance: total_HomeInsurance,
      totalPropertyTax: total_PropertyTax,
      loanAmount: loanAmount,
      housePrice: housePrice,
      totalInterest: totalInterest,
      totalCost: totalCost,
    });
  };

  useEffect(() => {
    calculate();
  }, [
    calcType,
    houseValue,
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
        calcType,
        setCalcType,
        houseValue,
        setHouseValue,
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
