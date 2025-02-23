import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WebSocketManager, AccountOperations, CalculationOperations, MarketDataOperations, NewsOperations, ServerOperations, SymbolOperations, TradeOperations, TradingOperations } from '@sharplygroup/xtb-api-js';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

const USER_ID = process.env.XTB_USERID || "";
const PASSWORD = process.env.XTB_PASSWORD || "";
const DEMO_ACCOUNT = process.env.XTB_DEMO === "true";

async function createXTBClient() {
    const wsManager = new WebSocketManager({
        userId: USER_ID,
        password: PASSWORD,
        demo: DEMO_ACCOUNT
    });

    try {
        await wsManager.connect();
        return wsManager;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

async function exposeXtbOperations(server: McpServer, wsManager: any) {
    const accountOperations = new AccountOperations(wsManager);
    const calculationOperations = new CalculationOperations(wsManager);
    const marketDataOperations = new MarketDataOperations(wsManager);
    const newsOperations = new NewsOperations(wsManager);
    const serverOperations = new ServerOperations(wsManager);
    const symbolOperations = new SymbolOperations(wsManager);
    const tradeOperations = new TradeOperations(wsManager);
    const tradingOperations = new TradingOperations(wsManager);

    // Account Operations
    server.tool(
        "getCurrentUserData",
        "Returns information about account currency and account leverage.",
        {},
        async () => {
            const data = await accountOperations.getCurrentUserData();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getMarginLevel",
        "Returns various account indicators.",
        {},
        async () => {
            const data = await accountOperations.getMarginLevel();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // Calculation Operations
    server.tool(
        "getCommissionDef",
        "Returns calculation of commission and rate of exchange.",
        { symbol: z.string(), volume: z.number() },
        async ({ symbol, volume }) => {
            const data = await calculationOperations.getCommissionDef(symbol, volume);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getMarginTrade",
        "Returns expected margin for given instrument and volume.",
        { symbol: z.string(), volume: z.number() },
        async ({ symbol, volume }) => {
            const data = await calculationOperations.getMarginTrade(symbol, volume);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getProfitCalculation",
        "Calculates estimated profit for given deal data.",
        { closePrice: z.number(), cmd: z.number(), openPrice: z.number(), symbol: z.string(), volume: z.number() },
        async ({ closePrice, cmd, openPrice, symbol, volume }) => {
            const data = await calculationOperations.getProfitCalculation(closePrice, cmd, openPrice, symbol, volume);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // MarketDataOperations
    server.tool(
        "getCalendar",
        "Returns calendar with market events.",
        {},
        async () => {
            const data = await marketDataOperations.getCalendar();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getChartLastRequest",
        "Returns chart info, from start date to the current time.",
        { info: z.any() },
        async ({ info }) => {
            const data = await marketDataOperations.getChartLastRequest(info);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getChartRangeRequest",
        "Returns chart info with data between given start and end dates.",
        { info: z.any() },
        async ({ info }) => {
            const data = await marketDataOperations.getChartRangeRequest(info);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getTickPrices",
        "Returns array of current quotations for given symbols, only quotations that changed from given timestamp are returned.",
        { level: z.number(), symbols: z.string().array(), timestamp: z.number() },
        async ({ level, symbols, timestamp }) => {
            const data = await marketDataOperations.getTickPrices(level, symbols, timestamp);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getTradingHours",
        "Returns quotes and trading times.",
        { symbols: z.string().array() },
        async ({ symbols }) => {
            const data = await marketDataOperations.getTradingHours(symbols);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // NewsOperations
    server.tool(
        "getNews",
        "Returns news from trading server which were sent within specified period of time.",
        { end: z.number(), start: z.number() },
        async ({ end, start }) => {
            const data = await newsOperations.getNews(end, start);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // ServerOperations
    server.tool(
        "getServerTime",
        "Returns current time on trading server.",
        {},
        async () => {
            const data = await serverOperations.getServerTime();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getVersion",
        "Returns the current API version.",
        {},
        async () => {
            const data = await serverOperations.getVersion();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "ping",
        "Regularly calling this function is enough to refresh the internal state of all the components in the system.",
        {},
        async () => {
            await serverOperations.ping();
            return { content: [{ type: "text", text: "Ping successful" }] };
        }
    );

    // SymbolOperations
    server.tool(
        "getAllSymbols",
        "Returns an array of all symbols available for the user.",
        {},
        async () => {
            const data = await symbolOperations.getAllSymbols();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getSymbol",
        "Returns information about the symbol available for the user.",
        { symbol: z.string() },
        async ({ symbol }) => {
            const data = await symbolOperations.getSymbol(symbol);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // TradeOperations
    server.tool(
        "getTrades",
        "Returns an array of user's trades.",
        { openedOnly: z.boolean() },
        async ({ openedOnly }) => {
            const data = await tradeOperations.getTrades(openedOnly);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getTradeRecords",
        "Returns an array of trades listed in the `orders` argument.",
        { orders: z.number().array() },
        async ({ orders }) => {
            const data = await tradeOperations.getTradeRecords(orders);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getTradesHistory",
        "Returns an array of user's trades which were closed within specified period of time.",
        { end: z.number(), start: z.number() },
        async ({ end, start }) => {
            const data = await tradeOperations.getTradesHistory(end, start);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "getTradeStatus",
        "Returns current transaction status.",
        { order: z.number() },
        async ({ order }) => {
            const data = await tradeOperations.getTradeStatus(order);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // TradingOperations
    server.tool(
        "tradeTransaction",
        "Starts a trade transaction.",
        { tradeTransInfo: z.any() },
        async ({ tradeTransInfo }) => {
            const data = await tradingOperations.tradeTransaction(tradeTransInfo);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    server.tool(
        "tradeTransactionStatus",
        "Returns current transaction status.",
        { order: z.number() },
        async ({ order }) => {
            const data = await tradingOperations.tradeTransactionStatus(order);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
    );

    // Command execution tool
    server.tool(
        "executeCommand",
        "Executes a command on the server.",
        { command: z.string() },
        async ({ command }) => {
            try {
                interface ExecResult {
                    stdout: string;
                    stderr: string;
                }
                const { exec } = require('child_process');
                const result: ExecResult = await new Promise((resolve, reject) => {
                    exec(command, (error: Error | null, stdout: string, stderr: string) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve({ stdout, stderr });
                    });
                });

                const output = `Stdout: ${result.stdout}\nStderr: ${result.stderr}`;
                return { content: [{ type: "text", text: output }] };
            } catch (error: any) {
                return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
            }
        }
    );

    // Prompts
    server.prompt(
        "getAccountDataPrompt",
        { },
        async () => {
            return {
                messages: [{
                    role: "user",
                    content: {
                        type: "text",
                        text: "Get the current account data."
                    }
                }]
            };
        }
    );

    server.prompt(
        "getSymbolInfoPrompt",
        { symbol: z.string().describe("The symbol to get information about") },
        async ({ symbol }) => {
            return {
                messages: [{
                    role: "user",
                    content: {
                        type: "text",
                        text: `Get information about the symbol ${symbol}.`
                    }
                }]
            };
        }
    );
}

async function startMcpServer() {
    const server = new McpServer({
        name: "XTBApiServer",
        version: "0.0.1",
    });

    try {
        const wsManager = await createXTBClient();
        await exposeXtbOperations(server, wsManager);

        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.log("XTBApiServer running on stdio");

    } catch (e) {
        console.error("Error starting server:", e);
    }
}

startMcpServer();