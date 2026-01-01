/**
 * HugeNumber - A library for handling extremely large numbers up to Decker (10^^10)
 * 
 * Supports:
 * - Regular numbers
 * - Scientific notation (mantissa * 10^exponent)
 * - Power towers (10^10^10^...)
 * 
 * Notation:
 * - 10^x = 10 to the power of x
 * - 10^^2 = 10^10
 * - 10^^3 = 10^(10^10)
 * - 10^^n = power tower of height n
 */

export class HugeNumber {
  /**
   * Creates a HugeNumber
   * @param {number} mantissa - The mantissa (coefficient)
   * @param {number} exponent - The exponent (for 10^exponent)
   * @param {number} tower - The tower height (for 10^^tower)
   */
  constructor(mantissa = 0, exponent = 0, tower = 0) {
    this.mantissa = mantissa;
    this.exponent = exponent;
    this.tower = tower;
    this.normalize();
  }

  /**
   * Normalize the number to standard form
   */
  normalize() {
    // Handle zero
    if (this.mantissa === 0) {
      this.exponent = 0;
      this.tower = 0;
      return;
    }

    // Normalize mantissa to be between 1 and 10
    while (Math.abs(this.mantissa) >= 10 && this.tower === 0) {
      this.mantissa /= 10;
      this.exponent++;
    }

    while (Math.abs(this.mantissa) < 1 && this.mantissa !== 0 && this.tower === 0) {
      this.mantissa *= 10;
      this.exponent--;
    }

    // If exponent gets too large, increase tower
    if (this.exponent >= 308 && this.tower === 0) {
      this.tower = 1;
      this.exponent = Math.log10(this.exponent);
      this.mantissa = 1;
    }

    // Cap tower at 10 (Decker)
    if (this.tower > 10) {
      this.tower = 10;
      this.exponent = 10;
      this.mantissa = 1;
    }
  }

  /**
   * Create a HugeNumber from a regular number
   */
  static fromNumber(n) {
    if (n === 0) return new HugeNumber(0, 0, 0);
    const exponent = Math.floor(Math.log10(Math.abs(n)));
    const mantissa = n / Math.pow(10, exponent);
    return new HugeNumber(mantissa, exponent, 0);
  }

  /**
   * Create a HugeNumber from a string
   */
  static fromString(str) {
    // Format: "1.5e10" or "10^^3" or "1.5e10^^2"
    if (str.includes('^^')) {
      const parts = str.split('^^');
      const tower = parseInt(parts[1]);
      const base = parts[0];
      
      if (base.includes('e')) {
        const [mantissa, exp] = base.split('e');
        return new HugeNumber(parseFloat(mantissa), parseInt(exp), tower);
      }
      
      return new HugeNumber(1, parseFloat(base), tower - 1);
    }
    
    if (str.includes('e')) {
      const [mantissa, exp] = str.split('e');
      return new HugeNumber(parseFloat(mantissa), parseInt(exp), 0);
    }
    
    return HugeNumber.fromNumber(parseFloat(str));
  }

  /**
   * Add two HugeNumbers
   */
  add(other) {
    // If towers differ significantly, return the larger
    if (this.tower > other.tower) return this.clone();
    if (other.tower > this.tower) return other.clone();

    // Same tower
    if (this.tower > 0) {
      // For large towers, addition doesn't change much
      return this.exponent > other.exponent ? this.clone() : other.clone();
    }

    // No tower - regular scientific notation
    if (Math.abs(this.exponent - other.exponent) > 15) {
      return this.exponent > other.exponent ? this.clone() : other.clone();
    }

    const thisVal = this.mantissa * Math.pow(10, this.exponent - other.exponent);
    const sum = thisVal + other.mantissa;
    return new HugeNumber(sum, other.exponent, 0);
  }

