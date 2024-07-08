# Problems in the provided code with improvements
## Missing imports?
If the provided code is just a snippet of the actual code, then the imports might not be included. However, if the provided code is the whole code then it will raise an error since without importing the necessary libraries, we cannot use them in our code. Therefore we need to import these libraries. Looking at the code, the libraries needed to be imported are import `BoxProps` from `"@mui/material"` and `useEffect`, `useMemo` from `"react"`.

## line 20
```typescript
const balances = useWalletBalances(); // line 20
```
The problem appears to be that `useWalletBalances()` is a custom hook which is not imported hence it is unresolved or it could be that it does not even exist.

Improvement or rather fix is to import this custom hook from wherever it is defined provided it is defined, else define this custom hook to use it.

## line 21
I refer to the copy of the provided code `messy.ts` in this folder for the line of the code.
```typescript
const [prices, setPrices] = useState({}); // line 21
```
In line 21, the initial state of prices is not set. This could lead to potential issues if `prices` is accessed before it is properly or correctly populated.

Improvement: et the initial value as `null`. This solves the issue stated above as well as ensuring the value of prices is only showed when it is populated (after change). If we were to set it to a value like `0.0` this may not be what we want as we only want to show the value of prices after we get it from the datasource.

## line 28
```typescript
console.err(error); // line 28
```
The problem here is the spelling. There is no `err` property for `console`. The correct spelling should be `error`.

Improvement: correct the spelling from `err` to `error`.

## lines 51, 59 and 60
```typescript
const balancePriority = getPriority(balance.blockchain) // line 51
const leftPriority = getPriority(lhs.blockchain); // line 59
const rightPriority = getPriority(rhs.blockchain); // line 60
```
`balance` is an instance of `WalletBalance` for all the lines above. The problem here is that there is no such attribute called `blockchain` in `WalletBalance` hence there is a bug in this code as balance.blockchain is undefined.

Improvement: Add the `blockchain` attribute to the `WalletBalance` interface, not forgetting to specify its datatype (string).

## lines 51 and 52
```typescript
const balancePriority = getPriority(balance.blockchain); // line 51
    if (lhsPriority > -99) { // line 52
```
The problem here is that `balancePriority` is defined but not used, which is not really a bug as the file would still run as per normal but seeing the context, the next line should be using `balancePriority` instead of `lhsPriority`. This is because the error is `lhsPriority` is not defined before it is used. There is no initialisation for `lhsPriority`.

Improvement would be to replace `lhsPriority` with the correct variable `balancePriority`.

## lines 69-74
```typescript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
        ...balance,
        formatted: balance.amount.toFixed()
    }
})
```
Problem: Firstly, `formatedBalances` is defined but not used. Secondly, the number of decimal places to round up for the balance amount is not set and we might want it to be 2 decimal places instead of the default 0.

Improvement: Specify tthe parameter for `.tofixed` to be 2, ideal for prices.

## lines 79-85
This might not be an issue since the provided code may not be the full code there is for the React page. However, if this is the only file, the `WalletRow` component is not declared anywhere and hence will introduce an error as `WalletRow` would be unresolved.

Improvement: Assuming this is the only file, create a `WalletRow` component so that it can be used in the JSX.