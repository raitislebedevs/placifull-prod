let firstLevelTax = 0.2;
let firstLevelSalary = 1667;
let noMinimumBorder = 1800;
let secondLevelTax = 0.23;
let secondLevelSalary = 4841.33;
let thirdLevelTax = 0.31;
let socialIncomeTax = 0.105;
let taxReliefForChildren = 250;
let minimumIncomeTax = 500;
let nonTaxableStep = minimumIncomeTax / (noMinimumBorder - minimumIncomeTax);

const nonTaxableIncome = (salary, taxableAmount) => {
  if (salary > noMinimumBorder) return 0;

  let difference = taxableAmount - minimumIncomeTax;
  if (difference > 0) {
    return minimumIncomeTax - difference * nonTaxableStep;
  }
  return 0;
};

export const calculateSalary = (countryData) => {
  if (countryData['country'] === 'lv') {
    if (countryData.salary <= 500) {
      return {
        salary: countryData.salary * (1 - socialIncomeTax),
        benefit: 0,
      };
    }

    let socialTax = countryData.salary * socialIncomeTax;

    let salary = countryData.salary;
    let incomeTax = 0;

    if (salary > firstLevelSalary) {
      incomeTax +=
        (firstLevelSalary -
          socialTax -
          taxReliefForChildren * countryData.children -
          nonTaxableIncome(salary, salary)) *
        firstLevelTax;
      salary -= firstLevelSalary;
    } else {
      incomeTax +=
        (salary -
          socialTax -
          taxReliefForChildren * countryData.children -
          nonTaxableIncome(salary, salary)) *
        firstLevelTax;
      salary = 0;
    }

    if (salary > secondLevelSalary) {
      incomeTax += secondLevelSalary * secondLevelTax;
      salary -= secondLevelSalary;
    } else {
      incomeTax += salary * secondLevelTax;
      salary = 0;
    }

    if (salary > 0) {
      incomeTax += salary * thirdLevelTax;
    }

    let calculatedSalary = countryData.salary - incomeTax - socialTax;
    let calculatedBenefit = 0;
    if (calculatedSalary - 1000 > 0) {
      calculatedBenefit = (calculatedSalary - 1000) * 0.8;
    }

    return {
      salary: calculatedSalary,
      benefit: calculatedBenefit,
    };
  }
};
