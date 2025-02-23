# Supported Actions by `@sharplygroup/xtb-api-js` library

## AccountOperations

### getCurrentUserData
- **Arguments**: None
- **Return Type**: `Promise<IAccountDataResponse>`
- **Description**: Returns information about account currency and account leverage.

### getMarginLevel
- **Arguments**: None
- **Return Type**: `Promise<IMarginLevelResponse>`
- **Description**: Returns various account indicators.

## CalculationOperations

### getCommissionDef
- **Arguments**:
  - `symbol: string`
  - `volume: number`
- **Return Type**: `Promise<ICommissionResponse>`
- **Description**: Returns calculation of commission and rate of exchange.

### getMarginTrade
- **Arguments**:
  - `symbol: string`
  - `volume: number`
- **Return Type**: `Promise<IMarginTradeResponse>`
- **Description**: Returns expected margin for given instrument and volume.

### getProfitCalculation
- **Arguments**:
  - `closePrice: number`
  - `cmd: number`
  - `openPrice: number`
  - `symbol: string`
  - `volume: number`
- **Return Type**: `Promise<IProfitCalculationResponse>`
- **Description**: Calculates estimated profit for given deal data.

## DmaOperations

### getStepRules
- **Arguments**: None
- **Return Type**: `Promise<any>`
- **Description**: Returns a list of step rules for DMAs.

## MarketDataOperations

### getCalendar
- **Arguments**: None
- **Return Type**: `Promise<any>`
- **Description**: Returns calendar with market events.

### getChartLastRequest
- **Arguments**:
  - `info: any`
- **Return Type**: `Promise<IChartResponse>`
- **Description**: Returns chart info, from start date to the current time.

### getChartRangeRequest
- **Arguments**:
  - `info: any`
- **Return Type**: `Promise<IChartResponse>`
- **Description**: Returns chart info with data between given start and end dates.

### getTickPrices
- **Arguments**:
  - `level: number`
  - `symbols: string[]`
  - `timestamp: number`
- **Return Type**: `Promise<ITickPricesResponse>`
- **Description**: Returns array of current quotations for given symbols, only quotations that changed from given timestamp are returned.

### getTradingHours
- **Arguments**:
  - `symbols: string[]`
- **Return Type**: `Promise<ITradingHoursResponse>`
- **Description**: Returns quotes and trading times.

## NewsOperations

### getNews
- **Arguments**:
  - `end: number`
  - `start: number`
- **Return Type**: `Promise<any>`
- **Description**: Returns news from trading server which were sent within specified period of time.

## ServerOperations

### getServerTime
- **Arguments**: None
- **Return Type**: `Promise<any>`
- **Description**: Returns current time on trading server.

### getVersion
- **Arguments**: None
- **Return Type**: `Promise<any>`
- **Description**: Returns the current API version.

### ping
- **Arguments**: None
- **Return Type**: `Promise<void>`
- **Description**: Regularly calling this function is enough to refresh the internal state of all the components in the system.

## SymbolOperations

### getAllSymbols
- **Arguments**: None
- **Return Type**: `Promise<ISymbolsResponse>`
- **Description**: Returns an array of all symbols available for the user.

### getSymbol
- **Arguments**:
  - `symbol: string`
- **Return Type**: `Promise<ISymbolResponse>`
- **Description**: Returns information about the symbol available for the user.

## TradeOperations

### getTrades
- **Arguments**:
  - `openedOnly: boolean`
- **Return Type**: `Promise<ITradesResponse>`
- **Description**: Returns an array of user's trades.

### getTradeRecords
- **Arguments**:
  - `orders: number[]`
- **Return Type**: `Promise<ITradesResponse>`
- **Description**: Returns an array of trades listed in the `orders` argument.

### getTradesHistory
- **Arguments**:
  - `end: number`
  - `start: number`
- **Return Type**: `Promise<ITradesResponse>`
- **Description**: Returns an array of user's trades which were closed within specified period of time.

### getTradeStatus
- **Arguments**:
  - `order: number`
- **Return Type**: `Promise<any>`
- **Description**: Returns current transaction status.

## TradingOperations

### tradeTransaction
- **Arguments**:
  - `tradeTransInfo: any`
- **Return Type**: `Promise<ITradeTransactionResponse>`
- **Description**: Starts a trade transaction.

### tradeTransactionStatus
- **Arguments**:
  - `order: number`
- **Return Type**: `Promise<any>`
- **Description**: Returns current transaction status.