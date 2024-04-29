import { MessageBox } from "../message_box";
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";
import { CSSProperties } from "react";

type PropsTokenPayload = {
  jwt: string;
};

type ErrorParseJwt = {
  title: string;
  message: string;
};

type ResultParseJwt = {
  text?: string;
  error?: ErrorParseJwt;
};

export function TokenPayload({ jwt }: PropsTokenPayload) {
  const header = parseJwt(jwt, true);
  const payload = parseJwt(jwt, false);
  const styleTextarea: CSSProperties = {
    height: "100%",
    maxHeight: "100%",
    resize: "none",
    whiteSpace: "pre",
    overflowWrap: "normal",
    overflowX: "auto",
    fontFamily: "JetBrains Mono NL",
  };

  if (header.error != null || payload.error != null) {
    const error = header.error != null ? header.error! : payload.error!;
    return (
      <MessageBox title={error.title} classes={["is-danger"]}>
        <textarea
          className={classNames("textarea", "is-danger")}
          style={styleTextarea}
          readOnly
          value={error.message}
        />
      </MessageBox>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="message">
        <div className="message-header">
          <p>Header</p>
        </div>
        <div className="message-body">
          <textarea
            className="textarea"
            style={styleTextarea}
            readOnly
            value={header.text}
          />
        </div>
      </div>
      <div
        className="message"
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="message-header">
          <p>Payload</p>
        </div>
        <div className="message-body" style={{ height: "100%" }}>
          <textarea
            className="textarea"
            style={styleTextarea}
            readOnly
            value={payload.text}
          />
        </div>
      </div>
    </div>
  );
}

function parseJwt(jwt: string, isHeader: boolean): ResultParseJwt {
  try {
    const data = jwtDecode(jwt, { header: isHeader });
    return {
      text: JSON.stringify(data, null, 2),
    };
  } catch (e) {
    const error = e as Error;
    const part = isHeader ? "header" : "payload";
    return {
      error: {
        title: `${error.constructor.name} in parsing ${part}`,
        message: error.stack == null ? error.message : error.stack,
      },
    };
  }
}
