// V JavaScript není operátor % implementován jako modulo, ale zbytek, proto je potřeba použít funkci
function modulo(a: number, b: number): number {
  return ((a % b) + b) % b;
}

// Cézarova šifra, s posunem o 13 znaků
// https://crypto.interactive-maths.com/caesar-shift-cipher.html
export function caesarCipher(word: string): string {
  let result = "";

  // Projdeme všechny znaky a posuneme je o 13 znaků
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase();
    // Odečteme 97, protože znaky jsou od 97 do 122 a přičteme hodnotu posunu
    const ch = String.fromCharCode(modulo((char.charCodeAt(0) + 12 - 97), 26) + 97);
    result += ch;
  }

  return result;
}

// Jednoduchá směrovací šifra s maticí o šířce 3 a cestou zleva doprava a shora dolů
// https://crypto.interactive-maths.com/route-cipher.html
export function routeCipher(word: string): string {
  // Vypočítáme si rozměry matice
  const width = 3;
  // Výška je zaokrouhlení počtu znaků děleno šířkou
  const height = Math.ceil(word.length / width);

  // Vytvoříme si prázdnou matici
  const matrix: string[][] = [];

  // Naplníme matici
  let index = 0;
  for (let y = 0; y < height; y++) {
    matrix[y] = [];
    for (let x = 0; x < width && index < word.length; x++) {
      // Vezmeme znak z řetězce a převedeme na malé písmeno na pozici x a y
      matrix[y][x] = word[index].toLowerCase();
    }
  }

  // Vytvoříme si výsledný řetězec přečtením matice po sloupcích
  let result = '';
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // Pokud je znak prázdný, nahradíme ho mezerou
      result += matrix[j][i] || ' ';
    }
  }

  return result.trim();
}

// Jednoduchá afinní šifra s klíčem 5x + 8
// https://crypto.interactive-maths.com/affine-cipher.html
export function affineCipher(word: string): string {
  //
  // Získáme hodnoty znaků slova, odečítáme 97, protože znaky jsou od 97 do 122
  const values = word.toLowerCase().split('').map(char => char.charCodeAt(0) - 97);

  // Vypočítáme nové hodnoty znaků, podle vzorce (5x + 8) mod 26
  const newValues = values.map(value => modulo((value + 5 * 8), 26));

  // Vytvoříme si výsledný řetězec převedením čísel zpět na znaky
  const result = newValues.map(value => String.fromCharCode(value + 97)).join('');

  return result;
}

// Šifra podle klíče
// Každé písmeno je posunuto podle hodnoty v klíči
// Např. klíč ABCD znamená, že první písmeno je posunuto o hodnotu A (1), druhé o hodnotu B (2), třetí o hodnotu C (3) a čtvrté o hodnotu D (4)
// Klíčem je 'reactgirls'
export function keyCipher(word: string): string {
  const key = 'reactgirls';

  // Získáme hodnoty znaků klíče, odečítáme 96, protože znaky jsou od 97 do 122
  const values = key.toLowerCase().split('').map(char => char.charCodeAt(0) - 96);

  // Posuneme znaky podle klíče, nejdříve je převedeme na malá písmena, pak je převedeme na čísla od 0 do 25, poté je posuneme podle klíče a nakonec převedeme zpět na písmenaf
  const result = word.toLowerCase().split('').map((char, index) => String.fromCharCode(modulo((char.charCodeAt(0) - 97 - values[index % values.length]), 26) + 97)).join('');

  return result;
}

// Finální šifra kombinující všechny předchozí šifry
export function superCipher(word: string): string {
  const result = routeCipher(affineCipher(keyCipher(caesarCipher(word))));

  return result;
}
