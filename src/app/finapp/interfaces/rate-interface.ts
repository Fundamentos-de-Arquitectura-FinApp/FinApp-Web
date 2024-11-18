export interface RateInterface {
  period: "DAILY" | "MONTHLY" | "YEARLY";
  rate: number;
  rateType: "NOMINAL" | "EFFECTIVE";
  capitalizationPeriod: "DAILY" | "MONTHLY" | "YEARLY";
}
