const calcWeightIndex = (weight: number, height: number) => {
  const result = weight / height ** 2;
  return Number(result.toFixed(2));
};

console.log(calcWeightIndex(90, 1.9));

class User {
    name: string;
    lastName: string;
    
    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
    }

    async fetchAll(){
      
    }
}