  /**
   * Multiply two HugeNumbers
   */
  multiply(other) {
    if (this.mantissa === 0 || other.mantissa === 0) {
      return new HugeNumber(0, 0, 0);
    }

    // If either has a tower, result is dominated by the larger
    if (this.tower > 0 || other.tower > 0) {
      if (this.tower > other.tower) return this.clone();
      if (other.tower > this.tower) return other.clone();
      
      // Same tower - add exponents
      const newExp = this.exponent + other.exponent;
      return new HugeNumber(this.mantissa * other.mantissa, newExp, this.tower);
    }

    // Regular multiplication
    const newMantissa = this.mantissa * other.mantissa;
    const newExponent = this.exponent + other.exponent;
    return new HugeNumber(newMantissa, newExponent, 0);
  }

  /**
   * Raise this HugeNumber to a power
   */
  pow(n) {
    if (n === 0) return new HugeNumber(1, 0, 0);
    if (n === 1) return this.clone();
    if (this.mantissa === 0) return new HugeNumber(0, 0, 0);

    // If we have a tower, power increases it
    if (this.tower > 0) {
      return new HugeNumber(this.mantissa, this.exponent + Math.log10(n), this.tower);
    }

    // Regular power
    const newMantissa = Math.pow(this.mantissa, n);
    const newExponent = this.exponent * n;
    return new HugeNumber(newMantissa, newExponent, 0);
  }

  /**
   * Compare two HugeNumbers
   * Returns: -1 if this < other, 0 if equal, 1 if this > other
   */
  compare(other) {
    if (this.tower !== other.tower) {
      return this.tower > other.tower ? 1 : -1;
    }
    if (this.exponent !== other.exponent) {
      return this.exponent > other.exponent ? 1 : -1;
    }
    if (this.mantissa !== other.mantissa) {
      return this.mantissa > other.mantissa ? 1 : -1;
    }
    return 0;
  }

  /**
   * Check if less than
   */
  lt(other) {
    return this.compare(other) < 0;
  }

  /**
   * Check if greater than
   */
  gt(other) {
    return this.compare(other) > 0;
  }

  /**
   * Check if equal
   */
  eq(other) {
    return this.compare(other) === 0;
  }

  /**
   * Clone this HugeNumber
   */
  clone() {
    return new HugeNumber(this.mantissa, this.exponent, this.tower);
  }

  /**
   * Convert to a regular number (if possible)
   */
  toNumber() {
    if (this.tower > 0) return Infinity;
    if (this.exponent > 308) return Infinity;
    if (this.exponent < -308) return 0;
    return this.mantissa * Math.pow(10, this.exponent);
  }

  /**
   * Convert to a readable string
   */
  toString() {
    if (this.mantissa === 0) return "0";

    // Tower notation
    if (this.tower > 0) {
      const expStr = this.exponent.toFixed(2);
      return `10^^${this.tower} (e${expStr})`;
    }

    // Scientific notation for large numbers
    if (this.exponent >= 6 || this.exponent <= -3) {
      return `${this.mantissa.toFixed(2)}e${this.exponent}`;
    }

    // Regular number for small values
    const num = this.toNumber();
    if (num >= 1000) {
      return num.toFixed(0);
    }
    return num.toFixed(2);
  }

  /**
   * Format for display with appropriate suffix
   */
  format() {
    if (this.mantissa === 0) return "0";

    // Tower notation
    if (this.tower > 0) {
      if (this.tower >= 10) return "Decker";
      return `10^^${this.tower}`;
    }

    // Use suffixes for large numbers
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    const suffixIndex = Math.floor(this.exponent / 3);
    
    if (suffixIndex < suffixes.length && this.exponent >= 3) {
      const mantissa = this.mantissa * Math.pow(10, this.exponent % 3);
      return `${mantissa.toFixed(2)}${suffixes[suffixIndex]}`;
    }

    // Scientific notation for very large
    if (this.exponent >= 33) {
      return `${this.mantissa.toFixed(2)}e${this.exponent}`;
    }

    return this.toString();
  }
}

export default HugeNumber;
