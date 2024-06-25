export interface AmortizationScheduleEntry {
  year: number;
  interest: number;
  principal: number;
  fees: number;
  balance: number;
}

export const amortizationCalc = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  monthly_Fees: number
): AmortizationScheduleEntry[] => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = loanTermYears * 12;

  // Calculate the monthly mortgage payment
  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const schedule: AmortizationScheduleEntry[] = [];
  let balance = loanAmount;

  for (let i = 0; i < numberOfPayments; i++) {
    const interestPayment = balance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    const year = Math.floor(i / 12) + 1;
    const entry = schedule.find((entry) => entry.year === year);

    if (entry) {
      entry.interest += interestPayment;
      entry.principal += principalPayment;
      entry.balance = balance;
    } else {
      schedule.push({
        year,
        interest: interestPayment,
        principal: principalPayment,
        fees: monthly_Fees,
        balance,
      });
    }
  }

  // Round the values for better readability
  schedule.forEach((entry) => {
    entry.interest = parseFloat(entry.interest.toFixed(2));
    entry.principal = parseFloat(entry.principal.toFixed(2));
    entry.fees = parseFloat(entry.fees.toFixed(2));
    entry.balance = parseFloat(entry.balance.toFixed(2));
  });

  return schedule;
};
