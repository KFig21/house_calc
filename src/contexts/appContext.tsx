import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Results {
  maxMonthlyPayment: string;
  housePrice: string;
  totalInterest: string;
  closingCost: string;
  totalCost: string;
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
  dtiPercentage: number;
  setDtiPercentage: React.Dispatch<React.SetStateAction<number>>;
  results: Results | null;
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
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(0);
  const [hoaFees, setHoaFees] = useState<number>(0);
  const [closingCosts, setClosingCosts] = useState<number>(3.0);
  const [dtiPercentage, setDtiPercentage] = useState<number>(36);

  const [results, setResults] = useState<Results | null>(null);

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

    const maxDTI = monthlyIncome * (dtiPercentage / 100);
    let maxMonthlyPayment =
      maxDTI - monthlyDebtsAmount - homeInsuranceMonthly - hoaFeesMonthly;

    let housePrice = 0;
    let loanAmount = 0;
    let propertyTaxMonthly = 0;

    // Iteratively adjust the maxMonthlyPayment to account for property taxes
    for (let i = 0; i < 10; i++) {
      loanAmount =
        maxMonthlyPayment /
        ((monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments) /
          ((1 + monthlyInterestRate) ** numberOfPayments - 1));
      housePrice = loanAmount + downPaymentAmount;
      propertyTaxMonthly = (propertyTaxRateAnnual * housePrice) / 12;
      maxMonthlyPayment =
        maxDTI -
        monthlyDebtsAmount -
        homeInsuranceMonthly -
        hoaFeesMonthly -
        propertyTaxMonthly;

      if (
        Math.abs(
          maxMonthlyPayment -
            (maxDTI -
              monthlyDebtsAmount -
              homeInsuranceMonthly -
              hoaFeesMonthly -
              propertyTaxMonthly)
        ) < 1
      ) {
        break;
      }
    }

    // Calculate closing costs based on percentage
    const closingCost =
      (parseFloat(closingCosts.toString()) / 100) * housePrice;

    // Calculate total interest paid
    const totalPaid = maxMonthlyPayment * numberOfPayments;
    const totalInterest = totalPaid - loanAmount;

    const totalCost = totalPaid + downPaymentAmount + closingCost;

    setResults({
      maxMonthlyPayment: maxMonthlyPayment.toFixed(0),
      housePrice: housePrice.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      closingCost: closingCost.toFixed(0),
      totalCost: totalCost.toFixed(0),
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
    propertyTaxRate,
    homeInsurance,
    hoaFees,
    closingCosts,
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
        propertyTaxRate,
        setPropertyTaxRate,
        homeInsurance,
        setHomeInsurance,
        hoaFees,
        setHoaFees,
        closingCosts,
        setClosingCosts,
        dtiPercentage,
        setDtiPercentage,
        results,
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
