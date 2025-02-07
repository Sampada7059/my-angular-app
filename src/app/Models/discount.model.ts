export class Discount {
    Occasion_Id: number;
    Occasion_Name: string;
    Discount_Percentage: number;
    Start_Date: Date;
    End_Date: Date;
    Product_Type: string;
  
    constructor(
      Occasion_Id: number,
      Occasion_Name: string,
      Discount_Percentage: number,
      Start_Date: Date,
      End_Date: Date,
      Product_Type: string
    ) {
      this.Occasion_Id = Occasion_Id;
      this.Occasion_Name = Occasion_Name;
      this.Discount_Percentage = Discount_Percentage;
      this.Start_Date = Start_Date;
      this.End_Date = End_Date;
      this.Product_Type = Product_Type;
    }
  }
  