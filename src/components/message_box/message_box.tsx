import classNames from "classnames";
import { ReactNode } from "react";

type PropsMessageBox = {
  title: string;
  children: ReactNode;
  classes?: string[];
};

export function MessageBox({ title, children, classes }: PropsMessageBox) {
  return (
    <div
      className={classNames("message", ...(classes ?? []))}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="message-header">
        <p>{title}</p>
      </div>
      <div className="message-body" style={{ display: "flex", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
