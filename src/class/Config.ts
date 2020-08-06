export class Config {
  rightAlignDecimal: boolean;
  replace: { [key: string]: string };
  trimTrail: boolean;
  formatHex: boolean;
  padType: string;

  constructor(rightAlignDecimal: boolean, replace: { [key: string]: string }, trimTrail: boolean, formatHex: boolean, padType: string) {
    this.rightAlignDecimal = rightAlignDecimal;
    this.replace = replace;
    this.trimTrail = trimTrail;
    this.formatHex = formatHex;
    this.padType = padType;
  }
}
