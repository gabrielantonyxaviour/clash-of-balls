import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { validateFramesPost } from "@xmtp/frames-validator";
import { Next, Context } from "hono";
import { parseUnits, encodeFunctionData, erc20Abi, Abi } from "viem";
import { baseSepolia } from "viem/chains";
import getChallenge from "./lib/getChallenge";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// import { neynar } from 'frog/hubs'

const addMetaTags = (client: string, version?: string) => {
  // Follow the OpenFrames meta tags spec
  return {
    unstable_metaTags: [
      { property: `of:accepts`, content: version || "vNext" },
      { property: `of:accepts:${client}`, content: version || "vNext" },
    ],
  };
};

type State = {
  count: number;
};

export const app = new Frog<{ State: State }>({
  title: "Clash Of Balls",
  assetsPath: "/",
  initialState: {
    count: 0,
  },
  ...addMetaTags("xmtp"),
});

const xmtpSupport = async (c: Context, next: Next) => {
  // Check if the request is a POST and relevant for XMTP processing
  if (c.req.method === "POST") {
    const requestBody = (await c.req.json().catch(() => {})) || {};
    if (requestBody?.clientProtocol?.includes("xmtp")) {
      c.set("client", "xmtp");
      const { verifiedWalletAddress } = await validateFramesPost(requestBody);
      c.set("verifiedWalletAddress", verifiedWalletAddress);
    } else {
      // Add farcaster check
      c.set("client", "farcaster");
    }
  }
  await next();
};

app.use(xmtpSupport);

app.use("/*", serveStatic({ root: "./public" }));

app.composerAction(
  "/",
  (c) => {
    return c.res({
      title: "Clash Of Balls",
      url: "https://clash-of-balls.vercel.app?fid=" + c.actionData.fid,
    });
  },
  {
    name: "Clash Of Balls Composer action",
    description:
      "1v1 Football Prediction Battle on Chiliz with encrypted predictions using FHE.",
    icon: "image",
    imageUrl: "https://clash-of-balls.vercel.app/logo.png",
  }
);

app.transaction("/tx", (c) => {
  let address: `0x${string}`;

  // XMTP verified address
  const { verifiedWalletAddress } = (c?.var as any) || {};

  if (verifiedWalletAddress) {
    address = verifiedWalletAddress as `0x${string}`;
  } else {
    address = c.address as `0x${string}`;
  }

  // Prepare the amount to transfer
  const amount = BigInt(parseUnits("1", 6));

  // Transfering 1 USDC to yourself
  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [address as `0x${string}`, amount] as const,
  });

  const BASE_SEPOLIA_USDC_ADDRESS =
    "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  return c.res({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi as Abi,
      to: BASE_SEPOLIA_USDC_ADDRESS,
      data: calldata,
      value: BigInt(0),
    },
  });
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <img key={2} src="/home.png" />
      </div>
    ),
    intents: [
      <Button.Link href="https://clash-of-balls.vercel.app/">
        Try now
      </Button.Link>,
    ],
  });
});

app.frame("/challenge/:[id]", async (c) => {
  const params = c.req.param();
  const { response } = await getChallenge({ id: params["[id]"] });

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            style={{ zIndex: 1, width: "102%" }}
            src={`/games/${response.gameId}.png`}
          />
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://clash-of-balls.vercel.app">
        Negotiate
      </Button.Link>,
      <Button.Transaction target="/tx" action="/tx-success">
        Accept
      </Button.Transaction>,
    ],
  });
});

app.frame("/submit", (c) => {
  const { buttonValue, inputText, deriveState } = c;
  const state = deriveState((previousState) => {
    previousState.count++;
  });
  return c.res({
    action: "/",
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "black",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            Current State: {state.count}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            You typed: {inputText}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            You clicked button: {buttonValue}
          </div>
        </div>
      </div>
    ),
    intents: [<Button>Back</Button>],
  });
});

devtools(app, { serveStatic });
