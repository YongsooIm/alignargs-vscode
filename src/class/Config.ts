export class Config {
  alignDecimal: string;
  alignNonDecimal: string;
  replace: { [key: string]: string };
  trimTrail: boolean;
  formatHex: boolean;
  padType: string;

  constructor(alignDecimal: string, alignNonDecimal: string, replace: { [key: string]: string }, trimTrail: boolean, formatHex: boolean, padType: string) {
    this.alignDecimal = alignDecimal;
    this.alignNonDecimal = alignNonDecimal;
    this.replace = replace;
    this.trimTrail = trimTrail;
    this.formatHex = formatHex;
    this.padType = padType;
  }
}
