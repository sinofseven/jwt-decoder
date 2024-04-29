import { MessageBox } from "../message_box";
import { ChangeEvent } from "react";

type PropsTokenForm = {
  token: string;
  setToken: (v: string) => void;
};

export function TokenForm({ token, setToken }: PropsTokenForm) {
  function handlerChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setToken(text);
  }

  return (
    <MessageBox title="JWT Token">
      <textarea
        className="textarea"
        style={{
          height: "100%",
          maxHeight: "100%",
          resize: "none",
          fontFamily: "JetBrains Mono NL",
        }}
        value={token}
        onChange={handlerChange}
      />
    </MessageBox>
  );
}
