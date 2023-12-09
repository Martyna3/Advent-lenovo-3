import Fireworks from "@fireworks-js/react";
import "./App.css";
import {
  affineCipher,
  caesarCipher,
  keyCipher,
  routeCipher,
  superCipher,
} from "./ciphers";
import { createPortal } from "react-dom";

type Variant = "green" | "red" | "white";
type Cipher = (word: string) => string;

function Arrow() {
  return (
    <span className="my-2 w-8 h-8 text-center pt-1 mx-1 font-bold select-none">
      =&gt;
    </span>
  );
}

function Letter({ letter, variant }: { letter: string; variant: Variant }) {
  let color = "bg-white text-black shadow-white";
  if (variant === "green") {
    color = "bg-green-500 text-white shadow-green-500";
  }
  if (variant === "red") {
    color = "bg-red-500 text-white shadow-red-500";
  }
  return (
    <span
      className={`inline-block w-8 h-8 text-center pt-1 mx-1 my-1 shadow capitalize ${color}`}
    >
      {letter}
    </span>
  );
}

function Word({
  word,
  variant = "white",
}: {
  word: string;
  variant?: Variant;
}) {
  return (
    <span className="select-none my-2">
      {word.split("").map((letter, i) => (
        <Letter key={i} letter={letter} variant={variant} />
      ))}
    </span>
  );
}

function calculateChecksum(word: string): number {
  return word
    .toLowerCase()
    .split("")
    .reduce(
      (sum, letter, index) => sum + (index + 1) * letter.charCodeAt(0),
      0
    );
}

function EncryptedWord({
  word,
  cipher,
  checksum,
  isFinal,
}: {
  word: string;
  cipher: Cipher;
  checksum: number;
  isFinal?: boolean;
}) {
  const decrypted = cipher(word);
  const checksumCorrect = calculateChecksum(decrypted) === checksum;

  return (
    <div className="flex flex-row justify-center">
      <Word word={word} />
      <Arrow />
      <Word word={decrypted} variant={checksumCorrect ? "green" : "red"} />

      {isFinal &&
        checksumCorrect &&
        createPortal(
          <Fireworks className="absolute top-0 left-0 right-0 bottom-0" />,
          document.body
        )}
    </div>
  );
}

function App() {
  return (
    <>
      <img
        src="/logo-blue.svg"
        width={200}
        height={200}
        className="mx-auto rounded-full my-4"
      />
      <EncryptedWord word="fcbamberz" cipher={caesarCipher} checksum={4975} />
      <EncryptedWord word="oznubxs" cipher={affineCipher} checksum={3120} />
      <EncryptedWord word="rz" cipher={keyCipher} checksum={308} />
      <EncryptedWord word="lnveoo" cipher={routeCipher} checksum={2340} />
      <div className="h-4 w-11/12 rounded-full bg-blue mx-auto my-6" />
      <EncryptedWord
        word="citeaasgoyxcjzaqa"
        cipher={superCipher}
        checksum={16644}
        isFinal
      />
    </>
  );
}

export default App;
