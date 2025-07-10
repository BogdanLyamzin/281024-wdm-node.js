abstract class Employee {
  name: string;
  lastName: string;
  sallaryPerHour: number;
  private workTerm = 0;
  protected abstract probation: boolean;

  constructor(name: string, lastName: string, sallaryPerHour: number) {
    this.name = name;
    this.lastName = lastName;
    this.sallaryPerHour = sallaryPerHour;
  }

  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  getProbation(): boolean {
    return this.probation;
  }

  getWorkTerm(): number {
    return this.workTerm;
  }

  addWorkTerm(value: number): void {
    if (Number.isInteger(value) && value > 0) {
      this.workTerm += value;
      if (this.workTerm >= 3) {
        this.probation = false;
      }
    }
  }

  abstract calcSallary(workHours?: number): number;
}

class FullTimeEmployee extends Employee {
  protected probation = true;
  // probation: boolean;

  constructor(name: string, lastName: string, sallaryPerHour: number) {
    super(name, lastName, sallaryPerHour);
    // this.probation = true;
  }

  calcSallary() {
    const workYears = Math.floor(this.getWorkTerm() / 12);
    const multiplier = 1 + workYears / 10;
    return this.sallaryPerHour * 8 * 22 * multiplier;
  }
}

class PartTimeEmployee extends Employee {
  protected probation = false;

  constructor(name: string, lastName: string, sallaryPerHour: number) {
    super(name, lastName, sallaryPerHour);
    // this.probation = true;
  }

  calcSallary(workHours: number) {
    return this.sallaryPerHour * workHours;
  }
}

const employee1 = new FullTimeEmployee("Bohdan", "Liamzin", 40);
// console.log("probation", employee1.getProbation());
// console.log("workTerm", employee1.getWorkTerm());
// employee1.addWorkTerm(2);
// console.log("probation", employee1.getProbation());
// console.log("workTerm", employee1.getWorkTerm());
// employee1.addWorkTerm(1);
// console.log("probation", employee1.getProbation());
// console.log("workTerm", employee1.getWorkTerm());
// console.log(employee1.getFullName());
// console.log(employee1.calcSallary());
const employee2 = new PartTimeEmployee("Olena", "Yakovetch", 20);
const employeeList: Employee[] = [employee1, employee2];
const sallaryAll: number = employeeList.reduce((acum: number, employee: Employee) => {
  if (employee instanceof FullTimeEmployee) {
    return acum + employee.calcSallary();
  }
  return acum + employee.calcSallary(80);
}, 0);
console.log(sallaryAll);