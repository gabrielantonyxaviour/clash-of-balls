"use client";

import { XMTPProvider } from "@xmtp/react-sdk";
import XmtpChat from "./xmtp-chat";

export default function XmtpChatWrapper() {
  return (
    <XMTPProvider>
      <XmtpChat />
    </XMTPProvider>
  );
}
