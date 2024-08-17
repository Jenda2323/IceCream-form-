import React, { useState } from "react";
import "./App.css";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";

function App() {
  const [taste, setTaste] = useState("Vanilková");
  const [more, setMore] = useState("");
  const [kopec, setKopec] = useState(1);
  const kinds = ["smetanová", "jogurtová", "nízkotučná"];
  const [kind, setKind] = useState("smetanová");

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
      default:
        break;
    }
  };

  // Podmínka pro zobrazení "kopeček" nebo "kopečky"
  const kopecText = kopec === 1 ? "kopeček" : "kopečky";

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="col6">
          <p>
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
        </div>
      </div>
    </div>
  );
}

export default App;
