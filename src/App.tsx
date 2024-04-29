import classNames from "classnames";
import { useState } from "react";

import { Navbar } from "./components/navbar";
import { TokenForm } from "./components/token_form";
import { TokenPayload } from "./components/token_payload";

function App() {
  const [jwt, setJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div className="container is-fullhd pt-5" style={{ flexGrow: 1 }}>
        <div className="columns" style={{ height: "100%" }}>
          <div className={classNames("column")}>
            <TokenForm token={jwt} setToken={(v: string) => setJwt(v)} />
          </div>
          <div className="column">
            <TokenPayload jwt={jwt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
