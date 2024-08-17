import React, { useState, useEffect } from "react";
import "./App.css";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import ProgressBar from "./components/ProgressBar";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import File from "./components/File";
import saveText from "./functions/saveText";

function App() {
  const [taste, setTaste] = useState("Vanilková");
  const [more, setMore] = useState("");
  const [kopec, setKopec] = useState(1);
  const kinds = ["smetanová", "jogurtová", "nízkotučná"];
  const [kind, setKind] = useState("smetanová");
  const [amount, setAmount] = useState(parseInt(0));
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(100);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState("vysledek");
  const [error, setError] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newValue = prev + 1;
          if (newValue >= 100) {
            clearInterval(interval); // Vyčistit interval, pokud dosáhne 100
          }
          return newValue;
        });
      }, 1000); // 1 sekunda na jednotku
    }
    setTimeRemaining((prev) => {
      const newTime = prev - 1;
      if (newTime <= 0) {
        clearInterval(interval); // Vyčistit interval, pokud čas dosáhne 0
      }
      return newTime;
    });

    // Vyčištění intervalů, když se komponenta odpojí
    return () => clearInterval(interval);
  }, [progress]); // Efekt závisí na hodnotě progress

  const handleData = (data, source) => {
    switch (source) {
      case "rbg-taste": {
        setTaste(data);
        break;
      }
      case "chb-more": {
        setMore(data);
        break;
      }
      case "num-kopec": {
        setKopec(parseInt(data));
        break;
      }
      case "sel-kinds": {
        setKind(data);
        break;
      }
      case "rng-amount": {
        setAmount(data);
        break;
      }
      case "num-em1": {
        setNum1(data);
        break;
      }
      case "num-em2": {
        setNum2(data);
        break;
      }
      case "txa-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }
      default:
        break;
    }
  };
  const handleEvent = (source) => {
    if (source === "btn-result") {
      const value1 = parseFloat(num1);
      const value2 = parseFloat(num2);

      if (isNaN(value1) || isNaN(value2)) {
        setError("Zadej platné čísla ...");
        setSum(null);
      } else {
        setError("");
        setSum(value1 + value2);
      }

      switch (source) {
        case "btn-download": {
          saveText(text);
          break;
        }
        default:
          break;
      }
    }
  };

  // Podmínka pro zobrazení "kopeček" nebo "kopečky"
  const kopecText = kopec === 1 ? "kopeček" : "kopečky";

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row" id="row">
          <div className="col-6">
            <p className="p">
              {taste} {more} ,{kopec} {kopecText} - {kind}
            </p>
            <RbGroup
              label="Příchuť zmrzliny"
              id="rbg-taste"
              selectedValue={taste}
              handleData={handleData}
              dataIn={[
                { label: "Vanilková", value: "Vanilková" },
                { label: "Čokoládová", value: "Čokoládová" },
                { label: "Míchaná", value: "Míchaná" },
              ]}
            />
            <ChbGroup
              label="Něco navrch?"
              id="chb-more"
              dataIn={[
                { label: "kousky oříšků", value: " s kousky oříšků" },
                {
                  label: "čokoládové hoblinky",
                  value: " s čokoládovými hoblinkami",
                },
                {
                  label: "karamelové křupinky",
                  value: " s karamelovými křupinkami",
                },
              ]}
              selectedValue={more}
              handleData={handleData}
            />
            <NumImp
              label="Počet kopečků (max. 4):"
              dataIn={kopec}
              id="num-kopec"
              handleData={handleData}
            />
            <Select
              dataIn={kinds}
              selectedValue={kind}
              label="Vyberte druh zmrzliny"
              id="sel-kinds"
              handleData={handleData}
            />
            <Range
              id="rng-amount"
              label="Místo na disku"
              min={0}
              max={100}
              dataIn={amount}
              handleData={handleData}
            />
            <div className="clock">
              <Clock></Clock>
              &nbsp;&nbsp;&nbsp;zbývá {amount}% procent místa na disku
            </div>
          </div>
          <div className="col-6">
            <ProgressBar
              id="pgb-progress"
              dataIn={progress}
              min={0}
              max={100}
            />
            <br></br>
            <p> instalace probíhá... |čekejte {timeRemaining}s| </p>
            <div className="row">
              <div className="col-6">
                <TextBox
                  id="num-em1"
                  label="Sčítanec 1"
                  dataIn={num1}
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <TextBox
                  id="num-em2"
                  label="Sčítanec 2"
                  dataIn={num2}
                  handleData={handleData}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6" id="btn-area">
                <Button
                  id="btn-result"
                  label="Vypočítej součet"
                  handleEvent={handleEvent}
                ></Button>
              </div>
              <div className="col-6">
                <p>
                  <br />
                  {sum}
                  {error}
                </p>
              </div>
              <div className="col-6"></div>
            </div>
            <TextArea
              id="txa-text"
              label="Operace s textem"
              dataIn={text}
              handleData={handleData}
              height={150}
            />
            <div>
              <br></br>
            </div>
            <div className="row">
              <div className="col-6">
                <File
                  id="file-load"
                  label="Nacti soubor s textem"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <Button
                  id="btn-download"
                  label="Stahni soubor s textem"
                  handleEvent={handleEvent}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
